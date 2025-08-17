import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchCamps } from "../features/camps/campsSlice";

const SingleCamps = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: camps, status, error } = useSelector((state) => state.camps);

  useEffect(() => {
    if (camps.length === 0) {
      dispatch(fetchCamps());
    }
  }, [dispatch]);
  if (status === "loading")
    return <p className="mt-24 text-center text-gray-500">Loading...</p>;
  if (status === "failed")
    return <p className="text-center text-red-500">{error}</p>;

  const camp = camps.find((j) => j._id === id);
  if (!camp)
    return <p className="mt-24 text-center text-gray-500">Camp not found</p>;

  // Delete logic
  let deleteCamp = async () => {
    const confirm = window.confirm("Do you want to delete this camp post?");
    if (!confirm) return;

    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/camps/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Error in deleting:", err);
    }
    alert("BLog Deleted");
    navigate("/campgrounds");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Back button */}
      <Link
        to="/campgrounds"
        className="text-blue-600 hover:underline flex items-center mb-6"
      >
        ⬅ Back to Campgrounds
      </Link>

      {/* Camp Card */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <img
          src={camp.image}
          alt={camp.name}
          className="w-full h-72 object-cover"
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800">{camp.name}</h1>
          <p className="text-gray-600">{camp.location}</p>
          <p className="mt-3 text-gray-700 text-xl">{camp.description}</p>

          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-semibold text-green-600">
              ₹{camp.price}/night
            </span>
            <div>
              <button className="w-16 bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 cursor-pointer active:scale-95 transition duration-150 shadow-black shadow-sm active:shadow-none">
                Edit
              </button>
              <button
                onClick={deleteCamp}
                className="ml-6 w-16 bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700 cursor-pointer active:scale-95 transition duration-150 shadow-black shadow-sm active:shadow-none"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCamps;
