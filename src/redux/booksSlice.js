import { createSlice } from '@reduxjs/toolkit';

const booksSlice = createSlice({
  name: 'books',
  initialState: [
     
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', description: 'A classic novel.', rating: 4.5, category: 'Fiction' },
    { id: 2, title: '1984', author: 'George Orwell', description: 'Dystopian fiction.', rating: 4.8, category: 'Sci-Fi' },
  ],
  reducers: {
    addBook: (state, action) => {
      state.push({ id: Date.now(), ...action.payload });
    },
  },
});

export const { addBook } = booksSlice.actions;
export default booksSlice.reducer;
