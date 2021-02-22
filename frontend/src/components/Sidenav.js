import React, {useState, useContext} from 'react'
import {LinkContext} from '../Contexts/Linkcontext'


const Sidenav = () => {
  const {value1, value2} = useContext(LinkContext);

  //il sagit de recuper une array de array de json pour les liens de ma barre de navigation
  const navlinks = value1
  const data = navlinks[0]


  //pour pouvoir mettre a jour mon state a chaque fois que linfo change

  const [clicked, setClicked] = value2


  
  //recuperer dans une variable le nom du lien pour lutilliser pour recuperer les tables
  
  const handleClick = (e) =>{
    //console.log(e.target.getAttribute('value'));
     var appuie = e.target.getAttribute('value');

     setClicked(appuie);

    };

   return (
    <div className= "navbar">
      <nav>
        <h1>DATABASE TABLES</h1>
      <ul>
        {data.map((lien, index) =>( 
       <li key={index}><a className="lien" href="#" value={lien.table_name} onClick={handleClick}>{lien.table_name}</a></li>
        ))};
        </ul>
         {/*<Displayer clicked ={clicked}/> */ }
      </nav>
    </div>
  )
}

export default Sidenav
