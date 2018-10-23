
export default (state = {
  inventoryIsOpen: false,
  workbenchIsOpen: false,
  hoverOver: null,
  gamestate: 'planet'
}, action) => {
  switch (action.type) {
    case 'SET_GAME_STATE':
      return {
        ...state,
        gamestate: action.payload.gamestate
      }

    case 'UI_SET_HOVER':
      return {
        ...state,
        hoverOver: action.payload.hover
      }
    case 'UI_OPEN_INVENTORY':
      return {
        ...state,
        inventoryIsOpen: true
      }
    case 'UI_HIDE_INVENTORY':
      return {
        ...state,
        inventoryIsOpen: state.hoverOverInventory
      }

    case 'UI_OPEN_WORKBENCH':
      return {
        ...state,
        workbenchIsOpen: true
      }
    case 'UI_HIDE_WORKBENCH':
      return {
        ...state,
        workbenchIsOpen: false
      }

    default:
      return state
  }
}
