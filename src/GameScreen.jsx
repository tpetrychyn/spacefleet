import React from 'react'

import Inventory from './inventory/inventory/Inventory'
import Workbench from './inventory/workbench/Workbench'

// class LinkGroup {
//   constructor (maxGems) {
//     this.gems = {}
//     this.gems['SupportGem'] = []
//     this.gems['Gem'] = []
//     this.gems['OnAttackGem'] = []
//     this.gemCount = 0
//     this.maxGems = maxGems
//     this.addGem = this.addGem
//   }

//   addGem (gem) {
//     if (this.gemCount < this.maxGems) {
//       const gemType = Object.getPrototypeOf(gem.constructor).name

//       this.gems[gemType] = [...this.gems[gemType], gem]
//       this.gemCount += 1
//     } else {
//       throw new NotEnoughSpaceException('test')
//     }
//   }

//   preBuff (sword) {
//     this.gems['SupportGem'].forEach(sg => {
//       this.gems['SupportGem'].forEach(g => {
//         sg.effect(g)
//       })
//       this.gems['Gem'].forEach(g => {
//         sg.effect(g)
//       })
//     })
//     this.gems['Gem'].forEach(g => {
//       g.effect(sword)
//     })
//   }

//   onAttack (sword) {
//     this.gems['OnAttackGem'].forEach(g => {
//       g.effect(sword)
//     })
//   }

//   getFlatGems () {
//     const flat = []
//     Object.values(this.gems).forEach(g => {
//       g.forEach(s => flat.push(s))
//     })
//     return flat
//   }
// }

// class Sword {
//   constructor () {
//     this.damage = 10
//     this.power = 5
//     this.speed = 2
//     this.sockets = [new LinkGroup(5), new LinkGroup(4)]
//     this.calcBuffs = this.calcBuffs
//   }

//   calcBuffs () {
//     this.sockets.forEach(linkGroup => {
//       linkGroup.preBuff(this)
//     })
//     return this
//   }

//   addGem (group, gem) {
//     this.sockets[group].addGem(gem)
//     return this
//   }

//   removeGem (gem) {
//     const gemType = Object.getPrototypeOf(gem.constructor).name
//     this.sockets.forEach(s => {
//       s.gems[gemType] = s.gems[gemType].filter(g => {
//         if (g.uuid !== gem.uuid) {
//           s.gemCount -= 1
//           return true
//         }
//         return false
//       })
//     })
//     return this
//   }

//   cast () {
//     const output = Math.floor(Math.random() * this.power) + this.damage
//     this.sockets.forEach(linkGroup => {
//       linkGroup.onAttack(this)
//     })
//     console.log('Attacked with ', output)
//   }
// }

export default class GameScreen extends React.Component {
  render () {
    return (
      <div className='row'>
        <div className='col-7'>
          <Inventory />
        </div>
        <div className='col-5'>
          <Workbench />
        </div>
      </div>
    )
  }
}
