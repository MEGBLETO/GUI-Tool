import React, {useState, useEffect}from 'react'
import Mininav from './Mininav'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Tableview from './Tableview'
import Diagram from './Diagram'


const Displayer = () => {
  //ici je  recupere la valeur clicked de mon props 

  /*const clicked = props.clicked;
  console.log(clicked);

  const [table, getTableContents] = useState([]);


   const  fetchtables = async() =>{

    try {
      const result = await fetch(`http://localhost:5000/singletable/${clicked}`);

      const res = await result.json();

      console.log(res);

      getTableContents(res);

    } catch (error) {
      console.log(Error.message);
    }

    
  }


  useEffect(() =>{
   fetchtables()
  },[props.clicked]);

  console.log(table); 
*/
  return (
    <Router>
    <div className="montreur">
      <Mininav/>
      <Switch>
        <Route path="/Maincon/Displayer/Tableview" exact component ={Tableview} />
        <Route path="/Maincon/Displayer/Diagram" component ={Diagram} />
      </Switch>
    </div>
    </Router>
  )
}

export default Displayer
