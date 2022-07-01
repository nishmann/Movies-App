import React, { Component } from 'react';
import { Alert } from 'antd';

import MovieServices from '../../services/movieServices';
import MoviesList from '../MoviesList';
import Spinner from '../Spinner';

class MoviesPage extends Component {
  movieApi = new MovieServices();

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    this.getMovie();
  }

  componentDidUpdate(prevProps) {
    const { inputValue, page } = this.props;
    if (inputValue !== prevProps.inputValue || page !== prevProps.page) {
      this.getMovie();
    }
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  getMovie() {
    const { inputValue, page } = this.props;
    const defaultValue = inputValue === '' ? 'return' : inputValue;
    return this.movieApi
      .searchMovies(defaultValue, page)
      .then((res) => {
        this.setState({
          movies: res.results,
          loading: false,
        });
      })
      .catch(this.onError);
  }

  render() {
    const { loading, error, movies } = this.state;
    if (loading) {
      return <Spinner />;
    }
    if (error && !navigator.onLine) {
      return <Alert message="Something went wrong" type="error" />;
    }
    if (movies.length === 0) {
      return <Alert message="Movie not found" type="error" />;
    }
    return <MoviesList data={movies} />;
  }
}

export default MoviesPage;
