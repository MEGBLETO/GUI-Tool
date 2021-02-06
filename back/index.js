const express = require('express');
const {pool} = require('./config/dbconfig');
const cors = require('cors');

//initialisation de express
const app = express()


//my Middlewares
app.use(cors());
app.use(express.json()); //req.body




//querying my database test

/*let query =  `select ordinal_position AS num, column_name as name, data_type as typ, character_maximum_length as lenth 
from INFORMATION_SCHEMA.COLUMNS
WHERE table_catalog='bookit' AND table_name='reservation'`*/

/*
let query = `SELECT * FROM clients`;

pool.query(query ,(err, resultat) =>{
  
  if(err){
    console.log(err);
  }

  console.log(resultat)
 
  //var rows = JSON.parse(JSON.stringify(results[0]));
pool.end();
})
*/

//My routes 


//ici je recupere le type de la donnee presente dans une table que nous aurons defini
app.get('/types', async(req, res) => {

 try {
   const query = await pool.query("select ordinal_position AS num, column_name as name, data_type as typ, character_maximum_length as lenth  from INFORMATION_SCHEMA.COLUMNS WHERE table_catalog='bd' AND table_name='clients'");
   res.json(query.rows);
 }
  catch (error) {
   console.log(error.message);
 }
})


//ici je recupere le nom de toute les tables presente dans ma base et je vais use cela avec ma bar de navigation
app.get('/tables', async(req, res) => {

 try {
   const query = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_type='BASE TABLE' AND table_schema='public'");
   res.json(query.rows);
 }
  catch (error) {
   console.log(error.message);
 }
})


//ici je recupere chaque table de ma base de donnee en specifiant le nom de la table a travers ma barre de navigation
app.get('/singletable/:tablename', async(req, res) => {

 try {
   const {tablename} = req.params;
   
   const query = await pool.query(`SELECT * FROM ` + tablename);
   res.json(query.rows);
 }
  catch (error) {
   console.log(error.message);
 }
})


//ici je recupere en fonction de ce quil ya dans chaque table les cle primaire et les cles etrangere
app.get('/keys', async(req, res) => {

 try {
   const query = await pool.query(`SELECT c.conname                                 AS constraint_name,
   c.contype                                     AS constraint_type,
   sch.nspname                                   AS "self_schema",
   tbl.relname                                   AS "self_table",
   ARRAY_AGG(col.attname ORDER BY u.attposition) AS "self_columns",
   f_sch.nspname                                 AS "foreign_schema",
   f_tbl.relname                                 AS "foreign_table",
   ARRAY_AGG(f_col.attname ORDER BY f_u.attposition) AS "foreign_columns",
   pg_get_constraintdef(c.oid)                   AS definition
FROM pg_constraint c
       LEFT JOIN LATERAL UNNEST(c.conkey) WITH ORDINALITY AS u(attnum, attposition) ON TRUE
       LEFT JOIN LATERAL UNNEST(c.confkey) WITH ORDINALITY AS f_u(attnum, attposition) ON f_u.attposition = u.attposition
       JOIN pg_class tbl ON tbl.oid = c.conrelid
       JOIN pg_namespace sch ON sch.oid = tbl.relnamespace
       LEFT JOIN pg_attribute col ON (col.attrelid = tbl.oid AND col.attnum = u.attnum)
       LEFT JOIN pg_class f_tbl ON f_tbl.oid = c.confrelid
       LEFT JOIN pg_namespace f_sch ON f_sch.oid = f_tbl.relnamespace
       LEFT JOIN pg_attribute f_col ON (f_col.attrelid = f_tbl.oid AND f_col.attnum = f_u.attnum)
GROUP BY constraint_name, constraint_type, "self_schema", "self_table", definition, "foreign_schema", "foreign_table"
ORDER BY "self_schema", "self_table";`);
   res.json(query.rows);
 }
  catch (error) {
   console.log(error.message);
 }
})


//ici je veux recuperer toute les tables presente dans la base ainsi que les attributs associer a  chacune d'elle

app.get('/fullsend', async(req, res)=>{
  try {
    const query = await pool.query(`SELECT * 
    FROM INFORMATION_SCHEMA.COLUMNS`)

     res.json(query.rows);

  } catch (error) {
    console.log(error.message);
  }
})





app.listen(5000, () => {
  console.log(`Server started on port 5000`);
});

