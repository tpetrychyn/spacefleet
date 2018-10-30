import Rectangle from './Rectangle'

export default class Camera {
  constructor (xView, yView, canvasWidth, canvasHeight, worldWidth, worldHeight, react) {
    this.react = react
    // position of camera (left-top coordinate)
    this.xView = xView || 0
    this.yView = yView || 0

    // viewport dimensions
    this.wView = canvasWidth
    this.hView = canvasHeight

    this.width = this.wView
    this.height = this.hView

    this.scale = 1

    // rectangle that represents the viewport
    this.viewportRect = new Rectangle(this.xView, this.yView, this.wView, this.hView)

    this.trackEvent = this.trackMouse.bind(this)

    this.global = {
      scale: 1,
      offset: {
        x: this.xView,
        y: this.yView
      }
    }

    this.pan = {
      start: {
        x: null,
        y: null
      }
    }
    this.origX = this.xView
    this.origY = this.yView
  }

  /*  // this converts x and y to window position
  get x () {
    return (this._x - this.camera.xView) * this.camera.scale */

  centerOn (object) {
    console.log(this.xView, this.yView)
    this.set(object._x - window.innerWidth / 2 / this.scale, object._y - window.innerHeight / 2 / this.scale)
  }

  setScale (scale) {
    if (scale >= 0.1 && scale <= 10) {
      const change = this.scale - scale
      const perChange = change / this.scale
      this.scale = scale

      const x = window.innerWidth / 2
      const y = window.innerHeight / 2

      const xWorld = (x - this.xView) / this.scale
      const yWorld = (y - this.yView) / this.scale

      // console.log(xWorld, yWorld)
      console.log(change, perChange)
      console.log(this.xView - this.xView * perChange)
      console.log(this.origY)
      this.set(this.xView - this.origX * perChange, this.yView - this.origY * perChange)
    }
  }

  set (x, y) {
    this.xView = x
    this.yView = y
    this.global.offset.x = x
    this.global.offset.y = y
  }

  startPan (e, canvas) {
    canvas.addEventListener('mousemove', this.trackEvent)
    this.pan.start.x = e.clientX
    this.pan.start.y = e.clientY
  }

  endPan (e, canvas) {
    canvas.removeEventListener('mousemove', this.trackEvent)
    this.pan.start.x = null
    this.pan.start.y = null
    this.global.offset.x = this.xView
    this.global.offset.y = this.yView
  }

  trackMouse (e) {
    var offsetX = (e.clientX - this.pan.start.x) / this.scale
    var offsetY = (e.clientY - this.pan.start.y) / this.scale
    this.xView = this.global.offset.x - offsetX
    this.yView = this.global.offset.y - offsetY
    this.react.forceUpdate()
  }

  update () {
    this.viewportRect.set(this.xView, this.yView)
  }
}
