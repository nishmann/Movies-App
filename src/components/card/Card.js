import './card.css';
import 'antd/dist/antd.css';
import React from 'react';
import { Card, Image, Typography, Spin, Row, Alert } from 'antd';
import { format } from 'date-fns';

import ApiServices from '../../apiServices';

const { Title, Text } = Typography;

class CardItem extends React.Component {
  MovieServices = new ApiServices();

  constructor() {
    super();
    this.state = {
      movie: [],
      loading: true,
      error: false,
    };
    this.updateMovie = this.updateMovie();
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  spinner() {
    return (
      <Row justify="center">
        <Spin size="large" className="spin" />
      </Row>
    );
  }

  updateMovie() {
    this.MovieServices.getMovies()
      .then((data) => {
        this.setState({
          movie: data.results,
          loading: false,
        });
      })
      .catch(this.onError);
  }

  shortText(str, maxLength, dots) {
    const normDesc = str.indexOf(' ', maxLength);
    return normDesc === -1 ? str : str.substr(0, normDesc) + dots;
  }

  newCard(movie) {
    const image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const idMovie = movie.id;
    const title = this.shortText(movie.original_title, 23, '...');
    const desc = this.shortText(movie.overview, 93, '...');
    const date = format(new Date(movie.release_date), 'PP');
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
      return this.spinner();
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
