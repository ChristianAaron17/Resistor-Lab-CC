require('dotenv').config();
const express = require('express');
const cors = require('cors');

const AuthRoute = require('./routes/authRoute');
const MaterialRoute = require('./routes/materialRoute');

const app = express();

app.use(express.json());

app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: '*',
  })
);

app.use(AuthRoute);
app.use(MaterialRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
