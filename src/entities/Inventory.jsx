export default class Inventory {
  constructor () {
    this.slots = Array(20).fill(null, 0)
  }

  addItem (item) {
    const nextEmpty = this.slots.findIndex(i => !i)
    this.slots[nextEmpty] = item
    return this
  }

  addItemSlot (slot, item) {
    this.slots.splice(slot, 0, item)
    return this
  }

  deleteItem (item) {
    const itemSlot = this.getSlot(item)
    this.slots[itemSlot] = null
    return this
  }

  moveItem (item, toSlot) {
    const fromSlot = this.getSlot(item)

    this.slots[fromSlot] = null
    this.slots[toSlot] = item
    return this
  }

  interactItemAndSlot (item, toSlot) {
    const toItem = this.slots[toSlot]
    if (!toItem) {
      this.moveItem(item, toSlot)
    } else if (toItem.constructor.name === 'Equipable') {
      toItem.addSocket(item)
      this.deleteItem(item)
    } else {
      this.swapItems(item, toItem)
    }
  }

  swapItems (fromItem, toItem) {
    const fromSlot = this.getSlot(fromItem)
    const toSlot = this.getSlot(toItem)

    this.slots[fromSlot] = toItem
    this.slots[toSlot] = fromItem
    return this
  }

  swapSlots (fromSlot, toSlot) {
    const fromItem = this.slots[fromSlot]
    const toItem = this.slots[toSlot]

    this.slots[fromSlot] = toItem
    this.slots[toSlot] = fromItem
    return this
  }

  getSlot (item) {
    return this.slots.findIndex(i => i && i.uuid === item.uuid)
  }
}
