import React from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import routers from '../../services/router';
import HomePage from '../../pages/HomePage/HomePage';
import MoviesDetails from '../../pages/MoviesDetails/MoviesDetails';
import SearchMovie from '../SearchMovie/SearchMovie';
import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.App}>
      <ul className={styles.Nav}>
        <li>
          <NavLink
            exact
            className={styles.LinkNav}
            activeClassName={styles.ActiveLink}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={styles.LinkNav}
            activeClassName={styles.ActiveLink}
            to="/movies"
          >
            Movie
          </NavLink>
        </li>
      </ul>
      <Switch>
        <Route exact path={routers.HOME} component={HomePage} />
        <Route path={routers.MOVIE_DETAILS} component={MoviesDetails} />
        <Route exact path={routers.MOVIES} component={SearchMovie} />
        <Redirect to={routers.HOME} />
      </Switch>
    </div>
  );
};

export default App;
