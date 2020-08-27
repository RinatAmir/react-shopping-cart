import React from 'react';
import Products from './components/products/Products';
import Filter from './components/filter/Filter';
import Cart from './components/cart/Cart';
//feature 1

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
    };
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;

    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  removeItem = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((cartItem) => cartItem._id !== product._id),
    });
    localStorage.setItem(
      'cartItems',
      JSON.stringify(
        cartItems.filter((cartItem) => cartItem._id !== product._id)
      )
    );
  };

  createOrder = (order) => {
    alert('dslvmkdsk' + order.name);
  };

  render() {
    return (
      <div className='grid-container'>
        <header>
          <a href='/'>React Shoppong</a>
        </header>
        <main>
          <div className='content'>
            <div className='main'>
              <Filter />
              <Products addToCart={this.addToCart} />
            </div>
            <div className='sidebar'>
              <Cart
                cartItems={this.state.cartItems}
                removeItem={this.removeItem}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        <footer> All right is reserved.</footer>
      </div>
    );
  }
}

export default App;
