import React, { useState } from 'react';
import './AddBookPage.css';  

const AddBookPage = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    image: '',
    description: '',
    rating: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
     
    fetch('/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('Book added successfully!');
      setBook({
        title: '',
        author: '',
        image: '',
        description: '',
        rating: ''
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Failed to add book. Please try again.');
    });
  };

  const handleFetchBookDetails = async () => {
     
    const searchTerm = 'the lord of the rings';
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${searchTerm}`);
      const data = await response.json();
      
      if (data.docs && data.docs.length > 0) {
        const bookDetails = data.docs[0];  
        setBook({
          title: bookDetails.title || '',
          author: (bookDetails.author_name && bookDetails.author_name.join(', ')) || '',
          image: bookDetails.cover_i ? `https://covers.openlibrary.org/b/id/${bookDetails.cover_i}-L.jpg` : '',
          description: bookDetails.first_sentence ? bookDetails.first_sentence.join(' ') : '',
          rating: '' 
        });
      } else {
        alert('No book details found.');
      }
    } catch (error) {
      console.error('Error fetching book details:', error);
      alert('Failed to fetch book details.');
    }
  };

  return (
    <div className="add-book-page">
      <h1>Add a New Book</h1>
      <button type="button" onClick={handleFetchBookDetails}>Fetch Book Details</button>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={book.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={book.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={book.rating}
            onChange={handleChange}
            min="1"
            max="5"
            required
          />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;
