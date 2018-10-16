export default (state = {
  slots: Array(6).fill(null, 0)
}, action) => {
  const slotsCopy = state.slots.slice()
  let found
  switch (action.type) {
    case 'WORKBENCH_ADD_ITEM':
      let item = action.payload.item
      item.amount = action.payload.amount || 1
      let existingItem = state.slots.find(s => s && s.name === item.name)
      if (item.isStackable && existingItem) {
        existingItem.amount += action.payload.amount
      } else {
        found = action.payload.slot || state.slots.findIndex(s => !s) // appropriate slot
        slotsCopy[found] = item
      }
      return {
        slots: slotsCopy
      }
    case 'WORKBENCH_REMOVE_ITEM':
      item = action.payload.item
      found = state.slots.findIndex(s => s && s.uuid === item.uuid)
      if (found === -1) found = state.slots.findIndex(s => s && s.name === item.name)
      if (found > -1) {
        let itemCopy = slotsCopy[found].clone()
        itemCopy.amount -= action.payload.amount

        if (itemCopy.amount <= 0) {
          itemCopy = null
        }
        slotsCopy[found] = itemCopy
      }
      return {
        slots: slotsCopy
      }
    default:
      return state
  }
}
