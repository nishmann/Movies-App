import 'antd/dist/antd.css';
import './card.css';

import { format } from 'date-fns';
import React from 'react';
import { Card, Image, Typography, Rate } from 'antd';

import MovieServices from '../../services/movieServices';
import { generateBorderColor, shortText } from '../../utils/utils';
import Genres from '../Genres';

const { Title, Text } = Typography;

const CardItem = ({ card }) => {
  const { genre_ids, poster_path, id, original_title, overview, release_date, vote_average, rating } = card;

  const movieApi = new MovieServices();
  const genreIds = genre_ids;
  const image = `https://image.tmdb.org/t/p/w500${poster_path}`;
  const title = shortText(original_title, 23, '...');
  const desc = shortText(overview, 93, '...');
  const date = release_date ? format(new Date(release_date), 'PP') : null;

  return (
    <Card hoverable style={{ width: 451 }}>
      <div className="movie__photo">
        <Image src={image} alt={title} />
      </div>
      <div className="movie__info">
        <div className="movie__head">
          <Title level={5}>{title}</Title>
          <div className={`movie__grade ${generateBorderColor(vote_average)}`}>{vote_average}</div>
        </div>
        <Text type="secondary">{date}</Text>
        <Genres genreIds={genreIds} />
        <Text>{desc}</Text>
        <Rate
          className="movie__rate"
          allowHalf
          defaultValue={rating}
          count={10}
          onChange={(star) => movieApi.rateMovie(star, id)}
        />
      </div>
    </Card>
  );
};

export default CardItem;
