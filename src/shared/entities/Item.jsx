import uuidv4 from 'uuid/v4'

export default class Item {
  constructor (name, isStackable) {
    this.name = name || 'ITEM_NOT_IMPLEMENTED'
    this.isStackable = isStackable
    this.amount = 1
    this.uuid = uuidv4()
    this.backgroundColor = 'lightgrey'
  }

  getInfo () {
    return 'Item description here'
  }
}
