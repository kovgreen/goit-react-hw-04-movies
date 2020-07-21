import React, { Component, lazy, Suspense } from "react";
import * as movieApi from "../../services/movieApi";
import { Switch, Route, Link } from "react-router-dom";
import Loader from "react-loader-spinner";
// import MovieCredits from "../../components/MovieCredits/MovieCredits";
// import MovieReviews from "../../components/MovieReviews/MovieReviews";
import styles from "./MoviesDetails.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const AsyncCredits = lazy(() =>
  import(
    "../../components/MovieCredits/MovieCredits" /* webpackChunkName: "credits-page" */
  )
);

const AsyncReviews = lazy(() =>
  import(
    "../../components/MovieReviews/MovieReviews" /* webpackChunkName: "reviews-page" */
  )
);

class MoviesDetails extends Component {
  static defaultProps = {};
  static propTypes = {};
  state = {
    movie: {
      genres: []
    }
  };

  componentDidMount() {
    movieApi
      .getMovieDetails(this.props.match.params.movieId)
      .then(movie => {
        this.setState({
          movie: movie
        });
      })
      .catch(error => {
        this.setState({ error });
      });
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
      genres
    } = this.state.movie;

    let releaseYear = "";

    if (!!release_date) {
      releaseYear = release_date.substring(0, 4);
    }

    return (
      <div>
        <button className={styles.BackBtn} type="button" onClick={this.goBack}>
          Go back
        </button>
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
            <p>User score: {vote_average}</p>
            <p className={styles.Bold}>Overview</p>
            <p>{overview}</p>
            <p className={styles.Bold}>Genres</p>
            <ul>
              {genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </section>
        </section>
        <section className={styles.AddInfoSection}>
          <p className={styles.Bold}>Additional information</p>
          <Suspense></Suspense>
          <Link
            className={styles.addInfo}
            to={{ pathname: `/movies/${id}/credits` }}
          >
            Credits
          </Link>
          <Link
            className={styles.addInfo}
            to={{ pathname: `/movies/${id}/reviews` }}
          >
            Reviews
          </Link>
        </section>
        <Suspense
          fallback={
            <Loader
              style={{ textAlign: "center" }}
              type="Circles"
              color="rgb(0, 0, 255)"
              height={100}
              width={100}
              timeout={3000}
            />
          }
        >
          <Switch>
            <Route path="/movies/:movieId/credits" component={AsyncCredits} />
            <Route path="/movies/:movieId/reviews" component={AsyncReviews} />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

export default MoviesDetails;
