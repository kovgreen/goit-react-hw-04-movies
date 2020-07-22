import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as movieApi from '../../services/movieApi';
import styles from './MovieReviews.module.css';

class MovieReviews extends Component {
  static defaultProps = {};
  static propTypes = {};

  state = {
    reviews: [],
    error: null,
  };

  componentDidMount() {
    movieApi
      .getMovieReviews(this.props.match.params.movieId)
      .then(reviews =>
        this.setState({
          reviews: reviews,
        }),
      )
      .catch(error => this.setState({ error }));
  }
  render() {
    const { reviews } = this.state;
    return (
      <div>
        {!reviews.length ? (
          <p>We dont have any reviews for this movie</p>
        ) : (
          <ul>
            {this.state.reviews.map(review => (
              <li className={styles.ListItem} key={review.id}>
                <p className={styles.Author}>Author: {review.author}</p>
                <p className={styles.TextOfAuthor}>{review.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

MovieReviews.propTypes = {
  reviews: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
};

export default MovieReviews;
