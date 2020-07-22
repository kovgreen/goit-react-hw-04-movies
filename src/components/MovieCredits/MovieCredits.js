import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as movieApi from '../../services/movieApi';
import styles from './MovieCredits.module.css';

class MovieCredits extends Component {
  static defaultProps = {};
  static propTypes = {};

  state = {
    credits: { crew: [], cast: [] },
    error: null,
  };

  componentDidMount() {
    movieApi
      .getMovieCredits(this.props.match.params.movieId)
      .then(credit =>
        this.setState({
          credits: credit,
        }),
      )
      .catch(error => this.setState({ error }));
  }

  render() {
    const { credits } = this.state;

    return (
      <div>
        <h2 className={styles.Subtitle}>Cast</h2>
        {!!credits.length ? (
          <p>We dont have any cast for this movie</p>
        ) : (
          <>
            <ul className={styles.List}>
              {credits &&
                credits.cast &&
                credits.cast.map(member => (
                  <li className={styles.ListItem} key={member.credit_id}>
                    {member.profile_path && (
                      <img
                        className={styles.Img}
                        src={movieApi.imgpath + member.profile_path}
                        alt={member.name}
                      />
                    )}
                    <p className={styles.Name}>{member.name}</p>
                    <p className={styles.Character}>{member.character}</p>
                  </li>
                ))}
            </ul>
            <h2 className={styles.Subtitle}>Crew</h2>
            <ul className={styles.List}>
              {credits &&
                credits.crew &&
                credits.crew.map(member => (
                  <li className={styles.ListItem} key={member.credit_id}>
                    {member.profile_path && (
                      <img
                        className={styles.Img}
                        src={movieApi.imgpath + member.profile_path}
                        alt={member.name}
                      />
                    )}
                    <p className={styles.Name}>{member.name}</p>
                    <p className={styles.Character}> {member.job}</p>
                  </li>
                ))}
            </ul>
          </>
        )}
      </div>
    );
  }
}

MovieCredits.propTypes = {
  credits: PropTypes.shape({
    cast: PropTypes.arrayOf({
      credit_id: PropTypes.string.isRequired,
      profile_path: PropTypes.string,
      name: PropTypes.string.isRequired,
      job: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
    }),
    crew: PropTypes.arrayOf({
      credit_id: PropTypes.string.isRequired,
      profile_path: PropTypes.string,
      name: PropTypes.string.isRequired,
      job: PropTypes.string.isRequired,
    }),
  }),
};
export default MovieCredits;
