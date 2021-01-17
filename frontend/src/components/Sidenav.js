import React, {useEffect, useState} from 'react'
import Displayer from './Displayer'

const Sidenav = () => {

  const [navlinks, setnavlinks] = useState([]);
  const [clicked, setClicked] = useState([]);
  
  const getnavlinks = async () =>{
    try {
      
      const res = await fetch("http://localhost:5000/tables");
      const jsonres = await res.json();

         setnavlinks(jsonres)
    } catch (error) {
      console.log(error.message);
    }
  }

  //recuperer dans une variable le nom du lien pour lutilliser pour recuperer les tables
  
  const handleClick = (e) =>{
    //console.log(e.target.getAttribute('value'));
     var appuie = e.target.getAttribute('value');

     setClicked(appuie);

    };

//console.log(clicked);

   useEffect(() =>{
         
    getnavlinks();
   },[]);

   //console.log(navlinks)

   return (
    <div className= "navbar">
      <nav>
        <h1>DATABASE TABLES</h1>
        <ul>
        {navlinks.map(lien =>( 
       <li><a className="lien" href='#' value={lien.table_name} onClick={handleClick}>{lien.table_name}</a></li>
        ))}
        </ul>
        <Displayer clicked ={clicked}/>
      </nav>

      
    </div>
  )
}

export default Sidenav
