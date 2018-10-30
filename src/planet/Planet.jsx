import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { placeObject, removeObject, setObjects } from '../@actions/planet'
import { endDrag } from '../@actions/dragging'
import { setHover } from '../@actions/ui'
import { Carousel } from 'react-responsive-carousel'

// import ItemSlotComponent from '../inventory/ItemSlotComponent'

import portalImg from './portal_SE.png'
import satImg from './satelliteDishLarge_SW.png'
import craftImg from './spaceCraft4_SE.png'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import './Planet.css'

// import socket from '../SocketService'

const PlanetContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
`
const Ground = styled.div`
  margin-top: auto;
  background-color: ${props => props.color};
  height: 40vh;
  width: 100%;
`

const PlanetObject = styled.div`
  position: absolute;
  top: ${props => (props.top - 50) / window.innerHeight * 100 + '%'};
  left: ${props => (props.left - 45) / window.innerWidth * 100 + '%'};
  height: 110px;
  z-index: 1000;
  width: 100px !important;
`

const itemToImage = (item) => {
  if (item.name === 'Metal Scraps') {
    return portalImg
  } else if (item.name === 'Small Satellite') {
    return satImg
  } else {
    return craftImg
  }
}

class Planet extends React.Component {
  onHover () {
    if (this.props.ui.hoverOver !== 'planet') {
      this.props.setHover('planet')
    }
  }

  onDrop (e) {
    const item = this.props.dragging.dragItem
    if (!item) return

    const [x, y] = [e.clientX, e.clientY]

    this.props.placeObject(item, { x, y })
    this.props.endDrag()
  }

  deleteItem (object) {
    this.props.removeObject(object)
  }

  render () {
    return (
      <div>
        <Carousel showThumbs={false} showIndicators={false} showStatus={false} transitionTime={1000}>
          <PlanetContainer
            onMouseOver={this.onHover.bind(this)}
            onClick={e => this.onDrop(e)}>
            <Ground color={'lightgreen'}>
              {this.props.planet.objects.map((o, i) =>
                <PlanetObject key={i} onClick={e => this.deleteItem(o)} left={o.point.x} top={o.point.y}>
                  <img src={itemToImage(o.object)} />
                </PlanetObject>
              )}
            </Ground>
          </PlanetContainer>
          <PlanetContainer>
            <Ground color={'green'} />
          </PlanetContainer>
        </Carousel>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  placeObject: (object, point) => dispatch(placeObject(object, point)),
  removeObject: (object) => dispatch(removeObject(object)),
  setObjects: (objects) => dispatch(setObjects(objects)),
  endDrag: () => dispatch(endDrag()),
  setHover: (hover) => dispatch(setHover(hover))
})

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, mapDispatchToProps)(Planet)
