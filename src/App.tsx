import { RxHamburgerMenu } from "react-icons/rx";
import Banner from "./assets/book.jpg";
import { useEffect, useState } from "react";
import BookCard from "./components/BookCard";
import BookDetail from "./components/BookDetail";
import Pagination from "./components/Pagination";
import { fetchBooks } from "./services/bookService";
import { getImageUrl, filterBooks } from "./utils/bookUtils";
import Spinner from "./components/Spinner";

interface Book {
  id: number;
  title: string;
  image: string;
  author: string;
  description: string;
  publishedDate: string;
}



const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("programming")
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const  [loading, setLoading] = useState(false);


  // Fetch api data on mount
  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
        try {
            const bookData = await fetchBooks(searchQuery || selectedCategory);
            if (bookData.length > 0) {
              setLoading(false)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const formattedBooks = bookData.map((item: any) => ({
                    id: item.id,
                    title: item.volumeInfo?.title || "No Title",
                    image: getImageUrl(item),
                    author: item.volumeInfo?.authors?.join(", ") || "Unknown Author",
                    description: item.volumeInfo?.description || "No description available",
                    publishedDate: item.volumeInfo?.publishedDate || "Unknown Date",
                }));

                setBooks(formattedBooks);
               setFilteredBooks(formattedBooks);
            } else {
              setBooks([]);
              setFilteredBooks([]);
                console.warn("No books found.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    loadBooks();
}, [searchQuery, selectedCategory]);

  // Update filtered books when search query changes
  useEffect(() => {
    setFilteredBooks(filterBooks(books, searchQuery));
    setCurrentPage(1); 
  }, [searchQuery, books]);


  // Book categories state
  const [categories] = useState<string[]>([
    "Fiction",
    "Science",
    "History",
    "Technology",
  ]);

  useEffect(() => {
    console.log(books)
  }, [books])


  const booksPerPage = 10; // Now displaying 10 books per page

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <>
      <div className="max-w-full min-h-screen overflow-hidden">
        {/* Navigation with search bar */}
        <div>
          <div className="flex items-center justify-between px-2 md:px-14 py-6 w-full border-b-2 border-gray-100">
            {/* Logo */}
            <span className=" hidden md:flex font-poppins font-bold tracking-tighter md:text-xl">
              DrugStoc Library
            </span>
            {/* Search Bar */}
            <div className="flex space-x-3">
              <input
                type="text"
                className="md:w-[500px] w-[230px] h-11 rounded-2xl border px-3 font-poppins tracking-tight text-sm border-[#5AAEFF]"
                placeholder="Search book title, author, publication date..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={() => console.log("Searching for:", searchQuery)}  className="bg-[#5AAEFF] cursor-pointer text-white md:px-8 md:py-2 px-4 py-1 text-[14px] font-poppins tracking-tight rounded-2xl font-sm">
                Search
              </button>
            </div>
            {/* Hamburger Menu */}
            <div className="hidden md:flex  p-3 bg-white/10 backdrop-blur-md rounded-xl shadow-md cursor-pointer">
              <RxHamburgerMenu className="text-[#5AAEFF]" size={24} />
            </div>
          </div>
        </div>

        {/* Hero and Book section */}
        <div className="flex flex-col py-3 w-full">
          <img src={Banner} alt="Library Banner" />
          <div className="md:px-14 px-3">
            {/* Trending categories */}
            <div className="flex flex-col gap-4 mt-6">
              <h2 className="font-poppins tracking-tight font-bold text-xl">
                Latest Books
              </h2>
              <div className="flex md:gap-3 gap-1">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <button onClick={() => setSelectedCategory(category)} className={` cursor-pointerfont-poppins tracking-tight md:text-lg text-sm px-4 py-2 rounded-full 
        ${selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
        >{category}</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
         {loading && (
             <Spinner/>
         )}
          </div>

      {/* Book Grid */}
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 px-3 md:px-14 mt-6">
  {currentBooks.map((book) => (
    <BookCard
      key={book.id}
      image={book.image}
      onClick={() => setSelectedBook(book)}
    />
  ))}
</div>

          {/* Pagination */}
          {filteredBooks.length > booksPerPage && (
            <Pagination
              totalItems={books.length}
              itemsPerPage={booksPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}

          {/* Book Details Popup */}
          {selectedBook && (
            <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} />
          )}
        </div>
      </div>
    </>
  );
};

export default App;
