import React, {useContext} from 'react'
import {Modalcontext} from '../Contexts/Modalcontext'


const Connect = () => {
  const [showModal, setShowModal] = useContext(Modalcontext)

  return (
    <>
    {showModal ?
    <div className="modal-container" action="">
    <form className="connect">
      <div className="head">
        <h1>Se Connecter</h1>
      </div>
    
    <div className="items">
      <div className="item">
        <label htmlFor="dbname">Database Name:</label>
        <input type="text"/>
      </div>

      <div className="item">
        <label htmlFor="passeord">Password:</label>
        <input type="text"/>
      </div>
      <div className="item">
        <label htmlFor="port">Port Number:</label>
        <input type="text"/>
      </div>
    </div>
    <div className="submit">
      <button>Connecter</button>
    </div>
    </form> 
    </div>: null}
    </>

  )
}

export default Connect
