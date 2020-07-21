import React, { Component } from "react";
import * as movieApi from "../../services/movieApi";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

class HomePage extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = { trending: [] };

  componentDidMount() {
    movieApi.getTrending().then(movies => {
      this.setState({ trending: movies });
    });
  }

  render() {
    const { trending } = this.state;
    return (
      <div>
        <h1 className={styles.Title}>Trending movies</h1>
        <ul className={styles.List}>
          {trending.map(movie => (
            <li className={styles.ListItem} key={movie.id}>
              <Link
                className={styles.ListItem}
                to={{ pathname: `/movies/${movie.id}` }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default HomePage;
