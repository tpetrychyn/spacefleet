import Gem from './Gem'

export default class SupportGem extends Gem {
  constructor (name) {
    super()
    this.name = name
    this.effect = this.effect
  }

  _effect (gem) {
    console.log('Uinimplemented SupportGem Effect')
  }

  effect (gem) {
    if (Object.getPrototypeOf(gem.constructor).name === 'Gem') {
      this._effect(gem)
      // throw new Error('Parameter object is not a Gem', gem)
    }
  }
}
