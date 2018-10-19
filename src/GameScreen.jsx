import React from 'react'

import Inventory from './inventory/inventory/Inventory'
import Planet from './planet/Planet'
import Workbench from './inventory/workbench/Workbench'
import ItemComponent from './inventory/ItemComponent'
import Battle from './battle/Battle'

import { setGamestate } from './@actions/ui'

import { connect } from 'react-redux'

class GameScreen extends React.Component {
  state = {x: 0, y: 0}
  didMove(e) {
    this.setState({x:e.clientX, y: e.clientY})
  }
  render () {
    return (
      <div className='row' onMouseMove={(e) => this.didMove(e)}>
        <CCarrying x={this.state.x} y={this.state.y}/>
        {this.props.ui.gamestate === 'planet' ? 
          <div className='col-12' style={{ position: 'absolute' }}>
            <Planet />
          </div> : ''
        }
        {this.props.ui.gamestate === 'battle' ? <div className='col-8 offset-2' style={{marginTop:'15px'}}>
          <Battle />
        </div> : ''}
        <div style={{ zIndex: 1000 }}>
          <Inventory />
        </div>
        <div style={{ zIndex: 1000 }}>
          <Workbench />
        </div>
        <div style={{position: 'absolute', right: '50px', width: '80px'}}>
          <button className='btn btn-small' onClick={() => this.props.setGamestate('battle')}>Open Battle</button>
          <button className='btn btn-small' onClick={() => this.props.setGamestate('planet')}>Open Planet</button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setGamestate: (gamestate) => dispatch(setGamestate(gamestate))
})

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen)

class Carrying extends React.Component {
  render() {
    return (
      <div style={{ position: 'absolute', top: this.props.y - 50, left: this.props.x - 45, zIndex: 1001, pointerEvents: 'none' }}>
        <ItemComponent
          onDrag={() => { }}
          onDrop={() => { }}
          item={this.props.dragging.dragItem} />
      </div>
    )
  }
}



const CCarrying = connect(mapStateToProps)(Carrying)
