export default class WorldObject {
  constructor (camera, x, y) {
    this.x = x
    this.y = y
    this.camera = camera
  }

  // this converts x and y to window position
  get x () {
    return (this._x - this.camera.xView) * this.camera.scale
  }

  get y () {
    return (this._y - this.camera.yView) * this.camera.scale
  }

  // world x is _x, _y

  set x (val) { this._x = val }
  set y (val) { this._y = val }
}
