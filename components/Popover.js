import React from "react";
import styles from "../styles/Popover.module.css";
import Movie from "./Movie";
import { useSelector } from "react-redux";

function Popover() {
  const movies = useSelector((state) => state.movies.value);
  console.log("store selector:", movies);
  const movie = movies.map((data, i) => {
    console.log(data);
    return (
      <Movie
        key={0}
        title={data.title}
        poster={data.poster}
        voteAverage={data.voteAverage}
        voteCount={data.voteCount}
        overview={data.overview}
      />
    );
  });
  return <div className={styles.container}>{movie}</div>;
}

export default Popover;
