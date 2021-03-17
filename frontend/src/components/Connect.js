import React, {useState, useContext} from 'react'
import {Modalcontext} from '../Contexts/Modalcontext'


const Connect = () => {
  const [showModal, setShowModal] = useContext(Modalcontext)

   //data de mon formulaire
  const  [data, setData] = useState({
    user: "",
    host:"",
    dbname:"",
    password:"",
    port:""
  })



   const postData = async(url = 'http://localhost:5000/api/submit', donnee={data}) =>{
       
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', 
      mode: 'cors', 
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json'  
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(donnee) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  postData('http://localhost:5000/api/submit', { answer: data})
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
    });


    const handle = (e) =>{
      const newData = {...data}

     // Here i'm getting the id of the event that got fired and then setting it to it value 
      newData[e.target.id] = e.target.value
      

      //Now i.m updating my state 
      setData(newData)
      console.log(newData)
    }

  

  return (
    <>
    {showModal ?
    <div className="modal-container" >
    <form className="connect" onSubmit={(e)=> postData(e)}>
      <div className="head">
        <h1>Se Connecter</h1>
      </div>
    
    <div className="items">
      <div className="item">
        <label htmlFor="user">Database User:</label>
        <input type="text" onChange={(e) =>handle(e)} id="user" value={data.user}/>
      </div>
      <div className="item">
        <label htmlFor="dbhost">Database Host:</label>
        <input type="text"  onChange={(e) =>handle(e)} id="host" value={data.host}/>
      </div>
      <div className="item">
        <label htmlFor="dbname">Database Name:</label>
        <input type="text"  onChange={(e) =>handle(e)} id="dbname" value={data.dbname}/>
      </div>

      <div className="item">
        <label htmlFor="password">Password:</label>
        <input type="password"  onChange={(e) =>handle(e)} id="password" value={data.password}/>
      </div>
      <div className="item">
        <label htmlFor="port">Port Number:</label>
        <input type="text"  onChange={(e) =>handle(e)} id="port" value={data.port}/>
      </div>
    </div>
    <div className="submit">
      <button type="submit" onClick={postData}>Connecter</button>
    </div>
    </form> 
  </div>: null}
    </>

  )
}


export default Connect
