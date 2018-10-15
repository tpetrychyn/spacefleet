import Item from './Item'

export default class Gem extends Item {
  constructor () {
    super()
    this.name = 'GEM_BASECLASS'
    this.effect = this.effect
  }

  getInfo () {
    return 'Put me in an item.'
  }

  // Internal object object
  _effect () {

  }

  // Public gem effect, polymorphed classes decide how to call internal
  effect () {
    throw new Error('Gem effect not implemented.')
  }
}
