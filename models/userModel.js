import { Sequelize, STRING } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const Users = db.define(
  'users',
  {
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    refersh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Users;
