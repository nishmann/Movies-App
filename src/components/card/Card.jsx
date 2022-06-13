import './card.css';
import 'antd/dist/antd.css';
import React from 'react';
import { Card, Image, Typography, Alert } from 'antd';
import { format } from 'date-fns';
import RateItem from '../Rate';

import { shortText, spinner } from '../../utils/utils';

const { Title, Text } = Typography;

class CardItem extends React.Component {
  constructor() {
    super();
    this.imgUrl = 'https://image.tmdb.org/t/p/w500';
    this.state = {
      movie: [],
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    this.updateMovie();
  }

  componentDidUpdate(prevProps) {
    const { inputValue, page } = this.props;
    if (inputValue !== prevProps.inputValue || page !== prevProps.page) {
      this.updateMovie();
    }
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  updateMovie() {
    const { inputValue, page } = this.props;
    const defaultValue = inputValue === '' ? 'return' : inputValue;
    return fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=05e95f40431909703294af8aa788da5d&query=${defaultValue}&page=${page}`
    )
      .then((data) => data.json())
      .then((res) => {
        this.setState({
          movie: res.results,
          loading: false,
        });
      })
      .catch(this.onError);
  }

  newCard(movie) {
    const image = `${this.imgUrl}${movie.poster_path}`;
    const idMovie = movie.id;
    const title = shortText(movie.original_title, 23, '...');
    const desc = shortText(movie.overview, 93, '...');
    const date = movie.release_date ? format(new Date(movie.release_date), 'PP') : null;
    return (
      <Card className="movie" key={idMovie} hoverable>
        <div className="movie__photo">
          <Image src={image} alt={title} />
        </div>
        <div className="movie__info">
          <div className="movie__head">
            <Title level={5}>{title}</Title>
            <div className="movie__grade grade-border">6.6</div>
          </div>
          <Text type="secondary">{date}</Text>
          <div className="movie__genres">
            <Text keyboard>Drama</Text>
            <Text keyboard>Action</Text>
          </div>
          <Text>{desc}</Text>
          <RateItem />
        </div>
      </Card>
    );
  }

  render() {
    const { movie, loading, error } = this.state;
    if (loading) {
      return spinner();
    }
    if (error) {
      return <Alert message="Something went wrong" type="error" />;
    }
    if (movie.length === 0) {
      return <Alert message="Movie not found" type="error" />;
    }
    return <>{movie.map((item) => this.newCard(item))}</>;
  }
}

export default CardItem;
