import React, {useState, useEffect}  from 'react'
import Xarrow from 'react-xarrows'


const Diholder = ({tablearray})=> { 


  /*ici je recuper ma liste de table */
  const tablesArray  = tablearray
//console.log(tablesArray)


const [table, setTable]= useState([])
const [currentable, seTcurrenTable]= useState([])

//console.log(table)
const getEachTable = async () =>{
  try {

    const tables = await Promise.all(
      tablesArray.map(async (table)=>{
        /*A chaque foi je recupere le nom de la table que je push dans une array en fonction de lordre dexecution */
      seTcurrenTable(oldArray => [...oldArray, table])
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
  
//console.log(currentable)


/*****************************ici je veux m'occupper des connections pour pouvoir montrer l'origine et la  provenance de mes cles etrangeres */
const [key, setKeys] = useState([])


  useEffect(() =>{
     getKeys();
  }, [tablesArray])

const getKeys = async() =>{
  const tables = await Promise.all(
    tablesArray.map(async (table)=>{
        const res= await fetch(`http://localhost:5000/api/foreignkey/${table}`)
    return await res.json();
      }))

    setKeys(tables)
}

console.log(key)
/***************************************************************************************************************************************** */

  return (
<div className="diholder">

{table.map((tab, index) =>(
 <table key={index} className="tabled" id={currentable[index]}>
   <thead className="tablehead2"><span className="kido"><h1>{currentable[index]}</h1></span>
</thead>

 <thead className="tableheadd">
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

{key.map((fk, index) =>(
    fk.map((eachfk) =>{
      console.log(eachfk.foreign_column_name);
      console.log(eachfk.column_name)
      return <Xarrow start={eachfk.column_name} end= {eachfk.foreign_table_name}/>
    })
))}
</div>
  )}

export default Diholder

