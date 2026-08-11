import multer from 'multer';

// Multer memory storage configuration
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'text/plain',
  ];

  if (allowedTypes.includes(file.mimetype) || file.originalname.endsWith('.pdf') || file.originalname.endsWith('.txt') || file.originalname.endsWith('.docx')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format. Please upload a PDF, DOCX, or TXT document.'), false);
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter,
});
