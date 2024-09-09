import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [popularBooks, setPopularBooks] = useState([]);

  useEffect(() => {
     
    fetch('/books.json')
      .then((response) => response.json())
      .then((data) => {
         
        setPopularBooks(data.slice(0, 5)); 
      })
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  return (
    <div className="home-page">
    <header className="header">
      <h1>Welcome to the Online Library</h1>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/browse-books">Browse Books</Link>
        <Link to="/add-book">Add Book</Link>
      </nav>
    </header>
    <main>
      <section className="popular-books">
        <h2>Popular Books</h2>
        <div className="book-list">
          {popularBooks.length > 0 ? (
            popularBooks.map((book) => (
              <div key={book.id} className="book-item">
                <img src={book.image} alt={book.title} className="book-image" />
                <div className="book-details">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">by {book.author}</p>
                  <Link to={`/books/${book.id}`} className="view-details">View Details</Link>
                </div>
              </div>
            ))
          ) : (
            <p>No popular books available.</p>
          )}
        </div>
      </section>
    </main>
  </div>
  
  );
};

export default HomePage;
