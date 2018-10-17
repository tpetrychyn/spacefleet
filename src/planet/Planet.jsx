import React from 'react'

import './Planet.css'

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
                <div className='earth' />
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
