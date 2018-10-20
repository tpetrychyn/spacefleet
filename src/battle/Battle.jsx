import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { setGamestate } from '../@actions/ui'

import Healthbar from './Healthbar'

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
        maxShields: 20,
        shields: 20,
        maxHealth: 100,
        health: 100
      },
      player: {
        name: 'Taylor',
        maxShields: 20,
        shields: 20,
        maxHealth: 100,
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
      this.setState(prev => ({
        enemy: {
          ...prev.enemy,
          shields: prev.enemy.shields - 10
        }
      }))
    } else {
      this.setState(prev => ({
        enemy: {
          ...prev.enemy,
          health: prev.enemy.health - 10
        }
      }))
    }
  }

  ability2 () {
    this.setState(prev => ({
      log: [{
        attacker: 'Enemy',
        target: 'You',
        damage: '10'
      }, ...prev.log],
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
                  <Healthbar subject={this.state.enemy} />
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
                  <Healthbar subject={this.state.player} />
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
