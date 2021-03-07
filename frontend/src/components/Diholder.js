import React, {useState, useEffect}  from 'react'



const Diholder = ({tablearray})=> { 


  /*ici je recuper ma liste de table */
  const tablesArray  = tablearray
//console.log(tablesArray)


const [table, setTable]= useState([])

console.log(table)
const getEachTable = async () =>{
  try {

    const tables = await Promise.all(
      tablesArray.map(async (table)=>{
          const res= await fetch(`http://localhost:5000/api/fullsend/${table}`)
      return await res.json();
        }))
  
      setTable(tables) 
     // console.log(tables)  
   
 }catch(error) {
    console.log(error.message)
  }
   
}

useEffect(() => {
  console.log("i fire once")
 getEachTable()
},[tablesArray]);


/*A partir d'ici je veux afficher linformation */

  /*Entete de ma table */

  const columnHeader = ["name","primarykey","foreignkey"]


  const generateHeader = () =>{

    let result =[];
    for(var i = 0; i < columnHeader.length; i++){
       result.push(<th id={columnHeader[i]}>{columnHeader[i]}</th>)
    }
    return result;
  }
  


  return (
<div className="diholder">

{ table.map((tab, index) =>(
 <table key={index} className="tabled">
 <thead className="tableheadd">
   <tr className="tablerowdd"></tr>
    <tr className="tablerowdd"> {generateHeader()}</tr>
 </thead>
   {tab.map((tabledetails) =>{
     return  <tbody className="tablebodyd">
    <tr>
        <td id={tabledetails.name}>{tabledetails.name}</td>
        <td id={tabledetails.primarykey}>{tabledetails.primarykey}</td>
        <td id={tabledetails.foreignkey}>{tabledetails.foreignkey}</td>
      </tr>
   </tbody>
   })}
</table>
))}
</div>
  )
  }

export default Diholder
