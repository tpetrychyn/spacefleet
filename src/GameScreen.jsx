import React from 'react'
import ReactDOM from 'react-dom'

import './item.css'
import Gem from './shared/entities/Gem'
import SupportGem from './shared/entities/SupportGem'
import Equipable from './shared/entities/Equipable'
import Player from './shared/entities/Player'
import Inventory from './inventory/Inventory'
import Workbench from './inventory/Workbench'

class OnAttackGem extends Gem {
  constructor () {
    super()
    this.effect = this.effect
  }

  effect (gem) {
    console.warn('Support Gem effect not implemented.')
  }
}

class AddSpeed extends Gem {
  constructor () {
    super()
    this.name = 'Add Speed'
    this.level = 1
    this.rarity = 1
    this.link = null

    this.effect = this.effect
    this.addLink = this.addLink
  }

  effect (sword) {
    console.log('Adding Speed')
    sword.speed += 1 * this.level
  }

  addLink (gem) {
    this.link = gem
    return this
  }
}

class AddDamage extends Gem {
  constructor () {
    super()
    this.name = 'Add Damage'
    this.level = 1
    this.rarity = 1
    this.link = null

    this.effect = this.effect
    this.addLink = this.addLink
  }

  effect (sword) {
    console.log('Adding damage')
    sword.damage += 5 * this.level
  }

  addLink (gem) {
    this.link = gem
    return this
  }
}

class BuffGem extends SupportGem {
  constructor () {
    super()
    this.name = 'Iridium'
    this.level = 1
    this.rarity = 1
    this.link = null
  }

  _effect (gem) {
    gem.level += 1
    return gem
  }
}

class DoubleHit extends OnAttackGem {
  constructor () {
    super()
    this.name = 'Space Dust'
    this.isStackable = true
  }

  effect (sword) {
    const randChance = Math.floor(Math.random() * 10)
    if (randChance > 6) {
      console.log('Double hit proc!')
      sword.cast()
    }
  }
}

class NotEnoughSpaceException {
}

class LinkGroup {
  constructor (maxGems) {
    this.gems = {}
    this.gems['SupportGem'] = []
    this.gems['Gem'] = []
    this.gems['OnAttackGem'] = []
    this.gemCount = 0
    this.maxGems = maxGems
    this.addGem = this.addGem
  }

  addGem (gem) {
    if (this.gemCount < this.maxGems) {
      const gemType = Object.getPrototypeOf(gem.constructor).name

      this.gems[gemType] = [...this.gems[gemType], gem]
      this.gemCount += 1
    } else {
      throw new NotEnoughSpaceException('test')
    }
  }

  preBuff (sword) {
    this.gems['SupportGem'].forEach(sg => {
      this.gems['SupportGem'].forEach(g => {
        sg.effect(g)
      })
      this.gems['Gem'].forEach(g => {
        sg.effect(g)
      })
    })
    this.gems['Gem'].forEach(g => {
      g.effect(sword)
    })
  }

  onAttack (sword) {
    this.gems['OnAttackGem'].forEach(g => {
      g.effect(sword)
    })
  }

  getFlatGems () {
    const flat = []
    Object.values(this.gems).forEach(g => {
      g.forEach(s => flat.push(s))
    })
    return flat
  }
}

class Sword {
  constructor () {
    this.damage = 10
    this.power = 5
    this.speed = 2
    this.sockets = [new LinkGroup(5), new LinkGroup(4)]
    this.calcBuffs = this.calcBuffs
  }

  calcBuffs () {
    this.sockets.forEach(linkGroup => {
      linkGroup.preBuff(this)
    })
    return this
  }

  addGem (group, gem) {
    this.sockets[group].addGem(gem)
    return this
  }

  removeGem (gem) {
    const gemType = Object.getPrototypeOf(gem.constructor).name
    this.sockets.forEach(s => {
      s.gems[gemType] = s.gems[gemType].filter(g => {
        if (g.uuid !== gem.uuid) {
          s.gemCount -= 1
          return true
        }
        return false
      })
    })
    return this
  }

