import React from 'react'
import { Spring, Keyframes, config, animated } from 'react-spring'
import { TimingAnimation, Easing } from 'react-spring/dist/addons'
import delay from 'delay'

import './Planet.css'

function toRadians (angle) {
  return angle * (Math.PI / 180)
}

// Will fade children in and out in a loop
const Container = Keyframes.Spring(async (next, ownProps) => {
  while (true) {
    await next({
      reset: true,
      from: { x: 0 },
      to: { x: 500 }
    })
  }
})
//        transform: `translate(${500 * Math.cos(2 * Math.PI * 500)}px, ${500 * Math.sin(2 * Math.PI * 500)}px)`

export default class Planet extends React.Component {
  render () {
    return (
      <div className='row'>
        <div className='col-12'>
          <h3>Explore Planet</h3>
        </div>
        <div className='col-12'>
          <div className='atmosphere'>
            <div className='planet'>
              <div className='earthOrbit'>
                <Container
                  impl={TimingAnimation}
                  config={{ duration: 2000, easing: Easing.linear }}>
                  {({ x }) => <div className='earth' style={{ transform: `translate(${500 * Math.cos(Math.sin(x / 500))}px, ${-500 * Math.sin(Math.cos(x / 500))}px)` }}>{1 - Math.cos(x / 500)}</div>}
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
