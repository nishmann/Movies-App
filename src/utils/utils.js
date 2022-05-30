import { Spin, Row } from 'antd';

export const spinner = () => {
  return (
    <Row justify="center">
      <Spin size="large" className="spin" />
    </Row>
  );
};

export const shortText = (str, maxLength, dots) => {
  const normDesc = str.indexOf(' ', maxLength);
  return normDesc === -1 ? str : str.substr(0, normDesc) + dots;
};
