import React from 'react';

import './app.css';
import CardLists from '../card-lists';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="app">
          <CardLists />
        </div>
      </div>
    );
  }
}

export default App;
