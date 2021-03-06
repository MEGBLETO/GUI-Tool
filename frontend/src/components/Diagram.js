import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Diholder from  './Diholder'


const Diagram = () => {

   //ici je recupere le nom des tables presente dans la base et ensuite je les inseres dans une array(plus simple a parcourir pour moi)

   const [tables, SetTablesnames] = useState([])
   const [isfetched, setisfetched] = useState(false)


   const getTablesNames = async() =>{
     try {
       const res = await axios.get(`http://localhost:5000/api/tables`);
       const data =  res.data;
       SetTablesnames(data)       
       //console.log(tables)
     } catch (error) {
       
       console.log(error.message)
     }
   
   }
   
   
     useEffect(() =>{
       getTablesNames()
     }, []) 
   

     
//ici je vais creer une array qui va contenenire le nom de mes tables


let tablesArray = [];

//ici je vais un foreach table  a travers mon json et  push le contenu dans mon array

tables.forEach((table, index) => tablesArray.push(table.table_name) )



  return (
    <div className="diagram"> 
   <Diholder tablearray={tablesArray}/>
     <Diholder tablearray={tablesArray}/>
    </div>
  )
}

export default Diagram
