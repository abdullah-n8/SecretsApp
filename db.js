// This file contains the connection to the MongoDB database and the definition of the User model.
// It also exports the functions to register and authenticate users.

// Import necessary modules and environmental variables
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');
require('dotenv').config();

// Connect to the MongoDB database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((err) => {
    console.log('Error connecting to the database:', err);
  });

// Define the User model schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

// Apply the mongoose-encryption plugin to the User model
userSchema.plugin(encrypt, {
  secret: process.env.SECRET,
  encryptedFields: ["password"]
});

// Define the User model
const User = mongoose.model("User", userSchema);

// Function to register a user
const registerUser = async (email, password) => {
  try {
    const user = new User({ email, password });
    await user.save();
    return 0; // Return success code
  } catch (err) {
    console.log('Error registering user:', err);
    return 1; // Return error code
  }
};

// Function to authenticate a user
const authenticateUser = async (email, password) => {
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      if (user.password === password) {
        return 0; // Return success code
      } else {
        return 1; // Return authentication error code
      }
    } else {
      return 2; // Return user not found error code
    }
  } catch (err) {
    console.log('Error authenticating user:', err);
    return 3; // Return general error code
  }
};

// Export the functions to register and authenticate users
module.exports = {
  registerUser,
  authenticateUser
};
