import React from 'react';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';












const CartDropdown = ({ cartItems, history, toggleCartHidden }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {
        //  in cazul in care cosul este gos va randa un mesaj, 
        // daca in cos exista iteme va randa acele iteme 
        cartItems.length ? (
          cartItems.map(cartItem => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className='empty-message'>Your cart is empty</span>
        )
      }
    </div>
    <CustomButton
      onClick={() => {
        history.push('/checkout');
        // ascunde cart atunci cand suntem in pagina checkout
        toggleCartHidden();
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
);



export default withRouter(CartDropdown);
