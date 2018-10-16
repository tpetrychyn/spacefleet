import React from 'react'
import { connect } from 'react-redux'

class ItemComponent extends React.Component {
  onDrop (e) {
    e.stopPropagation()
    // source will be inventory or workbench
    const source = this.props.dragging.dragSource
    if (source !== this.props.parent) {
      source.props.removeItem(this.props.dragging.dragItem)
      this.props.parent.props.removeItem(this.props.item)

      source.props.addItem(this.props.item, this.props.dragging.dragSlot)
      this.props.parent.props.addItem(this.props.dragging.dragItem, this.props.id)
    } else {
      source.props.swapItems(this.props.dragging.dragItem, this.props.item)
    }
    // TODO: Do something to this item
  }
  render () {
    const item = this.props.item
    if (!item) return ''
    return (
      <div id={this.props.id}
        className='item text-center draggable'
        draggable
        onDragStart={(e) => this.props.onDragStart(e, this.props.item)}
        onDrop={(e) => this.onDrop(e)}>
        <div className='item-name droppable'>{item.name}</div>
        <div className='item-body droppable' style={{ 'backgroundColor': item.backgroundColor }}>
          <span className='item-quantity align-bottom droppable'>{item.isStackable ? item.amount : ''}</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps)(ItemComponent)
