export const addItem = (item, slot) => dispatch => {
  dispatch({
    type: 'INVENTORY_ADD_ITEM',
    payload: {
      item,
      slot
    }
  })
}

export const removeItem = (item) => dispatch => {
  dispatch({
    type: 'INVENTORY_REMOVE_ITEM',
    payload: item
  })
}

export const swapItems = (fromItem, toItem) => dispatch => {
  dispatch({
    type: 'INVENTORY_SWAP_ITEMS',
    payload: {
      fromItem,
      toItem
    }
  })
}
