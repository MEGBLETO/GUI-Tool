import React, {useState, createContext } from 'react'


export const Modalcontext = createContext();

export const ModalProvider = props => {

  //setting my state
  const [showModal, setShowModal] = useState(false)

 

  return (
    <Modalcontext.Provider value= {[showModal, setShowModal]}>
      {props.children}
  </Modalcontext.Provider>
  );
}

