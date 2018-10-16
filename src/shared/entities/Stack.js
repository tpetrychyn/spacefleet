export default class Stack {
  constructor (item, amount) {
    this.item = item
    this.amount = amount
  }

  remove (amount) {
    this.amount -= amount
    return this.amount <= 0 ? null : this
  }
}
