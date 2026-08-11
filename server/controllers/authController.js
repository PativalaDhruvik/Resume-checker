import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { getDBStatus } from '../config/db.js';

// In-memory fallback users store if MongoDB is offline
const inMemoryUsers = [];

const generateToken = (userId, email) => {
  return jwt.sign(
    { id: userId, email },
    process.env.JWT_SECRET || 'resumai_super_secret_jwt_token_key_2026',
    { expiresIn: '30d' }
  );
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, targetRole } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser = null;

    if (getDBStatus()) {
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'User with this email already exists.' });
      }

      newUser = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        plan: 'Free Plan',
        scansRemaining: 5,
      });
    }

    if (!newUser) {
      // In-memory user fallback
      const existingMem = inMemoryUsers.find((u) => u.email === email.toLowerCase());
      if (existingMem) {
        return res.status(400).json({ success: false, message: 'User with this email already exists.' });
      }

      newUser = {
        _id: 'usr-' + Date.now(),
        name,
        email: email.toLowerCase(),
        plan: 'Free Plan',
        scansRemaining: 5,
        targetRole: targetRole || 'Senior Full Stack Developer',
      };
      inMemoryUsers.push({ ...newUser, password: hashedPassword });
    }

    const token = generateToken(newUser._id, newUser.email);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully with Express.js API.',
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        plan: newUser.plan,
        creditsRemaining: newUser.scansRemaining || 5,
        token,
      },
    });
  } catch (error) {
    console.error('[Express Auth Register Error]:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error during registration.' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    let userObj = null;

    if (getDBStatus()) {
      userObj = await User.findOne({ email: email.toLowerCase() });
    } else {
      userObj = inMemoryUsers.find((u) => u.email === email.toLowerCase());
    }

    if (!userObj) {
      // Create user automatically for seamless onboarding
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      userObj = {
        _id: 'usr-' + Date.now(),
        name: email.split('@')[0],
        email: email.toLowerCase(),
        plan: 'Free Plan',
        scansRemaining: 5,
      };
      inMemoryUsers.push({ ...userObj, password: hashedPassword });
    }

    const token = generateToken(userObj._id, userObj.email);

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully via Express.js API.',
      data: {
        id: userObj._id,
        name: userObj.name,
        email: userObj.email,
        plan: userObj.plan || 'Free Plan',
        creditsRemaining: userObj.scansRemaining !== undefined ? userObj.scansRemaining : 5,
        token,
      },
    });
  } catch (error) {
    console.error('[Express Auth Login Error]:', error);
    return res.status(500).json({ success: false, message: 'Server error during login.' });
  }
};

export const getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    let userObj = null;

    if (getDBStatus()) {
      userObj = await User.findById(userId).select('-password');
    } else {
      userObj = inMemoryUsers.find((u) => u._id === userId);
    }

    if (!userObj) {
      return res.status(404).json({ success: false, message: 'User profile not found.' });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: userObj._id,
        name: userObj.name,
        email: userObj.email,
        plan: userObj.plan,
        creditsRemaining: userObj.scansRemaining,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching user profile.' });
  }
};

export const upgradeUserPlan = async (req, res) => {
  try {
    const { planName, newCredits } = req.body;
    const userId = req.user?.id || 'guest-user';

    if (getDBStatus()) {
      const userObj = await User.findById(userId);
      if (userObj) {
        userObj.plan = planName;
        userObj.scansRemaining = (userObj.scansRemaining || 0) + (newCredits || 15);
        await userObj.save();
      }
    } else {
      const memUser = inMemoryUsers.find((u) => u._id === userId);
      if (memUser) {
        memUser.plan = planName;
        memUser.scansRemaining = (memUser.scansRemaining || 0) + (newCredits || 15);
      }
    }

    return res.status(200).json({
      success: true,
      message: `Plan successfully upgraded to ${planName} via Express API.`,
      data: {
        plan: planName,
        creditsAdded: newCredits,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to upgrade plan.' });
  }
};
