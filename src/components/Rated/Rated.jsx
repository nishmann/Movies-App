import { Component } from 'react';
import { Alert } from 'antd';

import ApiServices from '../../services/apiServices';
import CardItem from '../Card';
import { spinner } from '../../utils/utils';

class Rated extends Component {
  ratedMovie = new ApiServices();

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
      return spinner();
    }
    if (error) {
      return <Alert message="Something went wrong" type="error" />;
    }
    if (cards.length === 0) {
      return <Alert message="Movie not found" type="error" />;
    }
    return (
      <>
        {Object.values(cards).map((card) => (
          <CardItem key={card.id} card={card} />
        ))}
      </>
    );
  }
}

export default Rated;
