import React from 'react'
import { connect } from 'react-redux'
import { beginDrag } from '../actions/dragging'
import { addItem, removeItem, swapItems } from '../actions/workbench'
import { calculateRecipe } from './workbenchFilter'

import SupportGem from '../shared/entities/SupportGem'

import ItemComponent from './ItemComponent'
import ItemSlotComponent from './ItemSlotComponent'

class Workbench extends React.Component {
  componentDidMount () {
    const gem = new SupportGem('Double Hit')
    gem.amount = 10
    this.props.addItem(gem)
    const gem2 = new SupportGem('Level +1')
    gem2.backgroundColor = 'blue'
    this.props.addItem(gem2)
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
    this.props.beginDrag(item, e.target.id, this)
  }

  removeItem (item) {
    this.props.removeItem(item)
  }

  onDragEnd () {

  }

  render () {
    return (
      <div className='row'>
        <div className='col-12'>
          <h3>Workbench</h3>
          {this.props.workbench.slots.map((item, i) =>
            <div className={(i + 1) % 3 === 0 ? 'row' : undefined} key={i} onMouseOver={this.onHover.bind(this, item)}>
              <ItemSlotComponent
                addItem={this.props.addItem.bind(this)}
                id={i}
                onDragOver={(e) => this.onDragOver(e)}
                onDragLeave={(e) => this.onDragExit(e)}
                onDragEnd={(e) => this.onDragEnd(e)}>
                <ItemComponent id={i} item={item} onDragStart={this.onDragStart.bind(this)} parent={this} />
              </ItemSlotComponent>
            </div>
          )}
          <hr />
          <ItemSlotComponent
            addItem={this.props.addItem.bind(this)}
            id={7}
            onDragOver={(e) => this.onDragOver(e)}
            onDragLeave={(e) => this.onDragExit(e)}
            onDragEnd={(e) => this.onDragEnd(e)}>
            <ItemComponent id={7} item={this.props.recipeItem} onDragStart={this.onDragStart.bind(this)} parent={this} />
          </ItemSlotComponent>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state,
  recipeItem: calculateRecipe(state.workbench.slots)
})

const mapDispatchToProps = dispatch => ({
  addItem: (item, slot) => dispatch(addItem(item, slot)),
  removeItem: (item) => dispatch(removeItem(item)),
  beginDrag: (item, slot, source) => dispatch(beginDrag(item, slot, source)),
  swapItems: (fromItem, toItem) => dispatch(swapItems(fromItem, toItem))
})

export default connect(mapStateToProps, mapDispatchToProps)(Workbench)
