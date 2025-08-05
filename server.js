require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const authRoutes = require('./routes/authRoutes');

// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/',(req,res)=>{
    res.json("hello this is something extra nice");
});


app.get('/test-user', async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.json({ message: 'User model working!', userCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/get-this',(req,res)=>{
    res.json({mes: 'this is message !!!!',name : 'bharat bhai is writting',age : 34})
})

app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`);
})


