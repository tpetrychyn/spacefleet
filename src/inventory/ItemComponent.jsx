import React from 'react'
import { connect } from 'react-redux'

class ItemComponent extends React.Component {
  onDrop (e) {
    e.stopPropagation()
    this.props.onDrop(e, this.props.item)
  }

  onDrag (e) {
    e.stopPropagation()
    this.props.onDrag(e, this.props.item)
  }

  onClick (e) {
    if (this.props.dragging.dragItem !== this.props.item) {
      e.stopPropagation()
      this.props.onClick(e, this.props.item)
    }
  }

  render () {
    const item = this.props.item
    if (!item) return ''
    return (
      <div id={this.props.id}
        className='item text-center draggable'
        draggable
        onDragStart={e => this.onDrag(e)}
        onDrop={(e) => this.onDrop(e)}
        onClick={(e) => this.onClick(e)}
        style={{ opacity: this.props.dragging.dragItem === this.props.item ? '0.6' : '1' }}>
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
