const db = require('../config/database');

const login = async (data) => {
  const [result] = await db.query(`SELECT * FROM users WHERE email = ?`, [data.email]);

  return result;
};

const register = async (data) => {
  await db.query(
    `INSERT INTO users(username, email, password) VALUES('${data.username}', '${data.email}', '${data.password}')`
  );
  return true;
};

module.exports = {
  login,
  register,
};
