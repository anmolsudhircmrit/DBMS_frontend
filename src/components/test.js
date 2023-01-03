import React from 'react'

function Test({domClass, divClick, childCallback}) {
    childCallback("anmol--");
    console.log(domClass)
  return (
    <div className={domClass} onClick = {divClick}>test</div>
  )
}

export default Test