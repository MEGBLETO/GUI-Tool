const express = require('express');
const {pool} = require('./config/dbconfig');
const cors = require('cors');

//initialisation de express
const app = express()


//my Middlewares
app.use(cors());
app.use(express.json()); //req.body


//My routes 


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
    const {tablename} = req.params;
    const query = await pool.query(`
    SELECT  
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
        ELSE 'f'
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
    AND c.relname = {tablename} -- Replace with table name  
    AND f.attnum > 0 ORDER BY number
;
`)

     res.json(query.rows);

  } catch (error) {
    console.log(error.message);
  }
})




//ici je recupere en fonction de ce quil ya dans chaque table les cle primaire et les cles etrangere
app.get('/api/keys', async(req, res) => {

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





app.listen(5000, () => {
  console.log(`Server started on port 5000`);
});

