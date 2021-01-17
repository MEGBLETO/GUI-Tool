import React, {useState, useEffect}from 'react'

const Displayer = (props) => {
  //ici je  recupere la valeur clicked de mon props 

  const clicked = props.clicked;
  console.log(clicked);

  const [table, getTableContents] = useState([]);


   const  fetchtables = async() =>{

    try {
      const result = await fetch(`http://localhost:5000/singletable/${clicked}`);

      const res = await result.json();

      getTableContents(res);

    } catch (error) {
      console.log(Error.message);
    }

    
  }


  useEffect(() =>{
   fetchtables()
  },[]);

  console.log(table); 

  return (
    <div className="montreur">
      <h1>Hello World</h1>
    </div>
  )
}

export default Displayer
