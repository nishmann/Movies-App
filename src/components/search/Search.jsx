import { Col, Input } from 'antd';

const Search = ({ handleSearch }) => {
  return (
    <Col flex="auto">
      <Input placeholder="Type to search..." onChange={(e) => handleSearch(e)} />
    </Col>
  );
};

export default Search;
