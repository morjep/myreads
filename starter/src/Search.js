import "./App.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as booksAPI from "./BooksAPI";
import Book from "./Book";

const Search = ({ changeShelf, books, shelves }) => {
  const [searchResult, setSearchResult] = useState([]);

  /**
   * It takes two parameters, an array of books and a book, and returns the book
   * with the shelf property set to the shelf property of the book in the array of
   * books that has the same id as the book
   * @param books - the books that are already on the shelf
   * @param b - the book that is being searched for
   */
  const isMatchChangeShelf = (books, b) => {
    books.map((book) => {
      if (book.id === b.id) {
        b.shelf = book.shelf;
      }
      return b;
    });
  };

  /**
   * It takes a search term, makes a call to the API, and then updates the state of
   * the search results
   * @param term - the search term
   */
  const searchBooks = async (term) => {
    const res = await booksAPI.search(term);
    const extendedRes = Array.isArray(res) && res.map((b) => ({ ...b, shelf: "noshelf" }));
    Array.isArray(res) && extendedRes.map((b) => isMatchChangeShelf(books, b));
    Array.isArray(res) && setSearchResult(extendedRes);

    !Array.isArray(res) && setSearchResult([]);
  };

  /**
   * If the search term is empty, then set the search result to an empty array. If
   * the search term is not empty, then search for books
   * @param e - The event object
   */
  const handleChange = (e) => {
    const searchTerm = e.target.value;

    !searchTerm && console.log("Empty Search term");
    !searchTerm && setSearchResult([]);

    searchTerm && searchBooks(searchTerm);
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
          <ol className="books-grid">
            {Array.isArray(searchResult) &&
              searchResult.map((book) => (
                <li key={book.id}>
                  <Book
                    changeShelf={(book, shelf) => changeShelf(book, shelf)}
                    book={book}
                    shelves={shelves}
                  />
                </li>
              ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Search;
