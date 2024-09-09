import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './BrowseBooksPage.css';

const BrowseBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    fetch('/books.json')
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  const handleSearchChange = (e) => setSearch(e.target.value.toLowerCase());

  const filteredBooks = books.filter((book) => {
    const matchesCategory = category === 'all' || book.category === category;
    const matchesSearch = book.title.toLowerCase().includes(search) || book.author.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="browse-books">
      <header className="header">
        <h1>Browse Books</h1>
      </header>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title or author"
          value={search}
          onChange={handleSearchChange}
        />
        <button onClick={() => { /* Add search functionality */ }}>
          Search
        </button>
      </div>
      <div className="book-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="book-item">
              <img src={book.image} alt={book.title} className="book-image" />
              <div className="book-details">
                <h2 className="book-title">{book.title}</h2>
                <p className="book-author">by {book.author}</p>
                <Link to={`/books/${book.id}`} className="view-details">View Details</Link>
              </div>
            </div>
          ))
        ) : (
          <p>No books available.</p>
        )}
      </div>
    </div>
  );
};

export default BrowseBooksPage;
