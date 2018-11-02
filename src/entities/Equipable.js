import Item from './Item'

export default class Equipable extends Item {
  constructor (name) {
    super()
    this.name = name
    this.sockets = []
    this.maxSockets = 3
    this.buttonText = 'Remove sockets'
    this.backgroundColor = 'lightcoral'
  }
}
