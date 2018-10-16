
export default (state = {
  slots: Array(6).fill(null, 0)
}, action) => {
  const slotsCopy = state.slots.slice()
  switch (action.type) {
    case 'WORKBENCH_ADD_ITEM':
      let findSlot = action.payload.slot || state.slots.findIndex(s => !s)
      slotsCopy[findSlot] = action.payload.item
      return {
        slots: slotsCopy
      }
    case 'WORKBENCH_REMOVE_ITEM':
      findSlot = state.slots.findIndex(s => {
        return s && s.uuid === action.payload.uuid
      })
      slotsCopy[findSlot] = null
      return {
        slots: slotsCopy
      }
    case 'WORKBENCH_SWAP_ITEMS':
      const { fromItem, toItem } = action.payload
      const fromSlot = getSlot(state.slots, fromItem)
      const toSlot = getSlot(state.slots, toItem)

      slotsCopy[fromSlot] = toItem
      slotsCopy[toSlot] = fromItem
      return {
        slots: slotsCopy
      }
    default:
      return state
  }
}

const getSlot = (slots, item) => {
  return slots.findIndex(i => i && i.uuid === item.uuid)
}

const getSlotOfStackable = (slots, item) => {
  return slots.findIndex(i => i && i.name === item.name)
}
