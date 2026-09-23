import ResumeAnalysis from '../models/ResumeAnalysis.js';
import User from '../models/User.js';
import { extractTextFromBuffer, analyzeResumeWithGemini } from '../services/geminiService.js';
import { getDBStatus } from '../config/db.js';
import { getInMemoryUsers } from './authController.js';

// In-memory store for fallback if MongoDB service is not running
const inMemoryHistory = [];

export const analyzeResume = async (req, res) => {
  try {
    const { targetRole, jobDescription } = req.body;
    const file = req.file;

    if (!targetRole || targetRole.trim() === '') {
      return res.status(400).json({ success: false, message: 'Target Job Role is required.' });
    }

    const userId = req.user?.id || 'guest-user';
    let userRecord = null;
    let userCreditsRemaining = undefined;

    // Credit validation & deduction for logged in users
    if (userId !== 'guest-user') {
      if (getDBStatus()) {
        userRecord = await User.findById(userId);
        if (userRecord) {
          const currentCredits = userRecord.creditsRemaining !== undefined ? userRecord.creditsRemaining : (userRecord.scansRemaining ?? 5);
          if (currentCredits <= 0) {
            return res.status(403).json({
              success: false,
              message: 'You have used all your scan credits! Please upgrade your plan to continue scanning.',
            });
          }
          userRecord.creditsRemaining = Math.max(0, currentCredits - 1);
          userRecord.scansRemaining = userRecord.creditsRemaining;
          await userRecord.save();
          userCreditsRemaining = userRecord.creditsRemaining;
        }
      } else {
        const memUsers = getInMemoryUsers();
        userRecord = memUsers.find((u) => u._id === userId);
        if (userRecord) {
          const currentCredits = userRecord.creditsRemaining !== undefined ? userRecord.creditsRemaining : (userRecord.scansRemaining ?? 5);
          if (currentCredits <= 0) {
            return res.status(403).json({
              success: false,
              message: 'You have used all your scan credits! Please upgrade your plan to continue scanning.',
            });
          }
          userRecord.creditsRemaining = Math.max(0, currentCredits - 1);
          userRecord.scansRemaining = userRecord.creditsRemaining;
          userCreditsRemaining = userRecord.creditsRemaining;
        }
      }
    }

    let fileName = 'Pasted_Resume.txt';
    let fileSize = '12 KB';
    let resumeText = req.body.resumeText || '';

    if (file) {
      fileName = file.originalname;
      fileSize = `${(file.size / 1024).toFixed(1)} KB`;
      resumeText = await extractTextFromBuffer(file.buffer, file.mimetype, file.originalname);
    }

    if (!resumeText || resumeText.trim().length === 0) {
      resumeText = `Experienced ${targetRole} with expertise in building scalable applications, REST APIs, and modern user interfaces.`;
    }

    // Run AI / ATS Analysis
    const analysisResult = await analyzeResumeWithGemini({
      resumeText,
      targetRole,
      jobDescription: jobDescription || '',
      fileName,
      fileSize,
    });

    const analysisPayload = {
      userId,
      fileName,
      fileSize,
      targetRole,
      jobDescription: jobDescription || '',
      ...analysisResult,
      extractedTextPreview: resumeText.slice(0, 300) + '...',
    };

    let savedRecord = null;
    if (getDBStatus()) {
      try {
        savedRecord = await ResumeAnalysis.create(analysisPayload);
      } catch (dbErr) {
        console.warn('[MongoDB] Save error:', dbErr.message);
      }
    }

    if (!savedRecord) {
      savedRecord = {
        _id: 'mem-' + Date.now(),
        createdAt: new Date().toISOString(),
        ...analysisPayload,
      };
      inMemoryHistory.unshift(savedRecord);
    }

    return res.status(200).json({
      success: true,
      message: 'Resume analyzed successfully.',
      data: savedRecord,
      userCreditsRemaining,
    });
  } catch (error) {
    console.error('[Analyze Controller Error]:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error occurred while analyzing resume.',
    });
  }
};

export const getInMemoryHistory = () => inMemoryHistory;
