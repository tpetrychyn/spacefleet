import React from 'react'
import { connect } from 'react-redux'

import ItemComponent from './ItemComponent'
import './item.css'

class ItemSlotComponent extends React.Component {
  onDrop (e, item) {
    e.stopPropagation()
    this.props.onDrop(item, this.props.id)
  }

  onDrag (e, item) {
    e.stopPropagation()
    this.props.onDrag(item, this.props.id)
  }

  render () {
    return (
      <div
        className='droppable slot float-left'
        onDragOver={this.props.onDragOver}
        onDrop={(e) => this.onDrop(e)}
        style={{ backgroundColor: this.props.backgroundColor || 'rgba(50, 50, 50, 0.1)' }}>
        <ItemComponent
          onDrag={this.onDrag.bind(this)}
          onDrop={this.onDrop.bind(this)}
          item={this.props.item} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps)(ItemSlotComponent)
