import React, {Component} from "react";
import {pokemon, newPlayer} from './pokeballFinder.js'

class PokeballFinderClient extends Component {
  constructor() {
    super()
    this.state = {
      pokemonPlayers: []
    }
  }
  componentDidMount() {
    pokemon()

    this.props.players.forEach(item => {
      this.state.pokemonPlayers.push(Object.assign({}, newPlayer))
    })

  }
  render() {

    return (<div align = 'center'>
    {console.log('pokemon state', this.state)}
      <canvas id="canvas" width="460" height="460"></canvas>
    </div>)
  }
}

export default PokeballFinderClient
