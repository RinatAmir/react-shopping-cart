import React from 'react';
import Products from './components/products/Products';
import Filter from './components/filter/Filter';
import Cart from './components/cart/Cart';
//feature 1

class App extends React.Component {
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
              <Products />
            </div>
            <div className='sidebar'>
              <Cart />
            </div>
          </div>
        </main>
        <footer> All right is reserved.</footer>
      </div>
    );
  }
}

export default App;
