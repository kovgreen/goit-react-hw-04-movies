import React, { Component } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import MoviesDetails from "../../pages/MoviesDetails/MoviesDetails";
import SearchMovie from "../SearchMovie";
import styles from "./App.module.css";

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <ul className={styles.Nav}>
          <li>
            <Link className={styles.LinkNav} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={styles.LinkNav} to="/movies">
              Movie
            </Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/movies/:movieId" component={MoviesDetails} />
          <Route path="/movies" component={SearchMovie} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
