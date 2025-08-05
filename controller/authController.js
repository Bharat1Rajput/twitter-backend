const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// generate JWT token
const generateAuthToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

// register a new user
const registerUser = async (req,res)=>{
    const { username, email, password, displayName } = req.body;

    try {
        // bharat here we Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if(existingUser) {
            return res.status(400).json({ error: 'user already exists.' });
        }
        
        // bharat lets Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // bharat now lets create new user 
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            displayName
        });
        // bharat now lets save the user
        await newUser.save();
        // bharat now lets generate JWT token
        const token = generateAuthToken(newUser);

        res.status(201).json({ 
            message: 'User registered successfully', 
            user: { id: newUser._id, username: newUser.username, email: newUser.email, displayName: newUser.displayName },
            token 
        });

}catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
}

};

// bharat now lets do it for login to the user

const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;

        // bharat find the user 
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: 'Invalid credintials'});
        }
      
        // bharat bhai lets check the password 
        const validPassword = await bcrypt.compare(password,user.password);
        if(!validPassword){
            return res.status(400).json({error : "password not matching"});

        }

        // bharat its token is 
        const token = generateAuthToken(user);

        res.status(201).json({message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        displayName: user.displayName
      }});


    } catch(error){
        res.status(500).json({ error: 'Server error during login' });
    }
};


module.exports = {registerUser,loginUser};