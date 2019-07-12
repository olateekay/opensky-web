import React, { Component } from 'react';
import Routes from '../src/components/Routes';

import Footer from './components/Footer';
import './index.css';

class App extends Component {

  render() {
    return (
      <div className="flexible-content">
        <main id="content" className="p-5">
          <Routes />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
