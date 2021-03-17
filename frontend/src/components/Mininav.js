import React from 'react'
import {Link} from 'react-router-dom'

const Mininav = () => {
  return (
    <div className="mininav">
    <div className="num1">
      <Link to ='/Maincon/Displayer/Tableview'>
         <h3>View A Table</h3>
       </Link>
       </div>

       <div className="num2">
       <Link to= '/Maincon/Displayer/Diagram'>
         <h3>View relationships</h3>
       </Link>
       </div>
    </div>
  )
}

export default Mininav
