import React, { Component } from "react";
import './pokeballFinder.js'

class PokeballFinderClient extends Component {
  constructor(){
    super()
    this.state ={}
  }
render(){


  return(

    <div>
    <canvas id="canvas" width="460" height="460"></canvas>
    </div>
  )
}
}



export default PokeballFinderClient