import React from 'react'
import { connect } from 'react-redux'

import { Row, Col, Input, FormGroup, InputGroup, InputGroupAddon, Label, Button } from 'reactstrap'
import styled from 'styled-components'

const AuctionWindow = styled.div`
  width: 80%;
  margin: 0 auto;
  background-color: rgba(255,255,255,0.7);
  display: block;
  height: 85vh;
  margin-top: 75px;
  padding: 0 15px;
  position: relative;
`

const ItemPicture = styled.div`
  height: 80px;
  width: 80px;
  background-color: ${props => props.color};
  border: 4px solid white;
  float: left;
  margin-right: 10px;
`

const ItemList = styled.div`
  max-height: calc(100% - 180px);
  overflow-y: auto;
  overflow-x: hidden;
`

const ItemRow = styled.div`
  background-color: white;
  transition: .5s ease
  width: 100%;
  height: 100%;

  &:hover {
    cursor: pointer;
    background-color: rgba(255,255,255,0.5);
  }
`

const ItemLeft = styled.div`
  width: calc(50% - 45px);
  float: left;
`

const ItemRight = styled.div`
  width: calc(50% - 45px);
  float: left;
  text-align: right;
  padding-right: 15px;
`

const Header = styled.div`
`

const Footer = styled.div`
  bottom: 0px;
  position: absolute;
`

const ItemRowContainer = (props) => (
  <Col>
    <ItemRow>
      <ItemPicture color={props.color} />
      <ItemLeft>
        <h4>Space Dust</h4>
        <p>Sold by Taylor Petrychyn</p>
      </ItemLeft>
      <ItemRight>
        <h5>200g</h5>
        <p>24hr remaining</p>
      </ItemRight>
    </ItemRow>
  </Col>
)

class Auction extends React.Component {
  constructor () {
    super()
    this.state = {
      results: Array(30).fill(null, 0)
    }
  }
  render () {
    return (
      <AuctionWindow>
        <Header>
          <h2>Auction House <span className='small float-right'>Operated by Shockz13</span></h2>
        </Header>

        <Row>
          <Col xs={6}>
            <FormGroup>
              <Label for='searchBox'>Item Name</Label>
              <InputGroup>
                <Input type='text' name='text' id='searchBox' placeholder='Enter Item Name' />
                <InputGroupAddon addonType='append'><Button color='primary'>Search</Button></InputGroupAddon>
              </InputGroup>
            </FormGroup>

          </Col>
        </Row>

        <ItemList>
          {this.state.results.map((k, i) => (
            <Row style={{marginTop: i !== 0 ? '15px' : ''}}>
              <ItemRowContainer color='lightblue' />

              <ItemRowContainer color='pink' />
            </Row>
          ))}
        </ItemList>

        <Footer>
          <h2>Your gold: <span className='small'>1523g</span></h2>
        </Footer>
      </AuctionWindow>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Auction)
