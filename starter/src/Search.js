import "./App.css";
import { Link } from "react-router-dom";
import * as booksAPI from "./BooksAPI";
import Book from "./Book";

const Search = () => {
  const handleChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="app">
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              onInput={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    </div>
  );
};

export default Search;
