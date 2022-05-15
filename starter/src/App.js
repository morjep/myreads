import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Search from "./Search";
import Shelf from "./Shelf";

import * as booksAPI from "./BooksAPI";

function App() {
  /* Use the useState hook to create a state variable called
  books and a function called setBooks. */
  const [books, setBooks] = useState([]);

  const shelves = [
    { id: "currentlyReading", name: "Currently Reading" },
    { id: "wantToRead", name: "Want To Read" },
    { id: "read", name: "Read" },
  ];

  /**
   * GetBooks is an async function that calls the getAll method from the booksAPI
   * object, and then sets the state of the books array to the response from the
   * getAll method.
   */
  const getBooks = async () => {
    const res = await booksAPI.getAll();
    setBooks(res);
  };

  /**
   * If the book is already in the shelf, change the shelf. If the book is not in
   * the shelf, add it to the shelf
   * @param book - The book object that is being moved
   * @param shelf - The shelf to move the book to.
   */
  const changeShelf = (book, shelf) => {
    booksAPI.update(book, shelf);

    let tmpBook = books.filter((b) => b.id === book.id);

    if (Array.isArray(tmpBook) && tmpBook.length) {
      console.log("Existing book - change shelf");
      tmpBook[0].shelf = shelf;
    }

    if (Array.isArray(tmpBook) && !tmpBook.length) {
      console.log("New book - add to shelf");
      tmpBook = { ...book, shelf: shelf };
    }

    setBooks(
      [].concat(
        books.filter((b) => b.id !== book.id),
        tmpBook
      )
    );
    // getBooks();
  };

  /* Use the useEffect hook to fetch the books from the booksAPI. */
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <Routes>
      <Route
        path="/search"
        element={
          <Search
            changeShelf={(book, shelf) => changeShelf(book, shelf)}
            books={books}
            shelves={shelves}
          />
        }
      />
      <Route
        exact
        path="/"
        element={
          <div className="app">
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {shelves.map((s) => (
                    <Shelf
                      key={s.id}
                      shelfTitle={s.name}
                      changeShelf={(book, shelf) => changeShelf(book, shelf)}
                      books={books.filter((b) => b.shelf === s.id)}
                      shelves={shelves}
                    />
                  ))}
                </div>
              </div>
              <Link to="/search" className="open-search">
                Add a book
              </Link>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
