import { combineReducers } from 'redux'
import simpleReducer from './sample'
import enemy from './enemy'
import inventory from './inventory'
import workbench from './workbench'
import dragging from './dragging'

export default combineReducers({
  simpleReducer,
  enemy,
  inventory,
  workbench,
  dragging
})