  cast () {
    const output = Math.floor(Math.random() * this.power) + this.damage
    this.sockets.forEach(linkGroup => {
      linkGroup.onAttack(this)
    })
    console.log('Attacked with ', output)
  }
}

function getSourceType (target) {
  if (target.closest('.crafting')) return 'crafting'
  if (target.closest('.inventory')) return 'inventory'
}

function getTargetType (target) {
  // ordered in drop priorty
  if (target.closest('.crafting')) return 'crafting'
  if (target.closest('.item')) return 'item'
  if (target.closest('.inventory')) return 'inventory'
}

export default class GameScreen extends React.Component {
  constructor () {
    super()

    this.state = {
      sword: new Sword(),
      dragFrom: null,
      dragging: null,
      // inventory: Player.inventory,
      // craftWindow: Player.craftWindow,
      infoText: '',
      hoverItem: null
    }
    console.log(this.state.inventory)
  }

  componentDidMount () {
    // this.setState(prev => ({
    //   inventory: prev.inventory
    //     .addItem(new BuffGem())
    //     .addItem(new DoubleHit())
    //     .addItem(new Equipable())
    //     .addItem(new DoubleHit(), 10)
    // }))

    // this.attack()
  }

  attack () {
    let newSword = new Sword()
      .addGem(0, new AddSpeed())
      .addGem(0, new BuffGem())
      .addGem(0, new BuffGem())
      .addGem(0, new BuffGem())
      .addGem(0, new BuffGem())
      .addGem(1, new AddSpeed())
      .addGem(1, new DoubleHit())
      .addGem(1, new BuffGem())

    this.setState({ sword: newSword.calcBuffs() })

    this.state.sword.cast()
  }

  onDragOver (e) {
    if (!e.target.className.includes('droppable')) return
    // e.target.style.background = 'white'
    e.preventDefault()
  }

  onDragExit (e) {
    if (!e.target.className.includes('droppable')) return
    // e.target.style.background = 'grey'
    e.preventDefault()
  }

  onDragStart (e, item) {
    this.setState({ dragFrom: getSourceType(e.target), dragging: item })
  }

  onDragEnd () {
    this.setState({ dragging: null })
  }

  onDrop (e) {
    const targetType = getTargetType(e.target)
    const sourceType = this.state.dragFrom
    if (sourceType === targetType) {
      return
    }

    if (targetType === 'crafting') {
      Player.craftWindow.addItem(this.state.hoverItem)
    }
    console.log(targetType)
    for (let ele of ReactDOM.findDOMNode(this).getElementsByClassName('droppable')) {
      // ele.style.background = 'grey'
    }
    this.state.inventory.interactItemAndSlot(this.state.dragging, e.target.closest('.slot').id)
  }

  onHover (item) {
    if (item) { this.setState({ hoverItem: item }) }
  }

  addItem () {
    this.state.inventory.addItem(new AddSpeed(), 4)
    this.forceUpdate()
  }

  render () {
    return (
      <div className='row'>
        <div className='col-7'>
          <Inventory />
        </div>
        <div className='col-5'>
          <Workbench />
        </div>
        {/* <div className='col-4'>
          <h4>Hover for item description</h4>
          <hr />
          {this.state.hoverItem &&
            <span>
              <h3>{this.state.hoverItem.name}</h3>
              <h5>{this.state.hoverItem.getInfo()}</h5>
              {this.state.hoverItem.itemButton
                ? <button onClick={this.state.hoverItem.itemButton.bind(this, this.state.hoverItem)}>{this.state.hoverItem.buttonText}</button>
                : ''
              }

            </span>
          }
        </div> */}
        <div className='col-12'>
          <hr />
          <button onClick={this.attack.bind(this)}>Attack</button>
          <pre>
            {JSON.stringify(this.state.sword, null, 2)}
          </pre>
        </div>
      </div>

    )
  }
}
