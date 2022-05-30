import React from 'react';
import './app.css';
import { Pagination } from 'antd';
import debounce from 'lodash.debounce';

import CardLists from '../card-lists';
import Search from '../search';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: 'return',
      page: 1,
    };
  }

  handleSearch = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  changePage(num) {
    this.setState({
      page: num,
    });
  }

  render() {
    const { inputValue, page } = this.state;
    return (
      <div className="container">
        <div className="app">
          <Search handleSearch={debounce(this.handleSearch, 900)} />
          <CardLists inputValue={inputValue} page={page} />
          <Pagination onChange={(num) => this.changePage(num)} defaultCurrent={1} total={50} />
        </div>
      </div>
    );
  }
}

export default App;
