import Item from './Item'
import InventoryService from '../services/InventoryService'

export default class Equipable extends Item {
  constructor () {
    super()
    this.name = 'Platebody'
    this.sockets = []
    this.maxSockets = 3
    this.buttonText = 'Remove sockets'
  }

  getInfo () {
    return `Sockets: ${this.sockets.map(s => ' ' + s.name)}`
  }

  itemButton (me) {
    console.log(this, me)
    me.sockets.forEach(gem => {
      InventoryService.addItem(gem)
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
