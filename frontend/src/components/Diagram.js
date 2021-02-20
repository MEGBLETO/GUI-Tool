import React from 'react'
import Xarrow from 'react-xarrows'

const Diagram = () => {

  const link = "D";



  return (

 <div className="diagram">

      <div className="A" id="A">A<p id="P">Primary Key</p></div>
      <div className="B" id="B">B</div>
      <div className="C" id="C">C<p id="F">Foreign Key</p></div>
      <div className="D" id={link}>D</div>  
      
      <Xarrow start= "A" end="B"/>
      <Xarrow start="B" end={link}/>
      <Xarrow start="B" end="D"/>
      <Xarrow start="B" end="C"/>
      <Xarrow start="P" end="F"/>

</div>
  )
}

export default Diagram
