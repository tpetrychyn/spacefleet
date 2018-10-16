export const addItem = (item, slot) => dispatch => {
  dispatch({
    type: 'WORKBENCH_ADD_ITEM',
    payload: {
      item,
      slot
    }
  })
}

export const removeItem = (item) => dispatch => {
  dispatch({
    type: 'WORKBENCH_REMOVE_ITEM',
    payload: item
  })
}

export const swapItems = (fromItem, toItem) => dispatch => {
  dispatch({
    type: 'WORKBENCH_SWAP_ITEMS',
    payload: {
      fromItem,
      toItem
    }
  })
}
