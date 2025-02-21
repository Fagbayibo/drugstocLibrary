
interface BookCardProps {
    image: string;
    onClick: () => void;
  }
  
  const BookCard: React.FC<BookCardProps> = ({ image, onClick }) => {
    return (
      <div
        className="relative md:w-[250px] md:max-xl:w-[300px]  w-[190px] h-[300px] bg-white shadow-md rounded-lg cursor-pointer overflow-hidden group"
        onClick={onClick}
      >
        <img src={image} alt="Book Cover" className="w-full h-full object-cover rounded-md"  />
        {/* Dark overlay with "View Details" on hover */}
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
          <span className="text-white font-semibold text-lg">View Details</span>
        </div>
      </div>
    );
  };
  
  export default BookCard;
  