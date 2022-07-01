import { Col, Row } from 'antd';

import CardItem from '../CardItem';

const MoviesList = ({ data }) => {
  return (
    <Row justify="center" gutter={[8, 8]}>
      {data.map((card) => (
        <Col key={card.id}>
          <CardItem card={card} />
        </Col>
      ))}
    </Row>
  );
};

export default MoviesList;
