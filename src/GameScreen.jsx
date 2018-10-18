import React from 'react'

import Inventory from './inventory/inventory/Inventory'
import Planet from './planet/Planet'
import Workbench from './inventory/workbench/Workbench'
import ItemComponent from './inventory/ItemComponent'

import { connect } from 'react-redux'

class Carrying extends React.Component {
  render() {
    return (
      <div style={{position: 'absolute', top: this.props.y-50, left: this.props.x-45, zIndex: 1001, pointerEvents: 'none'}}>
        <ItemComponent
            onDrag={() => {}}
            onDrop={() => {}}
            item={this.props.dragging.dragItem}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const CCarrying = connect(mapStateToProps)(Carrying)

export default class GameScreen extends React.Component {
  state = {x: 0, y: 0}
  didMove(e) {
    this.setState({x:e.clientX, y: e.clientY})
  }
  render () {
    return (
      <div className='row' onMouseMove={(e) => this.didMove(e)}>
        <CCarrying x={this.state.x} y={this.state.y}/>
        <div className='col-12'>
          <Planet />
        </div>
        <div style={{ zIndex: 1000 }}>
          <Inventory />
        </div>
        <div style={{ zIndex: 1000 }}>
          <Workbench />
        </div>
      </div>
    )
  }
}
