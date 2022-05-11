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

  const changeShelf = (book, shelf) => {
    let tmpBook = books.filter((b) => b.id === book.id);
    tmpBook[0].shelf = shelf;
    setBooks(
      [].concat(
        books.filter((b) => b.id !== book.id),
        tmpBook
      )
    );
  };

  /* Use the useEffect hook to fetch the books from the booksAPI. */
  useEffect(() => {
    const getBooks = async () => {
      const res = await booksAPI.getAll();
      setBooks(res);
    };

    getBooks();
  }, []);

  // console.log(books);

  return (
    <Routes>
      <Route path="/search" element={<Search />} />
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
                      shelfId={s.id}
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
