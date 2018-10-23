import React from 'react'
import { connect } from 'react-redux'

import { addItem } from '../@actions/inventory'
import { closeInventory, openInventory, setGamestate } from '../@actions/ui'

import Circle from './Circle'
import Camera from './Camera'

function randRange (min, max) {
  return Math.floor((Math.random() * max) + min)
}

function generate (camera) {
  const planetNum = randRange(4, 10)

  let pList = []

  for (let i = 0; i < planetNum; i++) {
    const size = randRange(100, 500)
    let x = randRange(0, 5000)
    let y = randRange(0, 3000)
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16)

    let circ = new Circle(camera, x, y, size, color)
    for (let p of pList) {
      while (p.isIntersect({ x, y }) || circ.isIntersect({ x: p._x, y: p._y })) {
        x = randRange(0, 5000)
        y = randRange(0, 3000)
        circ = new Circle(camera, x, y, size, color)
      }
    }

    pList.push(circ)
  }

  return pList
}

const FPS = 60
const INTERVAL = 1000 / FPS

class Game extends React.Component {
  constructor () {
    super()
    this.canvas = {}
    this.ctx = {}
    this.room = {}
    this.objects = []
    this.scale = 1

    this.earth = new Image()
    this.lastTime = new Date().getTime()
  }

  componentDidMount () {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')

    const canvas = this.canvas

    this.room = {
      width: 5000,
      height: 3000
    }

    this.camera = new Camera(0, 0, canvas.width, canvas.height, this.room.width, this.room.height, this)
    this.earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png'

    this.objects = generate(this.camera)

    this.camera.centerOn(this.objects[0])

    var flag = 0
    let movement = 0
    canvas.addEventListener('mousedown', e => {
      movement = 0
      flag = 0
    }, false)
    canvas.addEventListener('mousemove', e => {
      movement += Math.sqrt((Math.abs(e.movementX) ** 2) + (Math.abs(e.movementY) ** 2))
      flag = 1
    }, false)
    canvas.addEventListener('mouseup', e => {
      if (flag === 0 || movement < 10) {
        const [x, y] = [e.clientX, e.clientY]

        for (let o of this.objects) {
          if (o.isIntersect({ x, y })) {
            this.selected = o
            o.onClick()
            this.forceUpdate()
            break
          }
        }
      }
    }, false)

    canvas.addEventListener('mousedown', (e) => this.camera.startPan(e, canvas))
    canvas.addEventListener('mouseleave', (e) => this.camera.endPan(e, canvas))
    canvas.addEventListener('mouseup', (e) => this.camera.endPan(e, canvas))

    canvas.addEventListener('wheel', this.handleScroll.bind(this))

    this.runningId = setInterval(this.gameLoop.bind(this), INTERVAL)
  }

  handleScroll (e) {
    e.preventDefault()
    this.x = e.clientX
    this.y = e.clientY

    this.camera.setScale(this.camera.scale - (0.001 * e.deltaY))
    this.forceUpdate()
  }

  update () {
    this.camera.update()
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

  draw () {
    const context = this.ctx

    this.clearCanvas(context)

    for (let o of this.objects) {
      o.isSelected = false
      if (o === this.selected) {
        o.isSelected = true
      }
      o.draw(context)
    }

    this.currentTime = (new Date()).getTime()
    const dt = (this.currentTime - this.lastTime) / 1000

    if (this.objects[0]) {
      const o = this.objects[0]
      context.save()
      context.translate(o.x, o.y)
      context.rotate(Math.PI / 180 * dt * 100 / 2)
      context.translate((o.radius + 50) * this.camera.scale, 0)
      context.drawImage(this.earth, -12, -12, this.earth.width * this.camera.scale, this.earth.height * this.camera.scale)
      context.restore()
    }

    for (let [i, o] of this.objects.entries()) {
      if (i % 3 === 0) continue
      context.save()
      context.translate(o.x, o.y)
      context.rotate(-Math.PI / 180 * dt * 100 / 2 * (1 + i / 10))
      context.translate((o.radius + (50 * (2 + i / 2))) * this.camera.scale, 0)
      context.drawImage(this.earth, -12, -12, this.earth.width * this.camera.scale, this.earth.height * this.camera.scale)
      context.restore()
    }
  }

  // Game Loop
  gameLoop () {
    this.update()
    this.draw()
  }

  explorePlanet () {
    this.props.setGamestate('planet')
  }

  render () {
    return (
      <div>
        {this.selected
          ? <div style={{ position: 'absolute', top: this.selected.y - 10, left: this.selected.x - 35, zIndex: 1000, height: '50px', width: '50px', display: 'block' }}>
            <button onClick={this.explorePlanet.bind(this)} className='btn btn-md btn-danger'>Explore</button>
          </div>
          : ''}
        <div style={{ zIndex: '-1000', top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }}>
          <canvas id='canvas' width={window.innerWidth} height={window.innerHeight} />
        </div>
      </div>

    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  addItem: (item, slot, amount) => dispatch(addItem(item, slot, amount)),
  openInventory: () => dispatch(openInventory()),
  closeInventory: () => dispatch(closeInventory()),
  setGamestate: (gamestate) => dispatch(setGamestate(gamestate))
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)
