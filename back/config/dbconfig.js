require('dotenv').config();
const { Pool } = require('pg');
const variables = require('../index')

//my data


const user = variables.user;
const host = variables.host;
const dbname = variables.dbname;
const password =variables.password;
const port =  variables.port;
console.log(user,host,dbname,password,port)


const pool = new Pool({
  user:  process.env.user,
  host:  process.env.host,
  database:  process.env.database,
  password:  process.env.password,
  port:  process.env.port
})



module.exports = {pool};