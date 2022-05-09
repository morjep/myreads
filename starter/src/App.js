import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import Search from "./Search";
import Shelf from "./Shelf";

import * as booksAPI from "./BooksAPI";

function App() {
  /* Use the useState hook to create a state variable called
  books and a function called setBooks. */
  const [books, setBooks] = useState([]);

  /* Use the useEffect hook to fetch the books from the booksAPI. */
  useEffect(() => {
    const getBooks = async () => {
      const res = await booksAPI.getAll();
      setBooks(res);
    };

    getBooks();
  }, []);

  console.log(books);

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
                  <Shelf
                    shelfTitle={"Currently Reading"}
                    books={books.filter((b) => b.shelf === "currentlyReading")}
                  />
                  <Shelf
                    shelfTitle={"Want To Read"}
                    books={books.filter((b) => b.shelf === "wantToRead")}
                  />
                  <Shelf shelfTitle={"Read"} books={books.filter((b) => b.shelf === "read")} />
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
