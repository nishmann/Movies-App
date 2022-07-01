import { Row, Spin } from 'antd';

const Spinner = () => {
  return (
    <Row justify="center">
      <Spin size="large" className="spin" />
    </Row>
  );
};

export default Spinner;
