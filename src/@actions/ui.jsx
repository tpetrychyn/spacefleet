export const setGamestate = (gamestate) => dispatch => {
  dispatch({
    type: 'SET_GAME_STATE',
    payload: {
      gamestate
    }
  })
}

export const setInventoryHover = (hover) => dispatch => {
  dispatch({
    type: 'UI_SET_INVENTORY_HOVER',
    payload: { hover }
  })
}

export const openInventory = () => dispatch => {
  dispatch({
    type: 'UI_OPEN_INVENTORY',
    payload: {}
  })
}

export const closeInventory = () => dispatch => {
  dispatch({
    type: 'UI_HIDE_INVENTORY',
    payload: {}
  })
}

export const openWorkbench = () => dispatch => {
  dispatch({
    type: 'UI_OPEN_WORKBENCH',
    payload: {}
  })
}

export const closeWorkbench = () => dispatch => {
  dispatch({
    type: 'UI_HIDE_WORKBENCH',
    payload: {}
  })
}
