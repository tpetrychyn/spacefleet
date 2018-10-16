import Item from './Item'
import Player from './Player'

export default class Equipable extends Item {
  constructor (name) {
    super()
    this.name = name
    this.sockets = []
    this.maxSockets = 3
    this.buttonText = 'Remove sockets'
    this.backgroundColor = 'lightcoral'
  }

  getInfo () {
    return `Sockets: ${this.sockets.map(s => ' ' + s.name)}`
  }

  itemButton (me) {
    me.sockets.forEach(gem => {
      Player.inventory.addItem(gem)
    })
    me.sockets = []
    this.forceUpdate()
  }

  addSocket (gem) {
    if (this.sockets.length < this.maxSockets) {
      this.sockets.push(gem)
    }
  }

  removeSocket (gem) {
    this.sockets = this.sockets.filter(g => g && g.uuid === gem.uuid)
  }
}
