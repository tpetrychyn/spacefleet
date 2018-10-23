export const setObjects = (objects) => dispatch => {
  dispatch({
    type: 'PLANET_SET_OBJECTS',
    payload: {
      objects
    }
  })
}

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
