import mongoose from 'mongoose';

const resumeAnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: 'guest-user',
    },
    fileName: {
      type: String,
      required: true,
    },
    fileSize: {
      type: String,
      default: '0 KB',
    },
    targetRole: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      default: '',
    },
    atsScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    statusBadge: {
      type: String,
      enum: ['Excellent ATS Match', 'Great ATS Compatibility', 'Needs Improvement', 'Critical ATS Warnings'],
      default: 'Great ATS Compatibility',
    },
    categoryMetrics: {
      formatting: { type: Number, default: 85 },
      keywordMatch: { type: Number, default: 75 },
      impactMetrics: { type: Number, default: 80 },
      clarity: { type: Number, default: 82 },
    },
    matchedKeywords: [
      {
        keyword: String,
        category: String, // Skills, Tools, Domain, Architecture
      },
    ],
    missingKeywords: [
      {
        keyword: String,
        importance: String, // High, Medium, Low
        recommendation: String,
      },
    ],
    actionableIssues: [
      {
        id: String,
        severity: {
          type: String,
          enum: ['critical', 'warning', 'info'],
        },
        title: String,
        description: String,
        recommendation: String,
        suggestedFix: String,
      },
    ],
    bulletDiffs: [
      {
        id: String,
        section: String,
        original: String,
        aiImproved: String,
        impactScoreIncrease: String, // "+25% Impact"
        improvementsMade: [String],
      },
    ],
    summaryFeedback: {
      type: String,
      default: '',
    },
    extractedTextPreview: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ResumeAnalysis || mongoose.model('ResumeAnalysis', resumeAnalysisSchema);
