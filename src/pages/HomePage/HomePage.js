import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as movieApi from '../../services/movieApi';
import { NavLink } from 'react-router-dom';
import styles from './HomePage.module.css';

class HomePage extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = {
    trending: [],
    error: null,
  };

  componentDidMount() {
    movieApi
      .getTrending()
      .then(movies => this.setState({ trending: movies }))
      .then(error => this.setState({ error }));
  }

  render() {
    const { trending } = this.state;
    return (
      <div>
        <h1 className={styles.Title}>Trending movies</h1>
        <ul className={styles.List}>
          {trending.map(movie => (
            <li className={styles.ListItem} key={movie.id}>
              <NavLink
                className={styles.ListItem}
                to={{ pathname: `/movies/${movie.id}` }}
              >
                {movie.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

HomePage.propTypes = {
  trending: PropTypes.shape({
    page: PropTypes.number,
    movies: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
  }),
};

export default HomePage;
