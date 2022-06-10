import './card.css';
import 'antd/dist/antd.css';
import React from 'react';
import { Card, Image, Typography, Alert } from 'antd';
import { format } from 'date-fns';

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
    return fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=05e95f40431909703294af8aa788da5d&query=${inputValue}&page=${page}`
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
      <Card className="movie" key={idMovie}>
        <div className="movie__photo">
          <Image src={image} alt={title} />
        </div>
        <div className="movie__info">
          <Title level={4}>{title}</Title>
          <Text type="secondary">{date}</Text>
          <div className="movie__genres">
            <Text keyboard>Drama</Text>
            <Text keyboard>Action</Text>
          </div>
          <Text>{desc}</Text>
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
