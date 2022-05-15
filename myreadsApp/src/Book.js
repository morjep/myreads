import "./App.css";

const Book = ({ changeShelf, book, shelves }) => {
  /**
   * The handleChange function takes in a book and an event as parameters. It then
   * sets the shelf variable to the value of the event target. It then calls the
   * changeShelf function, passing in the book and shelf variables as parameters
   * @param book - the book object
   * @param e - the event object
   */
  const handleChange = (book, e) => {
    const shelf = e.target.value;
    changeShelf(book, shelf);
  };

  return (
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
          <select value={book.shelf} onChange={(e) => handleChange(book, e)}>
            <option value="none" disabled>
              Move to...
            </option>
            {shelves.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}

            <option value="noshelf">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors}</div>
    </div>
  );
};
export default Book;
