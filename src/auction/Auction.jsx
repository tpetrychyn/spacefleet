import React, { useState } from 'react'
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
  max-height: calc(85vh - 180px);
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
  <Col onClick={props.onClick}>
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

const ConfirmWindowDiv = styled.div`
  position: absolute;
  top: calc(50% - 100px);
  left: calc(50% - 200px);
  width: 400px;
  height: 200px;
  background-color: rgba(255,255,255,0.9);
  z-index: 1000;
`

const ConfirmWindow = (props) => (
  props.show ? <ConfirmWindowDiv>
    <h2>Confirm Purchase</h2>
    <h3>Space Dust <span className='small'>x5</span></h3>

    <Button color='primary'>Confirm</Button>
    <Button color='link' onClick={props.onHide}>Cancel</Button>
  </ConfirmWindowDiv> : ''

)

function Auction () {
  const [results] = useState(Array(30).fill(null, 0))
  const [isConfirming, setIsConfirming] = useState(false)
  return (
    <AuctionWindow>
      <Header>
        <h2>Auction House <span className='small float-right'>Operated by Shockz13</span></h2>
      </Header>

      <ConfirmWindow
        show={isConfirming}
        onHide={() => setIsConfirming(false)} />

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
        {results.map((k, i) => (
          <Row key={i} style={{ marginTop: i !== 0 ? '15px' : '' }}>
            <ItemRowContainer color='lightblue' onClick={() => setIsConfirming(true)} />

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

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Auction)
