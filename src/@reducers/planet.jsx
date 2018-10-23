export default (state = {
  objects: []
}, action) => {
  const objectsCopy = state.objects.slice()
  switch (action.type) {
    case 'PLANET_PLACE_OBJECT':
      const { object, point } = action.payload
      objectsCopy.push({ object, point })
      return {
        ...state,
        objects: objectsCopy
      }
    default:
      return state
  }
}
