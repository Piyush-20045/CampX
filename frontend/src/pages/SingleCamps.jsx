import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { deleteCamp, fetchCamps } from "../features/camps/campsSlice";
import { toast } from "react-toastify";

const SingleCamps = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: camps, status } = useSelector((state) => state.camps);
  const { user } = useSelector((state) => state.user);
  const camp = camps.find((j) => j._id === id);

  useEffect(() => {
    if (camps.length === 0) {
      dispatch(fetchCamps());
    }
  }, [dispatch]);

  // Show loading or Not found
  if (status === "loading")
    return <p className="mt-24 text-center text-gray-500">Loading...</p>;
  if (!camp)
    return <p className="mt-24 text-center text-gray-500">Camp not found</p>;

  // Delete fn
  const campDelete = async () => {
    try {
      dispatch(deleteCamp(id));
      toast.success("Campground Deleted", { position: "top-center" });
      navigate("/campgrounds");
    } catch (err) {
      toast.error("Failed to delete camp");
    }
  };

  return (
    <div className="py-18 px-2.5 min-h-screen bg-gray-950">
      {/* Back button */}
      <Link
        to="/campgrounds"
        className="w-fit text-blue-600 hover:underline flex items-center md:ml-48 py-5"
      >
        ⬅ Back to Campgrounds
      </Link>

      {/* Camp Card */}
      <div className="bg-white max-w-2xl mx-auto shadow-md shadow-green-300 rounded-2xl overflow-hidden">
        <img
          src={camp.image || "/placeholder.png"}
          alt={camp.name || "Camp Image"}
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
            {user._id !== camp.author?.id ? (
              <div>
                <Link
                  to={`/edit/${id}`}
                  className="w-16 bg-green-600 text-white px-4 py-2.5 rounded-md hover:bg-green-700 cursor-pointer active:scale-95 transition duration-150 shadow-black shadow-sm active:shadow-none"
                >
                  Edit
                </Link>
                <button
                  onClick={campDelete}
                  className="ml-2 md:ml-6 w-16 bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700 cursor-pointer active:scale-95 transition duration-150 shadow-black shadow-sm active:shadow-none"
                >
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCamps;
