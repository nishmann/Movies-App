import './card-lists.css';
import React from 'react';

import CardItem from '../Card';

function CardLists({ inputValue, page }) {
  return (
    <div className="card-lists">
      <CardItem inputValue={inputValue} page={page} />
    </div>
  );
}

export default CardLists;
