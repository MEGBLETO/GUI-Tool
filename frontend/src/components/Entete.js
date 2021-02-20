import React, {useContext} from 'react'
import {Modalcontext} from '../Contexts/Modalcontext'
import {Link} from 'react-router-dom'


const Entete = () => {

  //modal pour formulaire de connection
  const [showModal, setShowModal] = useContext(Modalcontext)
  console.log(showModal)

  //avec cette fonction je change la valeur de faux a vrai en fonction de la position du modal
  const openModal = (e) =>{
    setShowModal(prev => !prev)
  }

  return (
    <div className="entete">
      <h1>GUI <span>Tool</span></h1>
      
      


      <button id="btn" onClick={openModal}>Se Connecter</button>
    </div>
  )
}

export default Entete
