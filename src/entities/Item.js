import uuidv4 from 'uuid/v4'

export default class Item {
  constructor (name = 'ITEM_NOT_IMPLEMENTED', isStackable, backgroundColor = 'lightgrey', backgroundImage) {
    this.name = name
    this.isStackable = isStackable
    this.amount = 1
    this.uuid = uuidv4()
    this.backgroundColor = backgroundColor
    this.backgroundImage = backgroundImage
  }

  clone () {
    const newItem = Object.assign(Object.create(Object.getPrototypeOf(this)), this)
    newItem.uuid = uuidv4()
    return newItem
  }

  getInfo () {
    return 'Item description here'
  }
}
