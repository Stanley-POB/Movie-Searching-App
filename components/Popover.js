import React from "react";
import styles from "../styles/Popover.module.css";
import Movie from "./Movie";
import { useSelector } from "react-redux";

function Popover(props) {
  const movies = useSelector((state) => state.movies.value);
  const movie = movies.map((data) => {
    return (
      <Movie
        title={data.title}
        poster={data.poster}
        voteAverage={data.voteAverage}
        voteCount={data.voteCount}
        overview={data.overview}
      />
    );
  });
  return (
    <div className={styles.container}>
      <div className={styles.closeButton}>
        <button>X</button>
      </div>
      {movie}
    </div>
  );
}

export default Popover;
