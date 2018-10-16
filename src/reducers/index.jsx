import { combineReducers } from 'redux'
import inventory from './inventory'
import workbench from './workbench'
import dragging from './dragging'

export default combineReducers({
  inventory,
  workbench,
  dragging
})