import React from 'react'
import { connect } from 'react-redux'

import Item from '../Item'

import { attack } from '../actions/sample'

class Welcome extends React.Component {
  increment = () => {
    this.props.attack()
    // this.setState((state, props) => {
    //   return { num: state.num + 1 }
    // })
  }
  render () {
    return (
      <div className='row'>
        <Item/>
        <pre>
          {
            JSON.stringify(this.props)
          }
        </pre>
        <button onClick={this.increment}>Click</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  attack: () => dispatch(attack())
})

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
