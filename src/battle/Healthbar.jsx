import React from 'react'
import styled from 'styled-components'

const RedBar = styled.div`
  width: 100%;
  height: 30px;
  background-color: #f43d3d;
`

const BarContainer = styled.div`
  width: ${props => props.total + '%'};
  float: left;
  height: 100%;
`

const Bar = styled.div`
  height: 100%;
`

const Shield = styled(Bar)`
  background-color: lightblue;
  width: ${props => (props.remaining / props.total * 100) + '%'};
`

const Health = styled(Bar)`
  background-color: lightgreen;
  width: ${props => (props.remaining / props.total * 100) + '%'};
`

export default class HealthBar extends React.Component {
  render () {
    const { maxHealth, health, maxShields, shields, name } = this.props.subject

    const total = maxHealth + maxShields
    const hp = (maxHealth / total * 100)
    const sp = (maxShields / total * 100)

    return (
      <div style={{ width: '100%' }}>
        <RedBar>
          <h4 style={{ position: 'absolute', zIndex: 1, left: '50%' }}>
            <div style={{ position: 'relative', left: '-50%' }}>{name}'s Health</div>
          </h4>
          <BarContainer total={hp}>
            <Health total={maxHealth} remaining={health} />
          </BarContainer>

          <BarContainer total={sp}>
            <Shield total={maxShields} remaining={shields} />
          </BarContainer>
        </RedBar>
      </div>
    )
  }
}
