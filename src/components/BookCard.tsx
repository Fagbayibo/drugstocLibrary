interface BookCardProps {
  image: string;
  onClick: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ image, onClick }) => {
  return (
    <div
      className="relative w-[180px] md:w-[250px] xl:w-[300px] h-[300px] bg-white shadow-md rounded-lg cursor-pointer overflow-hidden group"
      onClick={onClick}
      aria-label="View book details"
    >
      {/* Book Cover Image */}
      <img
        src={image}
        alt="Book Cover"
        className="w-full h-full object-cover"
        loading="lazy"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-white font-medium text-lg font-poppins tracking-tighter">View Details</span>
      </div>
    </div>
  );
};

export default BookCard;
