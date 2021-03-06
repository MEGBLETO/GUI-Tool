import React from 'react'
import Mininav from './Mininav'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Tableview from './Tableview'
import Diagram from './Diagram'


const Displayer = () => {
 
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
