import Equipable from '../shared/entities/Equipable'

export const calculateRecipe = (items) => {
  const result = items.filter(i => i && i.name === 'Double Hit')
  if (result.length >= 2) {
    return new Equipable()
  }

  return null
}
