import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import { addItem } from '../../@actions/inventory'

import Items from '../../entities/ItemList'

const ObjectContainer = styled.div`
  width: 200px;
  padding-bottom: 15px;
  padding-top: 25px;
  border-top-left-radius: 80% 25%;
  border-top-right-radius: 25% 35%;
  border-bottom-left-radius: 25% 62%;
  border-bottom-right-radius: 20% 87%;
  background-color: ${props => `rgba(200,200,200,${props.depleted ? 0.4 : 0.9})`};
  position: absolute;
  z-index: 999;
  top: ${props => (props.top - 50) / window.innerHeight * 100 + 'vh'};
  left: ${props => (props.left - 45) / window.innerWidth * 100 + 'vw'};
`

function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max))
}

class PlanetResource extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      x: props.x,
      y: props.y,
      items: [
        { item: Items.ICE_PARTICLE, chance: 100 },
        { item: Items.SCRAP_METAL, chance: 45 },
        { item: Items.PLASMA_BOLT, chance: 2 }
      ],
      harvests: 5,
      cooldown: false,
      toast: null
    }
  }

  onHarvest () {
    if (this.state.harvests > 0) {
      this.setState(prev => ({ harvests: prev.harvests - 1 }))

      const chance = getRandomInt(100)
      let foundItems = ''
      this.state.items.forEach(item => {
        if (chance < item.chance) {
          this.props.addItem(item.item, null, 1)
          foundItems += item.item.name + ' '
        }
      })

      if (toast.isActive('FOUND')) {
        toast.update('FOUND', {
          render: 'Found: ' + foundItems,
          autoClose: 2000
        })
      } else {
        toast('Found: ' + foundItems, { type: toast.TYPE.INFO, autoClose: 2000, position: 'bottom-center', toastId: 'FOUND' })
      }

      this.setState({ cooldown: true })
      setTimeout(() => this.setState({ cooldown: false }), 250)
    }
  }

  render () {
    return (
      <ObjectContainer top={this.state.y} left={this.state.x} depleted={this.state.harvests === 0}>
        <h4>Rock Mound</h4>
        <h5>Contains:</h5>
        <p>
          {this.state.items.map((item, i) => <span key={i}>{item.item.name} - {item.chance}% <br /></span>)}
        </p>
        {this.state.harvests > 0
          ? <button className='btn btn-primary' onClick={this.onHarvest.bind(this)} disabled={this.state.cooldown}>Harvest ({this.state.harvests})</button>
          : <button className='btn btn-link' disabled>Depleted</button>}
      </ObjectContainer>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addItem: (item, slot, amount) => dispatch(addItem(item, slot, amount))
})

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, mapDispatchToProps)(PlanetResource)
