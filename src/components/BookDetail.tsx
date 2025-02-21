import React from 'react';
import { truncateText } from '../utils/bookUtils';
import { IoClose } from 'react-icons/io5';

interface BookDetailsProps {
    book: {
        image: string;
        title: string;
        author: string;
        description: string;
        publishedDate: string;
    };
    onClose: () => void;
}

const BookDetail: React.FC<BookDetailsProps> = ({ book, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg md:w-[70vw] md:h-[70vh] w-full h-auto flex flex-col md:flex-row md:space-x-10 relative max-w-[500px] md:max-w-none">
                {/* Image Container */}
                <div className="w-full md:w-[40%] flex justify-center">
                    <img src={book.image} alt={book.title} className="w-full h-auto max-h-[300px] md:max-h-none object-cover rounded-md" />
                </div>

                {/* Text Content */}
                <div className="w-full md:w-[60%] flex flex-col">
                    <h2 className="text-2xl md:text-4xl tracking-tight font-bold font-poppins text-center md:text-left">{book.title}</h2>
                    <p className="text-gray-500 font-poppins tracking-tight text-md text-center md:text-left">by {book.author}</p>

                    {/* Scrollable Description */}
                    <div className="mt-2 font-poppins tracking-tight text-sm md:text-base overflow-y-auto max-h-[150px] md:max-h-none pr-2">
                        {truncateText(book.description, 1000)}
                    </div>

                    <p className="text-sm text-gray-500 mt-2 font-poppins text-center md:text-left">Published: {book.publishedDate}</p>

                    {/* Close Button (Always Visible) */}
                    <button
                        className="flex items-center justify-center mt-4 border-red-500 border-2 font-poppins tracking-tighter px-4 py-2 rounded-full text-black self-center md:self-start"
                        onClick={onClose}
                    >
                        <IoClose className="text-lg" />
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
