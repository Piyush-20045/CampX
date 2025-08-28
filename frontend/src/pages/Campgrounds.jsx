import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamps } from "../features/camps/campsSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Campgrounds = () => {
  const dispatch = useDispatch();
  const { data: camps, status, error } = useSelector((state) => state.camps);

  useEffect(() => {
    dispatch(fetchCamps());
  }, [dispatch]);

  if (status === "loading" && camps.length === 0) {
    return <p>Loading camps...</p>;
  }
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen flex flex-col px-2 bg-gray-900">
      {/* NAVBAR */}
      <Navbar />

      {/* All Campgrounds */}
      <div className="p-6">
        <h1 className="mt-4 text-3xl font-bold mb-6 text-center text-gray-50">
          Explore Campgrounds
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {camps.map((camp) => (
            <Link
              to={`/camp/${camp._id}`}
              key={camp._id}
              className="bg-gray-200 shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={camp.image || "Camp Image"}
                alt={camp.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{camp.name}</h2>
                <p className="text-gray-600">{camp.location}</p>
                <p className="text-green-600 font-medium mt-2">₹{camp.price}/night</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Campgrounds;
