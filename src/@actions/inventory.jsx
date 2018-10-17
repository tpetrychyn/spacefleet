export const addItem = (item, slot, amount = 1) => dispatch => {
  dispatch({
    type: 'INVENTORY_ADD_ITEM',
    payload: {
      item,
      slot,
      amount
    }
  })
}

export const removeItem = (item, amount = item.amount) => dispatch => {
  dispatch({
    type: 'INVENTORY_REMOVE_ITEM',
    payload: {
      item,
      amount
    }
  })
}

export const openInventory = () => dispatch => {
  dispatch({
    type: 'INVENTORY_OPEN',
    payload: {}
  })
}

export const closeInventory = () => dispatch => {
  dispatch({
    type: 'INVENTORY_CLOSE',
    payload: {}
  })
}
