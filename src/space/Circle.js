import WorldObject from './WorldObject'

export default class Circle extends WorldObject {
  constructor (camera, x, y, radius, color) {
    super(camera, x, y)
    this.radius = radius
    this.color = color
    this.isSelected = false
  }

  draw (context) {
    context.save()
    context.fillStyle = this.color
    context.beginPath()
    context.arc(this.x, this.y, this.radius * this.camera.scale, 0, 2 * Math.PI)
    context.fill()
    if (this.isSelected) {
      context.strokeStyle = 'red'
      context.stroke()
    }
    context.restore()
  }

  isIntersect (point) {
    return Math.sqrt((point.x - this.x) ** 2 + (point.y - this.y) ** 2) < this.radius * this.camera.scale
  }

  onClick () {
    this.camera.centerOn(this)
  }
}
