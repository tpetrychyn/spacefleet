import { combineReducers } from 'redux'
import inventory from './inventory'
import workbench from './workbench'
import planet from './planet'
import dragging from './dragging'
import ui from './ui'

export default combineReducers({
  inventory,
  workbench,
  planet,
  dragging,
  ui
})