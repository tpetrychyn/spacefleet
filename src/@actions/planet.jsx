export const addItem = (item, slot, amount = 1) => dispatch => {
  dispatch({
    type: 'PLANET_ADD_ITEM',
    payload: {
      item,
      slot,
      amount
    }
  })
}

export const removeItem = (item, amount = item.amount) => dispatch => {
  dispatch({
    type: 'PLANET_REMOVE_ITEM',
    payload: {
      item,
      amount
    }
  })
}
