import React from 'react'
import { connect } from 'react-redux'
import { beginDrag, endDrag } from '../@actions/dragging'
import { addItem, removeItem } from '../@actions/planet'

import ItemSlotComponent from '../inventory/ItemSlotComponent'

import './Planet.css'

// TODO: https://stackoverflow.com/questions/16919601/html5-canvas-camera-viewport-how-to-actally-do-it

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
      },
      x: 0,
      y: 0,
      scale: 1,
      currentScale: 1
    }
  }

  componentDidMount () {
    document.addEventListener('wheel', this.handleScroll.bind(this))
    this.sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png'
    this.moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png'
    this.earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png'
    this.ctx = document.getElementById('canvas').getContext('2d')
    this.loop()
  }

  handleScroll (e) {
    this.setState(prev => ({
      x: e.clientX,
      y: e.clientY,
      scale: prev.scale -= 0.001 * e.deltaY
    }))
  }

  clearCanvas (ctx) {
    ctx.save()
    ctx.globalCompositeOperation = 'copy'
    ctx.strokeStyle = 'transparent'
    ctx.beginPath()
    ctx.lineTo(0, 0)
    ctx.stroke()
    ctx.restore()
  }

  loop () {
    const scale = this.state.scale
    const ctx = this.ctx
    const width = window.innerWidth
    const height = window.innerHeight
    const ships = this.props.planet.slots
    const radius = width > height ? height / 2 : width / 2

    this.currentTime = (new Date()).getTime()
    const dt = (this.currentTime - this.lastTime) / 1000

    this.clearCanvas(ctx)

    if (this.state.scale !== 1) {
      const x = this.state.x
      const y = this.state.y
      ctx.translate(x, y)
      ctx.scale(scale, scale)
      ctx.translate(-x, -y)
      this.setState({ scale: 1, x: width / 2, y: height / 2 })
    }

    for (const [index, ship] of ships.entries()) {
      if (!ship) continue
      ctx.save()
      ctx.translate(width / 2, height / 2)
      ctx.rotate(Math.PI / 180 * (dt - index * 500) * index * 100 / 2)
      ctx.translate(radius + (50 * index), 0)
      ctx.drawImage(this.earth, -12, -12)
      ctx.restore()
    }

    const grd = ctx.createRadialGradient(66.000, 108.000, 0.000, 165.000, 132.900, 150.000)
    // Add colors
    grd.addColorStop(0.000, 'rgba(162, 65, 242, 1.000)')
    grd.addColorStop(0.418, 'rgba(216, 51, 234, 1.000)')
    grd.addColorStop(0.987, 'rgba(233, 127, 255, 1.000)')
    ctx.beginPath()
    ctx.fillStyle = grd
    ctx.arc(width / 2, height / 2, radius - radius * 0.1, 0, Math.PI * 2, false) // Large planet
    ctx.fill()

    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = 'grey'
    ctx.translate(radius, 0)
    ctx.arc(-500, -500, radius * 0.5, 0, Math.PI * 2, false) // Large planet
    ctx.fill()

    ctx.restore()

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

    this.props.endDrag()
  }

  onDrag (item, slot) {
    this.props.beginDrag(item, slot, this)
  }

  onClick (item, slot) {
    if (this.props.dragging.dragItem) {
      this.onDrop(item, slot)
    } else {
      this.onDrag(item, slot)
    }
  }

  render () {
    return (
      <div className='row'>
        <div className='col-12'>
          <h3>Explore Planet</h3>
        </div>
        <div className='col-12 text-center' onScroll={this.handleScroll}>
          <div style={{ position: 'absolute', zIndex: '-1000', top: 0, left: 0 }}>
            <canvas id='canvas' width={window.innerWidth} height={window.innerHeight} />
          </div>
          <div className='filler' />
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
                  onClick={this.onClick.bind(this)}
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
  beginDrag: (item, slot, source) => dispatch(beginDrag(item, slot, source)),
  endDrag: () => dispatch(endDrag())
})

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, mapDispatchToProps)(Planet)
