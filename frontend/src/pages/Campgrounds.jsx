import { useDispatch, useSelector } from "react-redux";
import { fetchCamps } from "../features/camps/campsSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const Campgrounds = () => {
  const dispatch = useDispatch();
  const { data: camps, status, error } = useSelector((state) => state.camps);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchCamps());
  }, [dispatch]);

  // Filter camps based on search
  const filteredCamps = camps.filter((camp) => {
    const matchesSearch =
      camp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (status === "loading" && camps.length === 0) {
    return <p>Loading camps...</p>;
  }
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen flex flex-col px-2 bg-gray-900">
      <h1 className="mt-7 text-3xl font-bold mb-6 text-center text-gray-50">
        Explore Campgrounds
      </h1>
      {/* Search bar */}
      <div className="flex justify-center lg:mx-7">
        <SearchBar onSearch={setSearchTerm} />
      </div>
      <div className="md:px-6 lg:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredCamps.map((camp) => (
          <Link
            to={`/camp/${camp._id}`}
            key={camp._id}
            className="bg-gray-200 shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={camp.image || "./placeholder.png"}
              alt={camp.name || "Camp Image"}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{camp.name}</h2>
              <p className="text-gray-600">{camp.location}</p>
              <p className="text-green-600 font-medium mt-2">
                ₹{camp.price}/night
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Campgrounds;
