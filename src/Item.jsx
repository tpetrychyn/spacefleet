import React from 'react'
import ReactDOM from 'react-dom'

import './item.css'
import Gem from './entities/Gem'
import SupportGem from './entities/SupportGem'
import InventoryService from './services/InventoryService'
import Equipable from './entities/Equipable'

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
    this.name = 'Buff Gem'
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
    this.name = 'Double hit chance'
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

export default class Item extends React.Component {
  constructor () {
    super()

    this.state = {
      sword: new Sword(),
      dragging: null,
      inventory: InventoryService,
      infoText: '',
      hoverItem: null
    }
    console.log(this.state.inventory)
  }

  componentDidMount () {
    this.setState(prev => ({
      inventory: prev.inventory
        .addItem(new BuffGem())
        .addItem(new DoubleHit())
        .addItem(new Equipable())
    }))

    this.attack()
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
    e.target.style.background = 'white'
    e.preventDefault()
  }

  onDragExit (e) {
    if (!e.target.className.includes('droppable')) return
    e.target.style.background = 'grey'
    e.preventDefault()
  }

  onDragStart (e, item) {
    this.setState({ dragging: item })
  }

  onDragEnd () {
    this.setState({ dragging: null })
  }

  onDrop (e) {
    for (let ele of ReactDOM.findDOMNode(this).getElementsByClassName('droppable')) {
      ele.style.background = 'grey'
    }
    this.state.inventory.interactItemAndSlot(this.state.dragging, e.target.id)
  }

  onHover (item) {
    if (item) { this.setState({ hoverItem: item }) }
  }

  render () {
    return (
      <div className='row'>
        <div className='col-6'>
          {this.state.inventory.slots.map((item, i) =>
            <div className={(i + 1) % 4 === 0 ? 'row' : undefined} key={i} onMouseOver={this.onHover.bind(this, item)}>
              <ItemSlot
                id={i}
                onDragOver={(e) => this.onDragOver(e)}
                onDragLeave={(e) => this.onDragExit(e)}
                onDrop={(e) => this.onDrop(e)}
                onDragEnd={(e) => this.onDragEnd(e)}>
                <ItemView id={i} item={item} onDragStart={this.onDragStart.bind(this)} />
              </ItemSlot>
            </div>
          )}
        </div>
        <div className='col-6'>
          <h4>Hover for item description</h4>
          <hr />
          {this.state.hoverItem &&
            <span>
              <h3>{this.state.hoverItem.name}</h3>
              <h5>{this.state.hoverItem.getInfo()}</h5>
              <button onClick={this.state.hoverItem.itemButton && this.state.hoverItem.itemButton.bind(this, this.state.hoverItem)}>{this.state.hoverItem.buttonText}</button>
            </span>
          }
        </div>
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

const ItemSlot = (props) => (
  <div
    className='droppable slot float-left'
    id={props.id}
    onDragOver={props.onDragOver}
    onDragLeave={props.onDragLeave}
    onDrop={props.onDrop}
    onDragEnd={props.onDragEnd}>
    {props.children}
  </div>
)

class ItemView extends React.Component {
  render () {
    if (!this.props.item) return ''
    return (
      <div id={this.props.id} className='item text-center draggable droppable' draggable onDragStart={(e) => this.props.onDragStart(e, this.props.item)}>
        {this.props.item.name}
      </div>
    )
  }
}
