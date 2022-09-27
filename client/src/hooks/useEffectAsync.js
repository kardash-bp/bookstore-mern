import React, { useEffect } from 'react'

export function useEffectAsync(effect, inputs = []) {
  useEffect(() => {
    effect()
  }, inputs)
}

/*

const [books, setBooks] = useState([]);

useEffectAsync(async () => {
  try {
    const books = await fetchBooks();
    setBooks(books);
  } catch (err) {
    console.log('Error occurred when fetching books');
  }
});
*/
