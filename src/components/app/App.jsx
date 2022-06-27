import React from 'react';
import { Col, Pagination, Row, Space, Tabs } from 'antd';
import debounce from 'lodash.debounce';

import CardLists from '../CardLists';
import Search from '../Search';
import Rated from '../Rated';
import { Provider } from '../../context';
import ApiServices from '../../services/apiServices';

const { TabPane } = Tabs;

class App extends React.Component {
  movieApi = new ApiServices();

  constructor(props) {
    super(props);
    this.state = {
      inputValue: 'return',
      page: 1,
      genres: [],
    };
  }

  componentDidMount() {
    this.movieApi.getGenres().then(({ genres }) => {
      this.setState({ genres });
    });
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
    const md = { span: 24 };
    const lg = { span: 18 };
    const { inputValue, page, genres } = this.state;
    return (
      <Provider value={genres}>
        <Row justify="center">
          <Col md={md} lg={lg}>
            <Tabs centered>
              <TabPane tab="Search" key="1">
                <Space direction="vertical">
                  <Search handleSearch={debounce(this.handleSearch, 900)} />
                  <CardLists inputValue={inputValue} page={page} />
                  <Row align="center">
                    <Pagination onChange={(num) => this.changePage(num)} defaultCurrent={1} total={50} />
                  </Row>
                </Space>
              </TabPane>
              <TabPane tab="Rated" key="2">
                <Rated />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Provider>
    );
  }
}

export default App;
