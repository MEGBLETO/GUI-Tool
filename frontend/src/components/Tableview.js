import React, {useState , useEffect, useContext} from 'react'
import {LinkContext} from '../Contexts/Linkcontext'



const Tableview = () => {
/*Section pour recuperer la table demander */

const {value2} = useContext(LinkContext);

//pour pouvoir mettre a jour mon state a chaque fois que linfo change

const [clicked, setClicked] = value2

//console.log(clicked)


  const [table, setTable] = useState([])
  //console.log(table)


  
  //for the button click in the link i want the value here so that i could pass it to other component
  
  const getTable = async () =>{
    try {
      
      const res = await fetch(`http://localhost:5000/api/fullsend/${clicked}`);
      const jsonres = await res.json();
      //console.log(jsonres)
      setTable(jsonres)
    } catch (error) {
      console.log(error.message);
    }
  }
  
  //useEffect in order to fetch the data by calling a function
  useEffect(() =>{
    getTable()
  },[clicked]);
  
  /*ici on va utilliser linformation recu sous format json de notre api et cre un tableau */

  /*Entete de ma table */

  const columnHeader = ["name","notnull","type","primarykey","uniquekey","foreignkey"]

const generateHeader = () =>{

  let result =[];
  for(var i = 0; i < columnHeader.length; i++){
     result.push(<th id={columnHeader[i]}>{columnHeader[i]}</th>)
  }
  return result;
}


/*Contenu de mes tables */
const collectData = () =>{

  let result = [];

  for(var i=0 ; i< table.length; i++){
       
    var val = table[i];
  
    console.log(val)
    result.push(
      <tr key={i}>
        <td>{val.name}</td>
        <td>{val.notnull}</td>
        <td>{val.type}</td>
        <td>{val.primarykey}</td>
        <td>{val.uniquekey}</td>
        <td>{val.foreignkey}</td>

      </tr>
    )
  }
  return result;

}


  return (
    <div className="tableview">
      <h3>You are currently viewing the <span className="clicked">{clicked}</span> table structure</h3>
      <table className="table">
        <thead className="tablehead">
          <tr className="tablerow">{generateHeader()}</tr>
        </thead>
        <tbody className="tablebody">
      
           {collectData()}
  
        </tbody>
      </table>
    </div>
  )
}

export default Tableview
