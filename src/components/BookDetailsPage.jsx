import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BookDetailsPage.css';


const BookDetailsPage = () => {
  const { id } = useParams();  // Get the ID from the URL
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Fetch book details using the ID
    fetch(`/books.json`) // Assuming you're fetching from a JSON file. Replace with API call if needed.
      .then(response => response.json())
      .then(data => {
        // Find the book with the matching ID
        const selectedBook = data.find((book) => book.id === parseInt(id));
        setBook(selectedBook);
      })
      .catch(error => console.error('Error fetching book details:', error));
  }, [id]);

  if (!book) {
    return <p>Loading book details...</p>;
  }

  return (
    <div className="book-details-page">
      <h1>{book.title}</h1>
      <img src={book.image} alt={book.title} />
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Rating:</strong> {book.rating}</p>
    </div>
  );
};

export default BookDetailsPage;
