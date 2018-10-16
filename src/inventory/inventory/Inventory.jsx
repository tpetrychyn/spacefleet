import React from 'react'
import { connect } from 'react-redux'
import { beginDrag } from '../../actions/dragging'
import { addItem, removeItem } from '../../actions/inventory'

import SupportGem from '../../shared/entities/SupportGem'

import ItemSlotComponent from '../ItemSlotComponent'
import Gem from '../../shared/entities/Gem'

class InventoryComponent extends React.Component {
  componentDidMount () {
    const gem = new SupportGem('Double Hit')
    gem.isStackable = true
    this.props.addItem(gem)
    const gem2 = new SupportGem('Level +1')
    gem2.backgroundColor = 'blue'
    this.props.addItem(gem2)

    const gem3 = new Gem()
    gem3.name = 'Stackable'
    gem3.isStackable = true
    gem3.amount = 5
    this.props.addItem(gem3)
  }

  onHover (item) {
    if (item) { this.setState({ hoverItem: item }) }
  }

  onDragOver (e) {
    if (!e.target.className.includes('droppable')) return
    e.preventDefault()
  }

  onDrop (item, slot) {
    const { dragItem, dragSlot, dragSource } = this.props.dragging

    if (item === dragItem) return

    if (dragSource.onDropCallback) dragSource.onDropCallback()

    if (dragSource.constructor.name === 'WorkbenchOutput') {
      this.props.addItem(dragItem.clone(), slot)
    } else {
      item && this.props.removeItem(item, item.amount)
      dragSource.props.removeItem(dragItem, dragItem.amount)

      item && dragSource.props.addItem(item, dragSlot, item.amount)
      this.props.addItem(dragItem, slot, dragItem.amount)
    }
  }

  onDrag (item, slot) {
    this.props.beginDrag(item, slot, this)
  }

  addItem () {
    const gem = new SupportGem('Space Dust')
    gem.isStackable = true
    this.props.addItem(gem, null, 10)
  }

  addItem2 () {
    const gem = new SupportGem('Double Hit')
    gem.isStackable = true
    this.props.addItem(gem, null, 6)
  }

  render () {
    return (
      <div className='row'>
        <div className='col-12'>
          <h3>Inventory</h3>
          {this.props.inventory.slots.map((item, i) =>
            <div className={(i + 1) % 5 === 0 ? 'row' : undefined} key={i} onMouseOver={this.onHover.bind(this, item)}>
              <ItemSlotComponent
                id={i}
                item={item}
                onDragOver={(e) => this.onDragOver(e)}
                onDrop={this.onDrop.bind(this)}
                onDrag={this.onDrag.bind(this)}
              />
            </div>
          )}
          <button className='btn btn-md btn-primary' onClick={this.addItem.bind(this)}>Add Item Button</button>
          <button className='btn btn-md btn-primary' onClick={this.addItem2.bind(this)}>Add Item Button</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  addItem: (item, slot, amount) => dispatch(addItem(item, slot, amount)),
  removeItem: (item, amount) => dispatch(removeItem(item, amount)),
  beginDrag: (item, slot, source) => dispatch(beginDrag(item, slot, source))
})

export default connect(mapStateToProps, mapDispatchToProps)(InventoryComponent)
