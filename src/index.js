import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'

import './index.css'
import GameScreen from './GameScreen'
import * as serviceWorker from './serviceWorker'

const store = configureStore()

const render = Component => {
  return ReactDOM.render(
    <Provider store={store}>
      <GameScreen />
    </Provider>,
    document.getElementById('root')
  )
}

render(GameScreen)

if (module.hot) {
  module.hot.accept('./GameScreen', () => {
    const NextApp = require('./GameScreen').default
    render(NextApp)
  })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
