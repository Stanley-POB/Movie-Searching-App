import React, { useState } from "react";
import styles from "../styles/SearchBox.module.css";

const SearchBox = ({ handleSearch }) => {
  const [textInput, setTextInput] = useState("");

  const handleChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleClick = () => {
    console.log("recherche au clic", textInput);
    handleSearch(textInput);
    setTextInput("");
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search for a movie..."
        onChange={handleChange}
        value={textInput}
        className={styles.searchBar}
      />
      <button
        type="submit"
        className={styles.searchButton}
        onClick={handleClick}
      >
        Search
      </button>
    </div>
  );
};
export default SearchBox;
