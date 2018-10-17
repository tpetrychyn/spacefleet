export default (state = {
  dragItem: null,
  dragSlot: null,
  dragSource: null,
  dragTo: null
}, action) => {
  switch (action.type) {
    case 'BEGIN_DRAG':
      return {
        dragItem: action.payload.dragItem,
        dragSlot: action.payload.dragSlot,
        dragSource: action.payload.dragSource
      }
    case 'END_DRAG':
      console.log(action.payload.dragTo)
      return {
        dragTo: action.payload.dragTo
      }
    default:
      return state
  }
}
