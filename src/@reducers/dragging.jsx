export default (state = {
  dragItem: null,
  dragSlot: null,
  dragSource: null
}, action) => {
  switch (action.type) {
    case 'BEGIN_DRAG':
      return {
        ...state,
        dragItem: action.payload.dragItem,
        dragSlot: action.payload.dragSlot,
        dragSource: action.payload.dragSource
      }
    case 'END_DRAG':
      return {
        ...state,
        dragItem: null,
        dragSlot: null,
        dragSource: null
      }
    default:
      return state
  }
}
