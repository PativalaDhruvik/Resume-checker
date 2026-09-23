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
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (getDBStatus()) {
      const existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'An account with this email address already exists.' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        plan: 'Free Plan',
        creditsRemaining: 5,
        scansRemaining: 5,
      });

      const token = generateToken(newUser._id, newUser.email);

      return res.status(201).json({
        success: true,
        message: 'Account created successfully.',
        data: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          plan: newUser.plan,
          creditsRemaining: newUser.creditsRemaining,
          token,
        },
      });
    } else {
      // In-memory fallback mode
      const existingMem = inMemoryUsers.find((u) => u.email === normalizedEmail);
      if (existingMem) {
        return res.status(400).json({ success: false, message: 'An account with this email address already exists.' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = {
        _id: 'usr-' + Date.now(),
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        plan: 'Free Plan',
        creditsRemaining: 5,
        scansRemaining: 5,
      };
      inMemoryUsers.push(newUser);

      const token = generateToken(newUser._id, newUser.email);

      return res.status(201).json({
        success: true,
        message: 'Account created successfully (Memory Mode).',
        data: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          plan: newUser.plan,
          creditsRemaining: newUser.creditsRemaining,
          token,
        },
      });
    }
  } catch (error) {
    console.error('[Auth Register Error]:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error during registration.' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please enter both email and password.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    let userObj = null;

    if (getDBStatus()) {
      userObj = await User.findOne({ email: normalizedEmail });
    } else {
      userObj = inMemoryUsers.find((u) => u.email === normalizedEmail);
    }

    if (!userObj) {
      return res.status(400).json({ success: false, message: 'No account found with this email. Please sign up first.' });
    }

    const isMatch = await bcrypt.compare(password, userObj.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect password. Please try again.' });
    }

    const token = generateToken(userObj._id, userObj.email);
    const credits = userObj.creditsRemaining !== undefined ? userObj.creditsRemaining : (userObj.scansRemaining ?? 5);

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      data: {
        id: userObj._id,
        name: userObj.name,
        email: userObj.email,
        plan: userObj.plan || 'Free Plan',
        creditsRemaining: credits,
        token,
      },
    });
  } catch (error) {
    console.error('[Auth Login Error]:', error);
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

    const credits = userObj.creditsRemaining !== undefined ? userObj.creditsRemaining : (userObj.scansRemaining ?? 5);

    return res.status(200).json({
      success: true,
      data: {
        id: userObj._id,
        name: userObj.name,
        email: userObj.email,
        plan: userObj.plan || 'Free Plan',
        creditsRemaining: credits,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching user profile.' });
  }
};

export const upgradeUserPlan = async (req, res) => {
  try {
    const { planName, newCredits } = req.body;
    const userId = req.user?.id;

    if (!userId || userId === 'guest-user') {
      return res.status(401).json({ success: false, message: 'Authentication required to upgrade plan.' });
    }

    let updatedCredits = 5;

    if (getDBStatus()) {
      const userObj = await User.findById(userId);
      if (userObj) {
        userObj.plan = planName;
        userObj.creditsRemaining = (userObj.creditsRemaining || 0) + (newCredits || 15);
        userObj.scansRemaining = userObj.creditsRemaining;
        await userObj.save();
        updatedCredits = userObj.creditsRemaining;
      }
    } else {
      const memUser = inMemoryUsers.find((u) => u._id === userId);
      if (memUser) {
        memUser.plan = planName;
        memUser.creditsRemaining = (memUser.creditsRemaining || 0) + (newCredits || 15);
        memUser.scansRemaining = memUser.creditsRemaining;
        updatedCredits = memUser.creditsRemaining;
      }
    }

    return res.status(200).json({
      success: true,
      message: `Plan successfully upgraded to ${planName}.`,
      data: {
        plan: planName,
        creditsRemaining: updatedCredits,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to upgrade plan.' });
  }
};

export const getInMemoryUsers = () => inMemoryUsers;
