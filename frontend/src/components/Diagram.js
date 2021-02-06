import React from 'react'
import Xarrow from 'react-xarrows'

const Diagram = () => {
  return (
 <div className="diagram">
      <div className="A" id="A">A</div>
      <div className="B" id="B">B</div>
      <div className="C" id="C">C</div>
      <div className="D" id="D">D</div>  
      <Xarrow start="A" end="B"/>
      <Xarrow start="B" end="D"/>
      <Xarrow start="B" end="C"/>

</div>
  )
}

export default Diagram
