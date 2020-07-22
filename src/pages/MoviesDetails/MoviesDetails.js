import React, { Component, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import * as movieApi from '../../services/movieApi';
import { Switch, Route, NavLink } from 'react-router-dom';
import routers from '../../services/router';
import Loader from 'react-loader-spinner';
import styles from './MoviesDetails.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const AsyncCredits = lazy(() =>
  import(
    '../../components/MovieCredits/MovieCredits' /* webpackChunkName: "credits-page" */
  ),
);

const AsyncReviews = lazy(() =>
  import(
    '../../components/MovieReviews/MovieReviews' /* webpackChunkName: "reviews-page" */
  ),
);

class MoviesDetails extends Component {
  static defaultProps = {};
  static propTypes = {};
  state = {
    movie: {
      genres: [],
    },
    error: null,
  };

  componentDidMount() {
    movieApi
      .getMovieDetails(this.props.match.params.movieId)
      .then(movie => {
        this.setState({
          movie: movie,
        });
      })
      .catch(error => this.setState({ error }));
  }

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    const {
      id,
      title,
      poster_path,
      vote_average,
      overview,
      release_date,
      genres,
    } = this.state.movie;

    let releaseYear = '';

    if (!!release_date) {
      releaseYear = release_date.substring(0, 4);
    }

    return (
      <div>
        <button className={styles.BackBtn} type="button" onClick={this.goBack}>
          Go back
        </button>
        <h1 className={styles.TitleAbout}>About the movie</h1>
        <section className={styles.About}>
          {!!poster_path && (
            <img
              className={styles.Img}
              src={movieApi.posterimgpath + poster_path}
              alt={title}
            />
          )}
          <section>
            <h1>
              {title} ({releaseYear})
            </h1>
            <p>
              <span className={styles.Bold}>User score:</span> {vote_average}%
            </p>
            <p className={styles.Bold}>Overview</p>
            <p>{overview}</p>
            <p className={styles.Bold}>Genres</p>
            <ul className={styles.List}>
              {genres.map(genre => (
                <li className={styles.ListItem} key={genre.id}>
                  {genre.name}
                </li>
              ))}
            </ul>
          </section>
        </section>
        <section className={styles.AddInfoSection}>
          <p className={styles.AddInfo}>Additional information</p>
          <NavLink
            className={styles.LinkInfo}
            to={{ pathname: `/movies/${id}/credits` }}
            activeClassName={styles.ActiveLink}
          >
            Cast
          </NavLink>
          <NavLink
            className={styles.LinkInfo}
            to={{ pathname: `/movies/${id}/reviews` }}
            activeClassName={styles.ActiveLink}
          >
            Reviews
          </NavLink>
        </section>
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
          <Switch>
            <Route
              path={`${this.props.match.path}${routers.MOVIE_CREDITS}`}
              component={AsyncCredits}
            />
            <Route
              path={`${this.props.match.path}${routers.MOVIE_REVIEWS}`}
              component={AsyncReviews}
            />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

MoviesDetails.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number.isRequired,
    overview: PropTypes.string,
    release_date: PropTypes.string,
    genres: PropTypes.arrayOf({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
};

export default MoviesDetails;
