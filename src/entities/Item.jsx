import uuidv4 from 'uuid/v4'

export default class Item {
  constructor () {
    this.name = 'ITEM_NOT_IMPLEMENTED'
    this.uuid = uuidv4()
  }

  getInfo () {
    return 'Item description here'
  }
}
