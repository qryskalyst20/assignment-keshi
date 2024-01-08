import { FaSearch, FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <div className="flex flex-row item-center justify-between w-full">
      <div className="flex flex-col">
        <h1 className="text-black font-bold text-3xl">Dashboard</h1>
        <p className="text-black font-bold text-md">Main Page</p>
      </div>
      <div className="flex flex-row gap-10">
        <div className="flex items-center justify-start px-5 py-2 bg-gray-200 rounded-full w-[500px] h-fit">
          <FaSearch className="text-black w-6 h-6" />
        </div>
        <FaUserCircle className="text-black w-10 h-10" />
      </div>
    </div>
  );
};

export default Header;
