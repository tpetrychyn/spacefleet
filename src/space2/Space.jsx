import React from 'react'
import Phaser from 'phaser'

const circle = (scene, x, y, radius, color = 0xff0000) => {
  // https://phaser.io/phaser3/devlog/120
  const circ = new Phaser.Geom.Circle(0, 0, radius)
  const graphic = scene.add.graphics({
    x,
    y,
    fillStyle: { color }
  }).setInteractive(circ, Phaser.Geom.Circle.Contains)

  graphic.fillCircleShape(circ)

  graphic.input.dragDistanceThreshold = 3

  scene.physics.add.existing(graphic)

  graphic.body.setCircle(radius, -radius, -radius)

  return graphic
}

let zoom = 1.0

const scrollListener = (e) => {
  zoom -= e.deltaY * 0.001
  if (zoom < 0.1) {
    zoom = 0.1
  }
  if (zoom > 10) { zoom = 10 }
  console.log('hi')
}

function randRange (min, max) {
  return Math.floor((Math.random() * max) + min)
}

// function generate (scene) {
//   const planetNum = randRange(4, 10)

//   let pList = []

//   for (let i = 0; i < planetNum; i++) {
//     const size = randRange(100, 500)
//     let x = randRange(0, 5000)
//     let y = randRange(0, 3000)
//     const color = '#' + Math.floor(Math.random() * 16777215).toString(16)

//     let circ = circle(scene, x, y, size)
//     // for (let p of pList) {
//     //   while (circ.Contains(p)) {
//     //     x = randRange(0, 5000)
//     //     y = randRange(0, 3000)
//     //     circ = circle(scene, x, y, size, color)
//     //   }
//     // }

//     pList.push(circ)
//   }

//   return pList
// }

export default class Space extends React.Component {
  constructor () {
    super()

    this.state = {
      game: {},
      selected: null
    }
  }
  async create () {
    const scene = this.state.game.scene.scenes[0]
    const width = 40000
    const height = 40000

    var cam = scene.cameras.main

    circle(scene, width / 2, height / 2, 300)

    const c2 = circle(scene, width / 2 + 300, height / 2 + 600, 300)
    c2.on('pointerdown', function () {
      console.log('hi')
    })

    const planetNum = randRange(10, 20)

    let pList = []

    for (let i = 0; i < planetNum; i++) {
      const size = randRange(100, 1000)
      let x = randRange(0, width)
      let y = randRange(0, height)
      const color = '0x' + Math.floor(Math.random() * 16777215).toString(16)

      // console.log(color)
      let circ = circle(scene, x, y, size, color)
      pList.push(circ)
    }

    cam.setBounds(0, 0, width, height).setZoom(1)
    cam.scrollX = width / 2
    cam.scrollY = height / 2

    scene.input.on('gameobjectdown', (pointer, gameobject) => {
      console.log(gameobject)
      console.log(gameobject.x - cam.scrollX, gameobject.y - cam.scrollY)
      // Only follow if not a drag
      console.log(pointer)
      this.setState({ selected: gameobject })
      cam.startFollow(gameobject)
    })

    console.log(cam)

    window.addEventListener('wheel', scrollListener)
  }

  worldToScreen (camera, pos) {
    return {
      x: pos.x - camera.scrollX,
      y: pos.y - camera.scrollY
    }
  }

  update (time, delta) {
    const camera = this.cameras.main

    if (this.input.activePointer.isDown) {
      if (this.game.origDragPoint) {
        camera.stopFollow()
        // Todo only stop follow on a proper drag
        camera.scrollX += (this.game.origDragPoint.x - this.input.activePointer.position.x) / zoom
        camera.scrollY += (this.game.origDragPoint.y - this.input.activePointer.position.y) / zoom
      }
      this.game.origDragPoint = this.input.activePointer.position.clone()
    } else {
      this.game.origDragPoint = null
    }

    camera.setZoom(zoom)
  }

  componentDidMount () {
    const config = {
      type: Phaser.CANVAS,
      width: window.innerWidth,
      height: window.innerHeight,
      parent: 'game',
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
          gravity: { y: 0 }
        }
      },
      scene: {
        preload: null,
        create: this.create.bind(this),
        update: this.update
      },
      backgroundColor: 'rgba(0,0,0,0)'
    }
    this.setState({ game: new Phaser.Game(config) })
  }

  componentWillUnmount () {
    this.game.runDestroy()
    window.removeEventListener('wheel', scrollListener)
  }

  render () {
    return (
      <div>
        {this.selected
          ? <div style={{ position: 'absolute', top: this.selected.y - 10, left: this.selected.x - 35, zIndex: 1000, height: '50px', width: '50px', display: 'block' }}>
            <button onClick={this.explorePlanet.bind(this)} className='btn btn-md btn-danger'>Explore</button>
          </div>
          : ''}
        <div id='game' style={{ zIndex: '-1000', top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }} />
      </div>
    )
  }
}
