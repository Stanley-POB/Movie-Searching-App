import React from "react";
import styles from "../styles/Movie.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faVideo } from "@fortawesome/free-solid-svg-icons";
// Import react
import { useState } from "react";
// Import balise de la librairie antd
import { Button } from "antd";

export default function Movie(props) {
  // Etat pour mettre à jour la note perso
  const [personalNote, setPersonalNote] = useState(0);
  // Etat pour mettre à jour le nombre de vote une fois la note perso choisie
  const [updateVoteCount, setUpdateVoteCount] = useState(props.voteCount);

  // Average evaluation
  const stars = [];
  for (let i = 0; i < 5; i++) {
    let style = {};
    if (i < props.voteAverage - 1) {
      style = { color: "#f1c40f" };
    }
    stars.push(<FontAwesomeIcon key={i} icon={faStar} style={style} />);
  }

  // Like movie
  const handleLikeMovie = () => {
    props.updateLikedMovies(props.title);
  };
  let heartIconStyle = { cursor: "pointer" };
  if (props.isLiked) {
    heartIconStyle = { color: "#e74c3c", cursor: "pointer" };
  }

  // Popover click
  const handleClickPopover = () => {
    props.handlePopoverInfo(props);
    console.log("it works");
  };

  // Personal note
  const personalStars = [];
  for (let i = 0; i < 5; i++) {
    let style = { cursor: "pointer" };
    if (i < personalNote) {
      style = { color: "#2196f3", cursor: "pointer" };
    }
    personalStars.push(
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        onClick={() => {
          setPersonalNote(i + 1);
          setUpdateVoteCount(props.voteCount + 1);
        }}
        style={style}
        className="note"
      />
    );
  }
  return (
    <div className={styles.container}>
      <Image
        src={props.poster}
        alt="image"
        width={200}
        height={250}
        className={styles.poster}
      />
      <div>
        <div className={styles.infoContainer}>
          <span>
            {stars}({updateVoteCount})
          </span>
          <span className={styles.movieTitle}>{props.title}</span>
          <p>{props.overview}</p>
        </div>
        <div className={styles.infoButton}>
          <Button
            onClick={() => {
              handleClickPopover();
            }}
          >
            More Info
          </Button>
        </div>
        <div>
          <div className={styles.personalNoteContainer}>
            <span>
              {personalStars}({personalNote})
            </span>
            <span>
              <FontAwesomeIcon
                icon={faHeart}
                onClick={() => {
                  handleLikeMovie();
                }}
                style={heartIconStyle}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
