
export default (state = { health: 1000 }, action) => {
  switch (action.type) {
    case 'ATTACK':
      return {
        health: state.health - 10
      }
    default:
      return state
  }
}
