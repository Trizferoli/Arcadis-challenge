const express = require('express');
const app = express();
const routes = require('./routes');

require('dotenv').config()
console.log(process.env.DB_CLIENT)
app.use(express.json());
app.use(routes);
app.listen(process.env.PORT || 3000);
