import './app.css';

import React from 'react';
import { Pagination, Tabs } from 'antd';
import debounce from 'lodash.debounce';

import CardLists from '../CardLists';
import Search from '../Search';
import Rated from '../Rated';

const { TabPane } = Tabs;

class App extends React.Component {
  constructor(props) {
    super(props);
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
          <Tabs>
            <TabPane tab="Search" key="1">
              <Search handleSearch={debounce(this.handleSearch, 900)} />
              <CardLists inputValue={inputValue} page={page} />
              <Pagination onChange={(num) => this.changePage(num)} defaultCurrent={1} total={50} />
            </TabPane>
            <TabPane tab="Rated" key="2">
              <Rated />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default App;
