import Item from './Item'

const ItemList = {
  SPACE_DUST: {
    name: 'Space Dust',
    isStackable: true,
    backgroundColor: 'lightgrey'
  },
  SCRAP_METAL: {
    name: 'Scrap Metal',
    isStackable: true,
    backgroundColor: 'lightgrey',
    backgroundImage: require('./metal.png')
  },
  ICE_PARTICLE: {
    name: 'Ice Particle',
    isStackable: true,
    backgroundColor: 'lightgrey',
    backgroundImage: require('./ice.png')
  },
  PLASMA_BOLT: {
    name: 'Plasma Bolt',
    isStackable: false,
    backgroundColor: '#BAABC8',
    backgroundImage: require('./bolt.png')
  },
  SMALL_SATELLITE: {
    name: 'Small Satellite',
    isStackable: false,
    backgroundColor: '#C9F7EE',
    backgroundImage: require('./satellite.png')
  }
}

Object.entries(ItemList).forEach(([key, item]) => {
  ItemList[key] = new Item(item.name, item.isStackable, item.backgroundColor, item.backgroundImage)
})

console.log(ItemList)

export default ItemList
