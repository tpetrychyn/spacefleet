export const addItem = (item, slot, amount = 1) => dispatch => {
  dispatch({
    type: 'WORKBENCH_ADD_ITEM',
    payload: {
      item,
      slot,
      amount
    }
  })
}

export const removeItem = (item, amount = item.amount) => dispatch => {
  dispatch({
    type: 'WORKBENCH_REMOVE_ITEM',
    payload: {
      item,
      amount
    }
  })
}

export const openWorkbench = () => dispatch => {
  dispatch({
    type: 'WORKBENCH_OPEN',
    payload: {}
  })
}

export const closeWorkbench = () => dispatch => {
  dispatch({
    type: 'WORKBENCH_CLOSE',
    payload: {}
  })
}
