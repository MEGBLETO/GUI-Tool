const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
//const {pool} = require('./config/dbconfig');
const cors = require('cors');
//const { Pool } = require('pg');

//initialisation de express
const app = express()

//my Middlewares
app.use(cors());
app.use(express.json()); //req.body


//My routes 
var user="";
var host ="";
var dbname;
var password = "";
var port;

/*Here is a post route for posting the form data to my server */
app.post('/api/submit', (req, res) =>{ 
  try {
    res.send("i got some data from your frontend")     
     
     user = req.body.answer.user
     host  = req.body.answer.host
     dbname = req.body.answer.dbname;
     password = req.body.answer.password
     port =  req.body.answer.port

     
     //console.log(data) 
    } catch (error) { 
      console.log(error.message)  
  }
  const pool = new Pool({
    user: process.env.user,
    host:  process.env.host,
    database: `${dbname}`,
    password: `${password}`,
    port:  `${port}`
  },
  console.log(user, host, dbname, password, port)
  //console.log(dbname)
  )
  
  console.log(pool.user)


//ici je recupere le type de la donnee presente dans une table que nous aurons defini
app.get('/api/types', async(req, res) => {

 try {
   const query = await pool.query("select ordinal_position AS num, column_name as name, data_type as typ, character_maximum_length as lenth  from INFORMATION_SCHEMA.COLUMNS WHERE table_catalog='bd' AND table_name='clients'");
   res.json(query.rows);
 }
  catch (error) {
   console.log(error.message);
 }
})


//ici je recupere le nom de toute les tables presente dans ma base et je vais use cela avec ma bar de navigation
app.get('/api/tables', async(req, res) => {

 try {
   const query = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_type='BASE TABLE' AND table_schema='public'");
   res.json(query.rows);
 }
  catch (error) {
   console.log(error.message);
 }
})


//ici je recupere chaque table de ma base de donnee en specifiant le nom de la table a travers ma barre de navigation
app.get('/api/singletable/:tablename', async(req, res) => {

 try {
   const {tablename} = req.params;
   
   const query = await pool.query(`SELECT * FROM ` + tablename);
   res.json(query.rows);
 }
  catch (error) {
   console.log(error.message);
 }
})





//ici je veux recuperer toute les tables presente dans la base ainsi que les attributs associer a  chacune d'elle

app.get('/api/fullsend/:tablename', async(req, res)=>{
  try {
    const tablename = req.params.tablename;
    console.log(tablename)

    const query = await pool.query(`SELECT  
    f.attnum AS number,  
    f.attname AS name,  
    f.attnum,   
    f.attnotnull AS notnull,  
    pg_catalog.format_type(f.atttypid,f.atttypmod) AS type,  
    CASE  
        WHEN p.contype = 'p' THEN 'true'  
        ELSE 'false'  
    END AS primarykey,  
    CASE  
        WHEN p.contype = 'u' THEN 'true'  
        ELSE 'false'
    END AS uniquekey,
    CASE
        WHEN p.contype = 'false' THEN g.relname
    END AS foreignkey,
    CASE
        WHEN p.contype = 'false' THEN p.confkey
    END AS foreignkey_fieldnum,
    CASE
        WHEN p.contype = 'false' THEN 'true'  
        ELSE 'false'  END AS foreignkey,
    CASE
        WHEN p.contype = 'false' THEN p.conkey
    END AS foreignkey_connnum
FROM pg_attribute f  
    JOIN pg_class c ON c.oid = f.attrelid  
    JOIN pg_type t ON t.oid = f.atttypid  
    LEFT JOIN pg_attrdef d ON d.adrelid = c.oid AND d.adnum = f.attnum  
    LEFT JOIN pg_namespace n ON n.oid = c.relnamespace  
    LEFT JOIN pg_constraint p ON p.conrelid = c.oid AND f.attnum = ANY (p.conkey)  
    LEFT JOIN pg_class AS g ON p.confrelid = g.oid  

    WHERE c.relkind = 'r'::char  
    AND n.nspname = 'public'  -- Replace with Schema name  
    AND c.relname = '${tablename}' -- Replace with table name  
    AND f.attnum > 0 ORDER BY number
;
`)

     res.json(query.rows);

  } catch (error) {
    console.log(error.message);
  }
})




//ici je recupere en fonction de ce quil ya dans chaque table les cle primaire et les cles etrangere
app.get('/api/foreignkey/:table', async(req, res) => {

 try {
  const table = req.params.table;

   const query = await pool.query(`SELECT
   tc.table_schema, 
   tc.constraint_name, 
   tc.table_name,
   kcu.column_name, 
   ccu.table_schema AS foreign_table_schema,
   ccu.table_name AS foreign_table_name,
   ccu.column_name AS foreign_column_name 
FROM 
   information_schema.table_constraints AS tc 
   JOIN information_schema.key_column_usage AS kcu
     ON tc.constraint_name = kcu.constraint_name
     AND tc.table_schema = kcu.table_schema
   JOIN information_schema.constraint_column_usage AS ccu
     ON ccu.constraint_name = tc.constraint_name
     AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name= '${table}';`);
   res.json(query.rows);
 }
  catch (error) {
   console.log(error.message);
 }
})


})



app.listen(5000, () => {
  console.log(`Server started on port 5000`);
});

