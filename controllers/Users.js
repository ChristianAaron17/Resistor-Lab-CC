import Users from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await Users.create({
      username: username,
      email: email,
      password: hashPassword,
    });
    res.json({ message: 'Success Register' });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    const matchPass = await bcrypt.compare(req.body.password, user[0].password);
    if (!matchPass) {
      return res.status(400).json({ message: 'Wrong password' });
    }
    const userId = user[0].id;
    const username = user[0].username;
    const email = user[0].email;
    const accessToken = jwt.sign({ userId, username, email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '60s',
    });
    const refershToken = jwt.sign({ userId, username, email }, process.env.REFERSH_TOKEN_SECRET, {
      expiresIn: '1d',
    });
    await Users.update(
      { refersh_token: refershToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie('refershToken', refershToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ message: 'Email not found' });
  }
};
