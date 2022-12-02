import React from "react";
// Import style
import styles from "../styles/Home.module.css";
// Import Composants
import Movie from "./Movie";
import SearchBox from "./SearchBox";
import Popover from "./Popover";
// Import react
import { useEffect, useState } from "react";
// Import redux
import { useDispatch } from "react-redux";
import { addMovieToStore } from "../reducers/Movies";
// Import clef API movie database
import { OWN_API_KEY } from "../environmentVar";
// Import image par défault IMDB
import IMDB from "../public/imdb.jpg";
// Stockage des adresses http
const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
const API_MOVIE_DB = "https://api.themoviedb.org/3/discover/movie?api_key=";
const API_SEARCH_DB = "https://api.themoviedb.org/3/search/movie";

export default function Home() {
  // déclaration dispatch pour store redux
  const dispatch = useDispatch();
  // Etat pour stocker le data reçu du fetch
  const [moviesData, setMoviesData] = useState([]);
  // Etat pour le like sur un movie
  const [likedMovies, setLikedMovies] = useState([]);
  // Etat pour faire apparaître le popover
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverInfo, setPopoverInfo] = useState([]);

  // useEffect d'initialisation pour afficher les films à l'arrivée sur la page
  useEffect(() => {
    fetch(`${API_MOVIE_DB}${OWN_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        const moviesData = data.results.map((data) => {
          const title = data.title;
          const poster =
            data.poster_path === null
              ? IMDB
              : `${IMAGE_PATH}/${data.poster_path}`;
          const voteAverage = data.vote_average;
          const voteCount = data.vote_count;
          const overview = data.overview.substring(0, 150) + "...";

          return { title, poster, voteAverage, voteCount, overview };
        });
        setMoviesData(moviesData);
      });
  }, []);

  const handleSearch = (movies) => {
    fetch(`${API_SEARCH_DB}?api_key=${OWN_API_KEY}&query=${movies}`)
      .then((response) => response.json())
      .then((data) => {
        const moviesData = data.results.map((data) => {
          const title = data.title;
          const poster =
            data.poster_path === null
              ? IMDB
              : `${IMAGE_PATH}/${data.poster_path}`;
          const voteAverage = data.vote_average;
          const voteCount = data.vote_count;
          const overview = data.overview.substring(0, 150) + "...";
          return { title, poster, voteAverage, voteCount, overview };
        });
        setMoviesData(moviesData);
      });
  };

  // Liked movies (inverse data flow)
  const updateLikedMovies = (movieTitle) => {
    if (likedMovies.find((movie) => movie === movieTitle)) {
      setLikedMovies(likedMovies.filter((movie) => movie !== movieTitle));
    } else {
      setLikedMovies([...likedMovies, movieTitle]);
    }
  };

  // Passe le popoverInfo à true
  const handlePopoverInfo = (movieInfo) => {
    if (popoverInfo.find((movie) => movie === movieInfo)) {
      setPopoverInfo(popoverInfo.filter((movie) => movie !== movieInfo));
    } else {
      setPopoverInfo([...popoverInfo, movieInfo]);
    }
    setPopoverVisible(true);
    dispatch(addMovieToStore(movieInfo));
  };

  const movies = moviesData.map((data, i) => {
    const isLiked = likedMovies.some((movie) => movie === data.title);
    return (
      <Movie
        key={i}
        title={data.title}
        poster={data.poster}
        voteAverage={data.voteAverage}
        voteCount={data.voteCount}
        overview={data.overview}
        updateLikedMovies={updateLikedMovies}
        isLiked={isLiked}
        handlePopoverInfo={handlePopoverInfo}
      />
    );
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h1>NetFleet</h1>
          <span>The movie database you need!</span>
        </div>
        <SearchBox handleSearch={handleSearch} />
      </header>
      <div className={styles.popover}>{popoverVisible && <Popover />}</div>
      <main className={styles.main}>
        <div className={styles.movieContainer}>{movies}</div>
      </main>
      <footer className={styles.footer}>
        <span>About</span>
        <span>Contact</span>
        <span>Careers</span>
      </footer>
    </div>
  );
}
