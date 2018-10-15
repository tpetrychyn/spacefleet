import { combineReducers } from 'redux'
import simpleReducer from './sample'
import enemy from './enemy'
export default combineReducers({
  simpleReducer,
  enemy
})
