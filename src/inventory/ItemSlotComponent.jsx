import React from 'react'
import { connect } from 'react-redux'

import ItemComponent from './ItemComponent'
import './item.css'

class ItemSlotComponent extends React.Component {
  onClick (e, item) {
    e.stopPropagation()
    this.props.onClick(item, this.props.id)
  }

  render () {
    return (
      <div
        className='droppable slot float-left'
        onDragOver={this.props.onDragOver}
        onClick={(e) => this.onClick(e)}
        style={{ backgroundColor: this.props.backgroundColor || 'rgba(50, 50, 50, 0.1)' }}>
        <ItemComponent
          onClick={this.onClick.bind(this)}
          item={this.props.item} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps)(ItemSlotComponent)
