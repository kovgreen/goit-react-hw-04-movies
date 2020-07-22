import React, { Component, lazy, Suspense } from 'react';
import * as movieApi from '../../services/movieApi';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import styles from './SearchMovie.module.css';

const AsyncSearchbar = lazy(() =>
  import('../Searchbar/Searchbar' /*webpackChunkName: "searchbar" */),
);

class SearchMovie extends Component {
  static propTypes = {};
  state = {
    movies: [],
    page: '',
    error: null,
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search).get('query');
    if (!query) {
      return;
    }

    movieApi
      .searchMovies(query)
      .then(movies =>
        this.setState({
          movies: movies,
        }),
      )
      .catch(error => this.setState({ error }));
  }

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = new URLSearchParams(prevProps.location.search).get(
      'query',
    );
    const nextQuery = new URLSearchParams(this.props.location.search).get(
      'query',
    );

    if (prevQuery === nextQuery) {
      return;
    }

    movieApi
      .searchMovies(nextQuery)
      .then(movies =>
        this.setState({
          movies: movies,
        }),
      )
      .catch(error => this.setState({ error }));
  }

  setSearchQuery = searchQuery => {
    if (!searchQuery) {
      return;
    }
    this.props.history.push({
      ...this.props.location,
      search: `query=${searchQuery}`,
    });
  };

  render() {
    return (
      <div>
        <Suspense
          fallback={
            <Loader
              style={{ textAlign: 'center' }}
              type="Circles"
              color="rgb(0, 0, 255)"
              height={100}
              width={100}
              timeout={200}
            />
          }
        >
          <AsyncSearchbar onSearch={this.setSearchQuery} />
        </Suspense>
        <ul>
          {this.state.movies.map(movie => (
            <li className={styles.ListItem} key={movie.id}>
              <NavLink
                className={styles.Link}
                to={{ pathname: `/movies/${movie.id}` }}
                activeClassName={styles.ActiveLink}
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

SearchMovie.propTypes = {
  movies: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
  searchQuery: PropTypes.string,
};

export default SearchMovie;
