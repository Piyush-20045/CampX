import { useState } from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); //send query to parent
  };

  // Clear the search bar
  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="mb-5 px-3 py-1.5 flex items-center w-full md:w-11/12 rounded-3xl bg-white border border-gray-200 focus-within:ring-2 focus-within:ring-green-500 shadow-gray-500 shadow-md">
      <Search className="text-gray-500 w-5 h-5 mr-2" />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search a camp by name, place..."
        className="pt-1 w-full outline-none text-lg text-gray-700 bg-transparent"
      />
      {query && (
        <button
          type="button"
          onClick={clearSearch}
          className="mr-2 p-0.5 text-white bg-gray-400 hover:bg-gray-500 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
