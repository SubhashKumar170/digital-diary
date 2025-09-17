const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser'); // ✅ add this
const entryRoutes = require('./routes/entryRoutes');
const authRoutes = require('./routes/authRoutes');
const jwt = require('jsonwebtoken'); // ✅ make sure this is imported

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Fix CORS for cookies
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // ✅ parse cookies

// Just for frontend to check authentication
app.get('/check-auth', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: 'Authenticated', user });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

app.use('/api', entryRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`🚀 Server started at port ${PORT}`);
});
