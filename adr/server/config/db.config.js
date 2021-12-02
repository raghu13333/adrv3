const path = require( 'path' );
require('dotenv').config({ path: path.resolve(__dirname, '../routes/api/.env') })
module.exports = {
  HOST: process.env.HOST,
  USER: "admin",
  PASSWORD: process.env.PASS,
  DB: "new_schema",
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
