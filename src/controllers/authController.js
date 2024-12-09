const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { login, register, checkEmailExists } = require('../models/authModel');

const loginController = async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const result = await login(data);
    const row = result[0];

    if (result.length !== 0) {
      const match = await bcrypt.compare(data.password, row.password);
      if (match) {
        const payload = { email: row.email };
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3d' });
        const loginResult = {
          id: row.id,
          email: row.email,
          token: accessToken,
        };
        return res.status(200).json({
          message: 'Login Successfuly',
          loginResult: loginResult,
        });
      } else {
        return res.status(400).json({
          message: 'Wrong Password',
        });
      }
    } else {
      return res.status(400).json({
        message: 'Email not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const registerController = async (req, res) => {
  const data = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  };

  try {
    await register(data);
    return res.status(201).json({
      message: 'Register successfully',
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const logoutController = (req, res) => {
  res.status(200).json({
    message: 'Logged out successful',
  });
};

module.exports = { loginController, registerController, logoutController };
