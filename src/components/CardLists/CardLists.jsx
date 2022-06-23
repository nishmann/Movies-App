import './cardLists.css';
import React, { Component } from 'react';
import { Alert } from 'antd';

import CardItem from '../Card';
import { spinner } from '../../utils/utils';
import ApiServices from '../../services/apiServices';

class CardLists extends Component {
  movieApi = new ApiServices();

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
    this.movieApi.getSessionGuest().then((result) => localStorage.setItem('guest_session_id', result.guest_session_id));
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
    const { inputValue, page } = this.props;
    if (loading) {
      return spinner();
    }
    if (error) {
      return <Alert message="Something went wrong" type="error" />;
    }
    if (movies.length === 0) {
      return <Alert message="Movie not found" type="error" />;
    }
    return (
      <div className="card-lists">
        {movies.map((movie) => (
          <CardItem key={movie.id} inputValue={inputValue} page={page} card={movie} />
        ))}
      </div>
    );
  }
}

export default CardLists;
