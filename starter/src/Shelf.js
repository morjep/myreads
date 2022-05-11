import "./App.css";

const Shelf = ({ shelfId, shelfTitle, changeShelf, books, shelves }) => {
  // console.log(books);

  const handleChange = (book, e) => {
    const shelf = e.target.value;
    changeShelf(book, shelf);
  };

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle} </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 160,
                      height: 200,
                      backgroundImage: 'url("' + book.imageLinks.thumbnail + '")',
                    }}
                  ></div>
                  <div className="book-shelf-changer">
                    <select value={shelfId} onChange={(e) => handleChange(book, e)}>
                      <option value="none" disabled>
                        Move to...
                      </option>
                      {shelves.map((s) => (
                        <option value={s.id}>{s.name}</option>
                      ))}

                      <option value="Remove">Remove</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
export default Shelf;
