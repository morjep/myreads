import "./App.css";
import Book from "./Book";

const Shelf = ({ shelfTitle, changeShelf, books, shelves }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle} </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
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
  );
};
export default Shelf;
