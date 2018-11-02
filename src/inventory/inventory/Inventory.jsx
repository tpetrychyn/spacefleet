import React from 'react'
import { connect } from 'react-redux'

import { beginDrag, endDrag } from '../../@actions/dragging'
import { addItem, removeItem } from '../../@actions/inventory'
import { openInventory, closeInventory, setHover, openWorkbench } from '../../@actions/ui'

import ItemSlotComponent from '../ItemSlotComponent'

import './Inventory.css'
import { ReactComponent as WorkbenchIcon } from './workbench.svg'
import { Spring } from 'react-spring'

class InventoryComponent extends React.Component {
  onHover (item) {
    if (item) { this.setState({ hoverItem: item }) }
  }

  onDragOver (e) {
    if (!e.target.className.includes('droppable')) return
    e.preventDefault()
  }

  onDrop (item, slot) {
    var { dragItem, dragSlot, dragSource } = this.props.dragging

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

    this.props.endDrag()
  }

  onClick (item, slot) {
    if (this.props.dragging.dragItem) {
      this.onDrop(item, slot)
    } else {
      this.props.beginDrag(item, slot, this)
    }
  }

  closeInventory () {
    if (!this.props.ui.workbenchIsOpen) {
      this.props.closeInventory()
    }
  }

  openInventory () {
    if (this.props.ui.hoverOver !== 'inventory') {
      this.props.setHover('inventory')
    }
    if (!this.props.ui.inventoryIsOpen) {
      this.props.openInventory()
    }
  }

  render () {
    return (
      <Spring
        from={{ opacity: 0, transform: 'translateX(-500px)' }}
        to={{ opacity: 1, transform: this.props.ui.inventoryIsOpen ? 'translateX(10px)' : 'translateX(-500px)' }}>
        {props =>
          <div className='row inventory' style={props}
            onMouseLeave={this.closeInventory.bind(this)}
            onMouseOver={this.openInventory.bind(this)}
            onDragOver={this.openInventory.bind(this)}>
            <div className='col-12'>
              <h3>Inventory
                <span className='workbench-button' onClick={this.props.openWorkbench}>
                  <button type='button' className='close' aria-label='Close'>
                    <WorkbenchIcon width={35} height={35} />
                  </button>
                </span>
              </h3>
              {this.props.inventory.slots.map((item, i) =>
                <div className={(i + 1) % 5 === 0 ? 'row' : undefined} key={i}>
                  <ItemSlotComponent
                    id={i}
                    item={item}
                    onDragOver={(e) => this.onDragOver(e)}
                    onClick={this.onClick.bind(this)}
                  />
                </div>
              )}
            </div>
          </div>}
      </Spring>

    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  addItem: (item, slot, amount) => dispatch(addItem(item, slot, amount)),
  removeItem: (item, amount) => dispatch(removeItem(item, amount)),
  beginDrag: (item, slot, source) => dispatch(beginDrag(item, slot, source)),
  endDrag: () => dispatch(endDrag()),
  openInventory: () => dispatch(openInventory()),
  closeInventory: () => dispatch(closeInventory()),
  setHover: (hover) => dispatch(setHover(hover)),
  openWorkbench: () => dispatch(openWorkbench())
})

export default connect(mapStateToProps, mapDispatchToProps)(InventoryComponent)
