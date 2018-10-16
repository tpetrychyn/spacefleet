import React from 'react'
import { connect } from 'react-redux'

import { addItem } from '../../actions/inventory'

import SupportGem from './SupportGem'

class CraftInventory extends React.Component {
  constructor (size = 20) {
    super()
    this.slots = Array(20).fill(null, 0)
  }

  componentDidMount () {
    this.props.addItem(new SupportGem())
  }

  onHover (item) {
    if (item) { this.setState({ hoverItem: item }) }
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
    this.setState({ dragging: item })
  }

  onDragEnd () {
    this.setState({ dragging: null })
  }

  onDrop (e) {
    console.log(this)
  }

  render () {
    return (
      <div className='row'>
        <div className='col-12'>
          {this.props.inventory.slots.map((item, i) =>
            <div className={(i + 1) % 5 === 0 ? 'row' : undefined} key={i} onMouseOver={this.onHover.bind(this, item)}>
              <ItemSlot
                className='inventory'
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
      </div>
    )
  }

  addItem (item, amount) {
    const quantity = item.amount || amount || 1
    if (item.isStackable && this.getSlotOfStackable(item) > -1) {
      const slot = this.getSlotOfStackable(item)
      this.slots[slot].amount += quantity
    } else {
      const nextEmpty = this.slots.findIndex(i => !i)
      this.slots[nextEmpty] = item
    }
    return this
  }

  addItemSlot (slot, item) {
    this.slots.splice(slot, 0, item)
    return this
  }

  deleteItem (item, amount = 1) {
    if (item.isStackable) {
      this._deleteItemsFromStack(item, amount)
    } else {
      const itemSlot = this.getSlot(item)
      this.slots[itemSlot] = null
    }
    return this
  }

  _deleteItemsFromStack (item, amount) {
    const slot = this.getSlotOfStackable(item)
    if (amount === -1) { // delete whole stack
      this.slots[slot] = null
    } else {
      this.slots[slot].amount -= amount
    }
  }

  moveItem (item, toSlot) {
    const fromSlot = this.getSlot(item)

    this.slots[fromSlot] = null
    this.slots[toSlot] = item
    return this
  }

  interactItemAndSlot (item, toSlot) {
    const toItem = this.slots[toSlot]
    if (!toItem) {
      this.moveItem(item, toSlot)
    } else if (toItem.constructor.name === 'Equipable') {
      toItem.addSocket(item)
      this.deleteItem(item)
    } else {
      this.swapItems(item, toItem)
    }
  }

  swapItems (fromItem, toItem) {
    const fromSlot = this.getSlot(fromItem)
    const toSlot = this.getSlot(toItem)

    this.slots[fromSlot] = toItem
    this.slots[toSlot] = fromItem
    return this
  }

  swapSlots (fromSlot, toSlot) {
    const fromItem = this.slots[fromSlot]
    const toItem = this.slots[toSlot]

    this.slots[fromSlot] = toItem
    this.slots[toSlot] = fromItem
    return this
  }

  getSlot (item) {
    return this.slots.findIndex(i => i && i.uuid === item.uuid)
  }

  getSlotOfStackable (item) {
    return this.slots.findIndex(i => i && i.name === item.name)
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  addItem: (item) => dispatch(addItem(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(CraftInventory)

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
    const item = this.props.item
    if (!item) return ''
    return (
      <div id={this.props.id} className='item text-center draggable' draggable onDragStart={(e) => this.props.onDragStart(e, this.props.item)}>
        <div className='item-name droppable'>{item.name}</div>
        <div className='item-body droppable' style={{ 'backgroundColor': item.backgroundColor }}>
          <span className='item-quantity align-bottom droppable'>{item.isStackable ? item.amount : ''}</span>
        </div>
      </div>
    )
  }
}
