import ResumeAnalysis from '../models/ResumeAnalysis.js';
import { getDBStatus } from '../config/db.js';
import { getInMemoryHistory } from './analyzeController.js';

export const getHistory = async (req, res) => {
  try {
    if (getDBStatus()) {
      const records = await ResumeAnalysis.find().sort({ createdAt: -1 }).limit(50);
      return res.status(200).json({ success: true, data: records });
    }

    // Fallback to in-memory history
    return res.status(200).json({ success: true, data: getInMemoryHistory() });
  } catch (error) {
    console.error('[History Controller Error]:', error);
    return res.status(500).json({ success: false, message: 'Error retrieving analysis history.' });
  }
};

export const getHistoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (getDBStatus()) {
      const record = await ResumeAnalysis.findById(id);
      if (record) {
        return res.status(200).json({ success: true, data: record });
      }
    }

    const inMemItem = getInMemoryHistory().find((item) => item._id === id);
    if (inMemItem) {
      return res.status(200).json({ success: true, data: inMemItem });
    }

    return res.status(404).json({ success: false, message: 'Analysis record not found.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching record.' });
  }
};

export const deleteHistoryRecord = async (req, res) => {
  try {
    const { id } = req.params;

    if (getDBStatus()) {
      await ResumeAnalysis.findByIdAndDelete(id);
    } else {
      const memHistory = getInMemoryHistory();
      const idx = memHistory.findIndex((item) => item._id === id);
      if (idx !== -1) memHistory.splice(idx, 1);
    }

    return res.status(200).json({ success: true, message: 'History record deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting record.' });
  }
};
