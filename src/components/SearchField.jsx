import styles from "./SearchField.module.css";
import { FaSearch } from "react-icons/fa";

function SearchField() {
  return (
    <div className={styles.searchContainer}>
      <input type="text" placeholder="Enter city name" />
      <button >
        <FaSearch />
      </button>
    </div>
  );
}

export default SearchField;
