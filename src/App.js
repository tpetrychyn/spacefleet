import React, { Component } from 'react'
import './App.css'

import GameScreen from './GameScreen'

class App extends Component {
  render () {
    return (
      <div className='App container'>
        <GameScreen />
      </div>
    )
  }
}

export default App
