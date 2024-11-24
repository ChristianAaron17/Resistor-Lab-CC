import { Sequelize } from 'sequelize';

const db = new Sequelize('capstonedb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;
