import React, { Component } from 'react';
import './cart.css';
import formatCurrency from '../../util';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Modal from 'react-modal';

import { connect } from 'react-redux';
import { removeFromCart } from '../../redux/actions/cartActions';
import { createOrder, clearOrder } from '../../redux/actions/orderActions';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      address: '',
      showCheckout: false,
    };
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
    };

    this.props.createOrder(order);
  };
  closeModal = () => {
    this.props.clearOrder();
  };

  render() {
    const { cartItems, order } = this.props;

    return (
      <div>
        {cartItems.length === 0 ? (
          <div className='cart cart-header'>Cart is empty</div>
        ) : (
          <div className='cart cart-header'>
            You have {cartItems.length} in the cart{' '}
          </div>
        )}

        {order && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className='close-modal' onClick={this.closeModal}>
                x
              </button>
              <div className='order-details'>
                <h3 className='success-message'>Your order has been placed</h3>
                <h2>Order {order._id}</h2>
                <ul>
                  <li>
                    <div>Name:</div>
                    <div>{order.name}</div>
                  </li>
                  <li>
                    <div>Email:</div>
                    <div>{order.email}</div>
                  </li>
                  <li>
                    <div>Address:</div>
                    <div>{order.address}</div>
                  </li>
                  <li>
                    <div>Date:</div>
                    <div>{order.createdAt}</div>
                  </li>
                  <li>
                    <div>Total:</div>
                    {console.log(order.total)}
                    <div>{formatCurrency(order.total)}</div>
                  </li>
                  <li>
                    <div>Cart items:</div>
                    <div>
                      {order.cartItems.map((item) => (
                        <div>
                          {item.count} {'X'} {item.title}
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </Zoom>
          </Modal>
        )}

        <div className='cart'>
          <Fade left cascade>
            <ul className='cart-items'>
              {console.log(cartItems, 'cartItems')}
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div>
                    {item.title}
                    <div className='right'>
                      {formatCurrency(item.price)} x {item.count}
                      <button
                        className='button'
                        onClick={() => this.props.removeFromCart(item)}
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
        {cartItems.length !== 0 && (
          <div>
            <div className='cart'>
              <div className='total'>
                <div>
                  Total:{' '}
                  {formatCurrency(
                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                  )}
                </div>
                <button
                  className='button primary'
                  onClick={() => {
                    this.setState({ showCheckout: true });
                  }}
                >
                  Proceed
                </button>
              </div>
            </div>
            {this.state.showCheckout && (
              <Fade right cascade>
                <div className='cart'>
                  <form action='' onSubmit={this.createOrder}>
                    <ul className='form-container'>
                      <li>
                        <label htmlFor=''>Email</label>
                        <input
                          type='email'
                          name='email'
                          require
                          onChange={this.handleInput}
                        />
                      </li>
                      <li>
                        <label htmlFor=''>Name</label>
                        <input
                          type='text'
                          name='name'
                          require
                          onChange={this.handleInput}
                        />
                      </li>
                      <li>
                        <label htmlFor=''>Address</label>
                        <input
                          type='text'
                          name='address'
                          require
                          onChange={this.handleInput}
                        />
                      </li>
                      <li>
                        <button className='button primary' type='submit'>
                          CheackOut
                        </button>
                      </li>
                    </ul>
                  </form>
                </div>
              </Fade>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.cart.cartItems, 'cart');
  return {
    cartItems: state.cart.cartItems,
    order: state.order.order,
  };
};

export default connect(mapStateToProps, {
  removeFromCart,
  createOrder,
  clearOrder,
})(Cart);
