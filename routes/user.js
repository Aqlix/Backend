const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');
const multer = require('multer');

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// <<<<<-----register route ---->>>>>//

router.post('/register', upload.single('file'), async (req, res) => {
  try {
    const { fullName, email, username, password } = req.body;

    if (!(fullName && email && username && password)) {
      return res.status(400).json({ error: 'Fill all credentials!' });
    }

    const existingUser = await UserModel.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists!' });
    }

    const encPass = await bcrypt.hash(password, 10);

    // Check if a file was uploaded
    const file = req.file;
   

    // Extract relevant information from the file object
    const imageName = file.filename;
    const imagePath =  file.path
    console.log(imagePath)
    // Saving the user in DB
    const userData = await UserModel.create({
      fullName: fullName,
      email: email,
      username: username,
      password: encPass,
      image: imageName
    });

    console.log(userData);
    res.json({ status: 'success', file, fullName, username, email, password });

    // TODO::token generation using jwt.
  } catch (error) {
    console.error('Error saving user:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
