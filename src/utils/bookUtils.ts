// Function to  make the book image clearer
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getImageUrl = (book: any) => {
    const bookId = book.id;
    if (!bookId) return "https://via.placeholder.com/300x450";
    
    return `https://books.google.com/books/publisher/content/images/frontcover/${bookId}?fife=w500-h700`;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const filterBooks = (books: any[], query: string) => {
    if(!query) return books; //This will return all books if no query
    
    const lowerCaseQuery = query.toLowerCase();

    return books.filter((book) => {
      const title = book.title?.toLowerCase() || "";
      const author = book.author?.toLowerCase() || "";
      const description = book.description?.toLowerCase() || "";

      return title.includes(lowerCaseQuery) || author.includes(lowerCaseQuery) || description.includes(lowerCaseQuery)
    });
  };


  export const truncateText = (text: string, limit: number): string => {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
};
