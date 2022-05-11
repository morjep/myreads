import "./App.css";

const Book = ({ shelfId, changeShelf, book, shelves }) => {
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
          <select value={shelfId} onChange={(e) => handleChange(book, e)}>
            <option value="none" disabled>
              Move to...
            </option>
            {shelves.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}

            <option value="Remove">Remove</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors}</div>
    </div>
  );
};
export default Book;
