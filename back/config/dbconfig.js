require('dotenv').config();
const { Pool } = require('pg');
const data = require('../index')

//my data

console.log(data.answer);

/*
const user = variables.user;
const host = variables.host;
const dbname = variables.dbname;
const password =variables.password;
const port =  variables.port;
console.log(user,host,dbname,password,port)
*/

const pool = new Pool({
  user:  process.env.user,
  host:  process.env.host,
  database:  process.env.database,
  password:  process.env.password,
  port:  process.env.port
})

 Pool.host= req.body.answer.host,
  Pool.database= req.body.answer.dbname,
  Pool.password= req.body.answer.password,
  Pool.port = req.body.answer.port.port

module.exports = {pool};