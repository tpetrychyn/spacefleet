export default (state = {
  objects: []
}, action) => {
  let objectsCopy = state.objects.slice()
  switch (action.type) {
    case 'PLANET_SET_OBJECTS':
      const { objects } = action.payload
      return {
        ...state,
        objects
      }
    case 'PLANET_PLACE_OBJECT': {
      const { object, point } = action.payload
      objectsCopy.push({ object, point })
      return {
        ...state,
        objects: objectsCopy
      }
    }

    case 'PLANET_REMOVE_OBJECT': {
      const { object } = action.payload
      objectsCopy = objectsCopy.filter(o => o !== object)
      return {
        ...state,
        objects: objectsCopy
      }
    }
    default:
      return state
  }
}
