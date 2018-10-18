
export default (state = {
  inventoryIsOpen: false,
  workbenchIsOpen: false
}, action) => {
  switch (action.type) {
    case 'UI_OPEN_INVENTORY':
      return {
        ...state,
        inventoryIsOpen: true
      }
    case 'UI_HIDE_INVENTORY':
      return {
        ...state,
        inventoryIsOpen: false
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
