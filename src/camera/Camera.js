import Rectangle from './Rectangle'

export default class Camera {
  constructor (xView, yView, canvasWidth, canvasHeight, worldWidth, worldHeight) {
    // position of camera (left-top coordinate)
    this.xView = xView || 0
    this.yView = yView || 0

    // viewport dimensions
    this.wView = canvasWidth
    this.hView = canvasHeight

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
  }

  centerOn (object) {
    this.set(object._x - window.innerWidth / 2 / this.scale, object._y - window.innerHeight / 2 / this.scale)
  }

  setScale (scale) {
    if (scale >= 0.1 && scale <= 10) {
      this.scale = scale
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
  }

  update () {
    this.viewportRect.set(this.xView, this.yView)
  }
}