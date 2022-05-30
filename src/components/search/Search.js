import './search.css';
import { Input } from 'antd';

function Search({ handleSearch }) {
  return (
    <div className="search-panel">
      <Input placeholder="Type to search..." onChange={(e) => handleSearch(e)} />
    </div>
  );
}

export default Search;