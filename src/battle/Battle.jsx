import React from 'react'
import { connect } from 'react-redux'

import { setGamestate } from '../@actions/ui'

import style from './style.css'

import ship1 from './ship1.png'
import ship2 from './ship2.png'

class Battle extends React.Component {
  constructor () {
    super()
    this.state = {
      log: [],
      enemy: {
        name: 'Yasser',
        shields: 20,
        health: 100
      },
      player: {
        name: 'Taylor',
        shields: 20,
        health: 100
      }
    }
  }

  forfeit () {
    this.props.setGamestate('idle')
  }

  ability1 () {
    this.setState(prev => ({
      log: [{
        attacker: 'You',
        target: 'Enemy',
        damage: '10'
      }, ...prev.log]
    }))

    if (this.state.enemy.shields > 0) {
      this.setState({
        enemy: {
          ...this.state.enemy,
          shields: this.state.enemy.shields - 10
        }
      })
    } else {
      this.setState({
        enemy: {
          ...this.state.enemy,
          shields: this.state.enemy.health - 10
        }
      })
    }
  }

  ability2 () {
    this.setState(prev => ({
      log: [{
        attacker: 'Enemy',
        target: 'You',
        damage: '10'
      }, ...prev.log]
      ,
      player: {
        ...prev.player,
        health: prev.player.health - 10
      }
    }))
  }

  render () {
    return (
      <div className='row'>
        <div className='col-12 text-center mb-1' style={{ backgroundColor: 'rgba(90, 95, 105, 0)', color: 'white' }}>
          <h2>Orbital Arena</h2>
        </div>
        <div className='col-12'>
          <div className='row pt-1' style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}>
            <div className='col-2'>
              <h5>Move History</h5>
            </div>
            <div className='col-8'>
              <div className='row'>
                <div className='col-12'>
                  <HealthBar health={this.state.enemy.health} name={this.state.enemy.name} shields={this.state.enemy.shields} />
                  <div className='float-right'>
                    <img src={ship1} height={100} />
                    <div className='clearfix' />
                    <div style={{ width: '30px', height: '30px', backgroundColor: 'silver', float: 'left', margin: '2px' }} />
                    <div style={{ width: '30px', height: '30px', backgroundColor: 'silver', float: 'left', margin: '2px' }} />
                    <div style={{ width: '30px', height: '30px', backgroundColor: 'silver', float: 'left', margin: '2px' }} />
                    <div style={{ width: '30px', height: '30px', backgroundColor: 'silver', float: 'left', margin: '2px' }} />
                  </div>
                </div>
                <div className='col-12'>
                  <img src={ship2} height={100} />
                  <div className='mt-2' />
                  <HealthBar health={this.state.player.health} name={this.state.player.name} shields={this.state.player.shields} />
                  <div className='mt-2' />
                  <Abilities
                    ability1={this.ability1.bind(this)}
                    ability2={this.ability2.bind(this)}
                    forfeit={this.forfeit.bind(this)} />
                </div>
              </div>
            </div>
            <div className='col-2'>
              <h5>Move History</h5>
            </div>
          </div>
        </div>
        <div className='col-12 mt-1' />
        <BattleLog log={this.state.log} />
      </div>
    )
  }
}

const HealthBar = (props) => (
  <div style={{ width: '100%', position: 'relative', textAlign: 'center' }}>
    <div style={{ backgroundColor: '#f43d3d', width: '100%', position: 'relative' }} >
      <h4 style={{position: 'relative', zIndex: 1}}>{props.name}'s Health</h4>
      <div style={{ backgroundColor: 'lightblue', position: 'absolute', top: 0, left: (100 - props.shields) + '%', width: props.shields + '%', height: '100%' }} />
      <div style={{ backgroundColor: 'lightgreen', position: 'absolute', top: 0, left: 0, width: props.health - props.shields + '%', height: '100%' }} />
    </div>
  </div>
)

class Abilities extends React.Component {
  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-6'>
            <button className='btn btn-block btn-primary' onClick={this.props.ability1}>Ability 1</button>
          </div>
          <div className='col-6'>
            <button className='btn btn-block btn-primary' onClick={this.props.ability2}>Ability 2</button>
          </div>
        </div>
        <div className='mt-2' />
        <div className='row'>
          <div className='col-6'>
            <button className='btn btn-block btn-primary'>Ability 3</button>
          </div>
          <div className='col-6'>
            <button className='btn btn-block btn-primary' onClick={this.props.forfeit}>Ability 4</button>
          </div>
        </div>
        <div className='mt-2' />
      </div>
    )
  }
}

class BattleLog extends React.Component {
  render () {
    const log = this.props.log
    return (
      <div className='col-12' style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}>
        <h4>Battle Log</h4>
        <ul className='list-group' style={{ overflowY: 'auto', maxHeight: '150px' }}>
          {log.map((l, i) => (
            <li key={i} className='list-group-item'><span className='font-weight-bold'>{l.attacker}</span> hit <span className='font-weight-bold'>{l.target}</span> with {l.damage} damage</li>
          ))}
        </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(Battle)
