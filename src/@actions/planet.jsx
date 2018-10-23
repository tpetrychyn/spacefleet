export const placeObject = (object, point) => dispatch => {
  dispatch({
    type: 'PLANET_PLACE_OBJECT',
    payload: {
      object,
      point
    }
  })
}

export const removeObject = (object) => dispatch => {
  dispatch({
    type: 'PLANET_REMOVE_OBJECT',
    payload: {
      object
    }
  })
}
