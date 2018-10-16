import React from 'react'
import { connect } from 'react-redux'

class ItemSlotComponent extends React.Component {
  onDrop (e) {
    e.stopPropagation()
    const item = this.props.dragging.dragItem
    // source will be inventory or workbench
    const source = this.props.dragging.dragSource
    source.removeItem(item)
    this.props.addItem(item, this.props.id)
  }
  render () {
    return (
      <div
        className='droppable slot float-left'
        id={this.props.id}
        onDragOver={this.props.onDragOver}
        onDragLeave={this.props.onDragLeave}
        onDrop={e => this.onDrop(e)}
        onDragEnd={this.props.onDragEnd}>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps)(ItemSlotComponent)
