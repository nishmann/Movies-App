import { Input, Row } from 'antd';

const Search = ({ handleSearch }) => {
  return (
    <Row>
      <Input placeholder="Type to search..." onChange={(e) => handleSearch(e)} />
    </Row>
  );
};

export default Search;
