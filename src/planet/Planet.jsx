import React from 'react'
import { connect } from 'react-redux'
import { beginDrag } from '../@actions/dragging'
import { addItem, removeItem } from '../@actions/planet'

import ItemSlotComponent from '../inventory/ItemSlotComponent'

import './Planet.css'

class Planet extends React.Component {
  constructor () {
    super()
    this.loop = this.loop
    this.earth = new Image()
    this.moon = new Image()
    this.sun = new Image()
    this.lastTime = new Date().getTime()
    this.currentTime = 0
    this.state = {
      window: {
        width: 0,
        height: 0
      }
    }
  }

  componentDidMount () {
    this.sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png'
    this.moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png'
    this.earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png'
    this.ctx = document.getElementById('canvas').getContext('2d')
    this.loop()
  }

  loop () {
    const ctx = this.ctx
    const width = window.innerWidth
    const height = window.innerHeight
    const ships = this.props.planet.slots

    const time = new Date()
    this.currentTime = (new Date()).getTime()
    const dt = (this.currentTime - this.lastTime) / 1000
    ctx.globalCompositeOperation = 'destination-over'
    ctx.clearRect(0, 0, width, height) // clear canvas

    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
    ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)'

    for (const [index, ship] of ships.entries()) {
      if (!ship) continue
      ctx.save()
      ctx.translate(width / 2, height + height / 2)
      ctx.rotate(Math.PI / 180 * (dt - index*500) * index*100/2)
      ctx.translate(width / 2 + (50*index), 0)
      ctx.drawImage(this.earth, -12, -12)
      ctx.restore()
    }

    ctx.save()
    ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds())
    ctx.translate(height + 50, 0)
    ctx.drawImage(this.earth, -12, -12)
    ctx.restore()
    // Moon
    ctx.save()
    ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds())
    ctx.translate(300, 100)
    ctx.drawImage(this.moon, -3.5, -3.5)
    ctx.restore()

    ctx.restore()

    const grd =  ctx.createRadialGradient(66.000, 108.000, 0.000, 165.000, 132.900, 150.000);
    // Add colors
    grd.addColorStop(0.000, 'rgba(162, 65, 242, 1.000)');
    grd.addColorStop(0.418, 'rgba(216, 51, 234, 1.000)');
    grd.addColorStop(0.987, 'rgba(233, 127, 255, 1.000)');
    ctx.beginPath()
    ctx.fillStyle = grd
    ctx.arc(width / 2, height + height / 2, width / 2, 0, Math.PI * 2, false) // Earth orbit
    ctx.fill()
    ctx.stroke()

    window.requestAnimationFrame(this.loop.bind(this))
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

  render () {
    return (
      <div className='row'>
        <div className='col-12'>
          <h3>Explore Planet</h3>
        </div>
        <div className='col-12 text-center'>
        <div style={{ position: 'absolute', zIndex: '-1000' }}>
          <canvas id='canvas' width={window.innerWidth} height={window.innerHeight} style={{ border: '1pxsolid #000000' }} />
        </div>
        <div className='filler'/>
        <div className='planet-slot-container'>
          {this.props.planet.slots.map((item, i) =>
            <div key={i}>
              <ItemSlotComponent
                id={i}
                item={item}
                addItem={this.props.addItem.bind(this)}
                onDragOver={(e) => e.preventDefault()}
                onDrag={this.onDrag.bind(this)}
                onDrop={this.onDrop.bind(this)}
                backgroundColor={'grey'} />
            </div>
          )}
        </div>
        </div>
      </div>

    )
  }
}

const mapDispatchToProps = dispatch => ({
  addItem: (item, slot, amount) => dispatch(addItem(item, slot, amount)),
  removeItem: (item, amount) => dispatch(removeItem(item, amount)),
  beginDrag: (item, slot, source) => dispatch(beginDrag(item, slot, source))
})

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, mapDispatchToProps)(Planet)