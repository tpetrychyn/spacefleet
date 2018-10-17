import React from 'react'
import { connect } from 'react-redux'
import { beginDrag } from '../../@actions/dragging'
import { addItem, removeItem, closeWorkbench } from '../../@actions/workbench'
import { closeInventory } from '../../@actions/inventory'

import SupportGem from '../../shared/entities/SupportGem'

import ItemSlotComponent from '../ItemSlotComponent'
import WorkbenchOutput from './WorkbenchOutput'

import './Workbench.css'

class Workbench extends React.Component {
  componentDidMount () {
    const gem = new SupportGem('Double Hit')
    gem.isStackable = true
    this.props.addItem(gem, null, 10)
    const gem2 = new SupportGem('Level +1')
    gem2.backgroundColor = 'blue'
    gem.isStackable = true
    this.props.addItem(gem2)
  }

  onHover (item) {
    if (item) { this.setState({ hoverItem: item }) }
  }

  onDrop (item, slot) {
    const { dragItem, dragSlot, dragSource } = this.props.dragging

    if (item === dragItem) return

    if (dragSource.onDropCallback) dragSource.onDropCallback()

    if (dragSource.constructor.name === 'WorkbenchOutput') {
      if (item) {
        this.props.addItem(dragItem.clone(), null)
      } else {
        this.props.addItem(dragItem.clone(), slot)
      }
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

  closeWorkbenchAndInventory () {
    this.props.closeInventory()
    this.props.closeWorkbench()
  }

  render () {
    if (!this.props.workbench.isOpen) return ''
    return (
      <div className='row workbench'>
        <div className='col-12'>
          <h3>Workbench
            <span className='close-button' onClick={this.closeWorkbenchAndInventory.bind(this)}>
              <button type='button' className='close' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </span>
          </h3>
          {this.props.workbench.slots.map((item, i) =>
            <div className={(i + 1) % 3 === 0 ? 'row' : undefined} key={i} onMouseOver={this.onHover.bind(this, item)}>
              <ItemSlotComponent
                id={i}
                item={item}
                addItem={this.props.addItem.bind(this)}
                onDragOver={(e) => e.preventDefault()}
                onDrag={this.onDrag.bind(this)}
                onDrop={this.onDrop.bind(this)} />
            </div>
          )}
          <hr />
          <h3>Output </h3>
          <WorkbenchOutput />
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
  beginDrag: (item, slot, source) => dispatch(beginDrag(item, slot, source)),
  closeWorkbench: () => dispatch(closeWorkbench()),
  closeInventory: () => dispatch(closeInventory())
})

export default connect(mapStateToProps, mapDispatchToProps)(Workbench)