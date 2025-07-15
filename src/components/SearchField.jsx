import { useState } from "react";
import styles from "./SearchField.module.css";
import { FaSearch } from "react-icons/fa";

function SearchField({ onSetCity }) {
  const [currCity, setCurrCity] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (currCity.trim()) {
      onSetCity(currCity);
      setCurrCity("");
    }
  }

  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city name..."
        value={currCity}
        onChange={(e) => setCurrCity(e.target.value)}
        required
        autoFocus
      />
      <button type="submit" className={styles.button}>
        <FaSearch className={styles.fa} />
      </button>
    </form>
  );
}

export default SearchField;
