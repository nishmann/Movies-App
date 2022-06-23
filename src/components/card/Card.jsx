import './card.css';
import 'antd/dist/antd.css';

import { format } from 'date-fns';
import React from 'react';
import { Card, Image, Typography, Rate } from 'antd';

import ApiServices from '../../services/apiServices';
import { shortText } from '../../utils/utils';

const { Title, Text } = Typography;

const CardItem = ({ card }) => {
  const movieApi = new ApiServices();
  const image = `https://image.tmdb.org/t/p/w500${card.poster_path}`;
  const idMovie = card.id;
  const title = shortText(card.original_title, 23, '...');
  const desc = shortText(card.overview, 93, '...');
  const date = card.release_date ? format(new Date(card.release_date), 'PP') : null;

  const generateBorderColor = () => {
    let classNames = '';
    if (card.vote_average < 3) {
      classNames = ' movie__grade_border_red';
    } else if (card.vote_average > 3 && card.vote_average < 5) {
      classNames = ' movie__grade_border_orange';
    } else if (card.vote_average > 5 && card.vote_average < 7) {
      classNames = ' movie__grade_border_yellow';
    } else if (card.vote_average > 7) {
      classNames = ' movie__grade_border_green';
    }
    return classNames;
  };

  return (
    <Card className="movie" key={idMovie} hoverable>
      <div className="movie__photo">
        <Image src={image} alt={title} />
      </div>
      <div className="movie__info">
        <div className="movie__head">
          <Title level={5}>{title}</Title>
          <div className={`movie__grade ${generateBorderColor()}`}>{card.vote_average}</div>
        </div>
        <Text type="secondary">{date}</Text>
        <div className="movie__genres">
          <Text keyboard>Action</Text>
        </div>
        <Text>{desc}</Text>
        <Rate allowHalf defaultValue={card.rating} count={10} onChange={(star) => movieApi.rateMovie(star, idMovie)} />
      </div>
    </Card>
  );
};

export default CardItem;
