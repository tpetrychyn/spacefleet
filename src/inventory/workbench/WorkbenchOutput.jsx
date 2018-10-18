import React from 'react'
import { connect } from 'react-redux'
import { beginDrag } from '../../@actions/dragging'
import { addItem, removeItem } from '../../@actions/workbench'
import { calculateRecipe } from './workbenchFilter'

import ItemSlotComponent from '../ItemSlotComponent'

class WorkbenchOutput extends React.Component {
  constructor () {
    super()
    this.onDropCallback = this.onDropCallback
  }

  onHover (item) {
    if (item) { this.setState({ hoverItem: item }) }
  }

  onDragOver (e) {
    if (!e.target.className.includes('droppable')) return
    e.preventDefault()
  }

  onDrag (item, slot) {
    this.props.beginDrag(item, slot, this)
  }

  onClick(item, slot) {
    if (this.props.dragging.dragItem) {
    } else {
      this.onDrag(item, slot)
    }
  }

  onDropCallback () {
    const recipe = this.props.recipe
    for (let item of recipe.costs) {
      this.props.removeItem(item, item.quantity)
    }
  }

  render () {
    return (
      <div className='row'>
        <div className='col-12'>
          <ItemSlotComponent
            id={7}
            item={this.props.recipe.item}
            addItem={this.props.addItem.bind(this)}
            onDragOver={(e) => e.preventDefault()}
            onDrag={this.onDrag.bind(this)}
            onDrop={() => {}}
            onClick={this.onClick.bind(this)} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state,
  recipe: calculateRecipe(state.workbench.slots)
})

const mapDispatchToProps = dispatch => ({
  addItem: (item, slot) => dispatch(addItem(item, slot)),
  removeItem: (item, amount) => dispatch(removeItem(item, amount)),
  beginDrag: (item, slot, source) => dispatch(beginDrag(item, slot, source))
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkbenchOutput)
