import React from 'react'

import Inventory from './inventory/inventory/Inventory'
import Workbench from './inventory/workbench/Workbench'
import ItemComponent from './inventory/ItemComponent'

import Battle from './battle/Battle'
import Planet from './planet/Planet'
import Space from './space2/Space'

import Auction from './auction/Auction'

import { setGamestate } from './@actions/ui'

import { connect } from 'react-redux'

import portalImg from './planet/portal_SE.png'

class GameScreen extends React.Component {
  state = {x: 0, y: 0}
  didMove(e) {
    this.setState({x:e.clientX, y: e.clientY})
  }
  render () {
    return (
      <div onMouseMove={(e) => this.didMove(e)}>
        <CCarrying x={this.state.x} y={this.state.y}/>
        {this.props.ui.gamestate === 'space' ? 
          <div style={{ position: 'relative' }}>
            <Space />
          </div> : ''
        }
        {this.props.ui.gamestate === 'planet' ?
          <Planet /> : ''
        }
        {this.props.ui.gamestate === 'auction' ?
          <Auction /> : ''
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
        <div style={{position: 'absolute', top: '50px', right: '50px', width: '80px'}}>
          <button className='btn btn-small' onClick={() => this.props.setGamestate('battle')}>Open Battle</button>
          <button className='btn btn-small' onClick={() => this.props.setGamestate('space')}>Open Space</button>
          <button className='btn btn-small' onClick={() => this.props.setGamestate('planet')}>Open Planet</button>
          <button className='btn btn-small' onClick={() => this.props.setGamestate('auction')}>Open Auction</button>
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
    if (!this.props.dragging.dragItem) return ''
    return (
      <div style={{ position: 'absolute', top: this.props.y - 50, left: this.props.x - 45, zIndex: 1001, pointerEvents: 'none' }}>
      {this.props.ui.hoverOver === 'inventory' ?
        <ItemComponent
          onDrag={() => { }}
          onDrop={() => { }}
          item={this.props.dragging.dragItem} /> : ''
      }
      {this.props.ui.hoverOver === 'planet' ?
          <img src={portalImg} width={'100px'} height={'110px'} alt='Object'/> : ''
      }
      </div>
    )
  }
}



const CCarrying = connect(mapStateToProps)(Carrying)
