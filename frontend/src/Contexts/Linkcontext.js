import React, {useState, useEffect,  createContext } from 'react'


export const LinkContext = createContext();

export const LinkProvider = props => {

  //setting my state
  const [navlinks, setnavlinks] = useState([]);
  const [clicked, setclicked] = useState(null)

  //for the button click in the link i want the value here so that i could pass it to other component
  
  const getnavlinks = async () =>{
    try {
      
      const res = await fetch("http://localhost:5000/tables");
      const jsonres = await res.json();
         setnavlinks(jsonres)
    } catch (error) {
      console.log(error.message);
    }
  }

//useEffect in order to fetch the data by calling a function
  useEffect(() =>{
    getnavlinks()
   },[]);


  return (
    <LinkContext.Provider value= {{value1:[navlinks], value2: [clicked, setclicked]}}>
      {props.children}
  </LinkContext.Provider>
  );
}

export default LinkProvider;