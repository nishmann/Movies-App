import { Component } from 'react';
import { Alert } from 'antd';

import MovieServices from '../../services/movieServices';
import MoviesList from '../MoviesList';
import Spinner from '../Spinner';

class RatedMoviesPage extends Component {
  ratedMovie = new MovieServices();

  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    this.getMovie();
  }

  componentDidUpdate(prevProps) {
    const { cards } = this.state;
    if (cards !== prevProps.cards) {
      this.getMovie();
    }
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  getMovie = () => {
    this.ratedMovie
      .getRatedMovie()
      .then((data) => {
        this.setState({
          cards: data.results,
          loading: false,
        });
      })
      .catch(this.onError);
  };

  render() {
    const { cards, loading, error } = this.state;
    if (loading) {
      return <Spinner />;
    }
    if (error && !navigator.onLine) {
      return <Alert message="Something went wrong" type="error" />;
    }
    if (cards.length === 0) {
      return <Alert message="Movie not found" type="error" />;
    }
    return <MoviesList data={cards} />;
  }
}

export default RatedMoviesPage;
