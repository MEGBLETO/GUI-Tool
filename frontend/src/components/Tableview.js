import React, {useState , useEffect, useContext} from 'react'
import {LinkContext} from '../Contexts/Linkcontext'






const Tableview = () => {
/*Section pour recuperer la table demander */

const {value1, value2} = useContext(LinkContext);



//pour pouvoir mettre a jour mon state a chaque fois que linfo change

const [clicked, setClicked] = value2

console.log(clicked)




  const [table, setTable] = useState([])
  console.log(table)


  
  //for the button click in the link i want the value here so that i could pass it to other component
  
  const getTable = async () =>{
    try {
      
      const res = await fetch(`http://localhost:5000/api/fullsend/${clicked}`);
      const jsonres = await res.json();
      console.log(jsonres)
      setTable(jsonres)
    } catch (error) {
      console.log(error.message);
    }
  }
  
  //useEffect in order to fetch the data by calling a function
  useEffect(() =>{
    getTable()
  },[]);
  
  //ici je vais creer une fonction pour pouvoir construire ma table


  const mytable = (table) =>{
    //table header
    let cols = objet.keys(json[0])

    let headerRows = cols.map(col => `<th>${col}`).join("");
  }


  //ici je map sur les column qe j'a cree

  

  return (
    <div className="tableview">
      <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam sunt omnis vel dolorum modi laborum, esse voluptatibus blanditiis inventore fuga alias id voluptates atque mollitia laboriosam deserunt temporibus iste quos!</h1>
    </div>
  )
}

export default Tableview
