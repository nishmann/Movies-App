import './rate.css';

import { Rate } from 'antd';
import React from 'react';

const RateItem = () => {
  return <Rate allowHalf defaultValue={0} count={10} />;
};

export default RateItem;
