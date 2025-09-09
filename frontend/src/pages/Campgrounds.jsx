import { useDispatch, useSelector } from "react-redux";
import { fetchCamps } from "../features/camps/campsSlice";
import { useEffect, useMemo, useState } from "react";
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
  const filteredCamps = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return camps.filter(
      (camp) =>
        camp.name.toLowerCase().includes(term) ||
        camp.location.toLowerCase().includes(term)
    );
  }, [camps, searchTerm]);

  if (status === "loading" && camps.length === 0) {
    return (
      <p className="pt-28 min-h-screen text-center bg-gray-400 text-2xl">
        Loading camps...
      </p>
    );
  }
  if (status === "failed")
    return (
      <p className="pt-28 min-h-screen text-center bg-gray-400 text-2xl">
        Error: {error}
      </p>
    );

  return (
    <div className="min-h-screen flex flex-col pt-18 px-2 pb-8 bg-gradient-to-r from-[#a0a6b0] via-[#6b7280] to-[#374151]">
      <h1 className="mt-7 text-3xl font-bold mb-6 text-center text-gray-50">
        Explore Campgrounds
      </h1>

      {/* Search bar */}
      <div className="flex justify-center lg:mx-7">
        <SearchBar onSearch={setSearchTerm} />
      </div>

      {/* All Campgrounds */}
      {filteredCamps.length === 0 ? (
        <p className="pt-12 text-center text-2xl text-white">
          No campgrounds found.
        </p>
      ) : (
        <div className="md:px-6 lg:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCamps.map((camp) => (
            <Link
              to={`/camp/${camp._id}`}
              key={camp._id}
              className="bg-gray-200 rounded-lg overflow-hidden shadow-gray-600 hover:shadow-lg"
            >
              <img
                src={camp.image || "/placeholder.png"}
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
      )}
    </div>
  );
};

export default Campgrounds;
