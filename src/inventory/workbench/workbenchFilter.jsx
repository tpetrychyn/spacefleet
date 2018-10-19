import Equipable from '../../shared/entities/Equipable'

const hasRequiredItems = (itemCounts, costs) => {
  return costs.every(required => itemCounts[required.name] >= required.quantity)
}

export const calculateRecipe = (items) => {
  const itemCounts = items.reduce((map, item) => {
    if (item) {
      map[item.name] = (item.amount || 1) + (map[item.name] || 0)
    }
    return map
  }, {})

  for (let recipe of recipes) {
    if (hasRequiredItems(itemCounts, recipe.costs)) {
      return recipe
    }
  }

  return {}
}

const recipes = [
  {
    item: new Equipable('Small Satellite'),
    costs: [
      { name: 'Double Hit', quantity: 2 }
    ]
  },
  {
    item: new Equipable('Large Satellite'),
    costs: [
      { name: 'Level +1', quantity: 1 },
      { name: 'Space Dust', quantity: 10 }
    ]
  }
]
