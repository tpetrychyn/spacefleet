export const beginDrag = (dragItem, dragSlot, dragSource) => dispatch => {
  dispatch({
    type: 'BEGIN_DRAG',
    payload: {
      dragItem,
      dragSlot,
      dragSource
    }
  })
}

export const endDrag = (dragTo) => dispatch => {
  dispatch({
    type: 'END_DRAG',
    payload: {
      dragTo
    }
  })
}
