import React from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import ActiveButton from '../common/ActiveButton'
import InactiveButton from '../common/InactiveButton'
import BuyInput from '../Buy/BuyInput'
import BuySign from '../Buy/BuySign'
import BuyUnconfirmed from '../Buy/BuyUnconfirmed'
import BuyConfirmed from '../Buy/BuyConfirmed'

import SellInput from '../Sell/SellInput'
import SellSign from '../Sell/SellSign'
import SellUnconfirmed from '../Sell/SellUnconfirmed'
import SellConfirmed from '../Sell/SellConfirmed'

import store from '../../stores/Root'

const ContentStates = {
  SELL_FORM: 'sell_form',
  SIGN_TRANSACTION: 'signTransaction',
  UNCOMFIRMED: 'unconfirmed',
  CONFIRMED: 'confirmed',
}

@observer
class SellForm extends React.Component {

  render() {
    const infotext = "Receive"
    const count = store.tradingStore.sellingState

    const Button = ({active, children, onClick}) => {
      if (active === true) {
        return (
          <ActiveButton onClick={onClick}>{children}</ActiveButton>
        ) 
      } else {
        return (
          <InactiveButton>{children}</InactiveButton> 
        )
      }
    }

    const Content = ({contentCount}) => {
      let contentState
      if (contentCount === 0) {
        contentState = ContentStates.SELL_FORM
      } else if (contentCount === 1) {
        contentState = ContentStates.SIGN_TRANSACTION
      } else if (contentCount ===2) {
        contentState = ContentStates.UNCONFIRMED
      } else {
        contentState = ContentStates.CONFIRMED
      }
      
      if (contentState === ContentStates.SELL_FORM) {
        return(
          <SellInput />
        )
      } else if (contentState === ContentStates.SIGN_TRANSACTION) {
        return(
          <SellSign />
        )
      } else if (contentState === ContentStates.UNCONFIRMED) {
        return(
          <SellUnconfirmed />
        )
      } else if (contentState === ContentStates.CONFIRMED) {
        return(
          <SellConfirmed />
        )
      }
    }

    return (
      <Content contentCount={count} />
    )
  }
}

export default SellForm
