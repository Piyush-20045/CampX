import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchCamps, updateCamp } from "../features/camps/campsSlice";
import UploadImage from "../components/Upload";
import { Edit } from "lucide-react";

const EditCamp = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: camps, status, error } = useSelector((state) => state.camps);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    image: "",
    description: "",
  });

  //   fn to update the camp
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateCamp({ id, formData })).unwrap();
      await dispatch(fetchCamps()).unwrap();
      toast.success("Campground updated", { position: "top-center" });
      navigate(`/camp/${id}`);
    } catch (err) {
      toast.error("Failed to update", { position: "top-center" });
    }
  };

  // Fetching camp
  const camp = camps?.find((j) => j._id === id);
  useEffect(() => {
    if (camp) {
      setFormData({
        name: camp.name,
        location: camp.location,
        price: camp.price,
        image: camp.image,
        description: camp.description,
      });
    }
  }, [camp]);

  return (
    <div className="pt-18 px-2 min-h-screen flex flex-col bg-gray-950">
      <Link
        to={`/camp/${id}`}
        className="w-fit mt-9 md:ml-48 text-blue-600 hover:underline"
      >
        ⬅ Back to the Camp
      </Link>
      <div className="p-4 my-7 max-w-xl sm:mx-auto md:min-w-xl bg-gray-100 rounded-lg shadow-md shadow-green-300">
        <h2 className="py-2 flex justify-center items-center gap-1 text-2xl text-gray-800 font-bold font-sans">
          <Edit size={32} />
          Edit Camp
        </h2>

        <form onSubmit={handleUpdate} className="mt-4 space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Campground Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded focus:outline-none"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="w-full p-2 border rounded focus:outline-none"
            required
          />
          <div className="flex items-center border rounded w-full overflow-hidden">
            <span className="flex items-center px-4 h-11 text-gray-600 bg-gray-300">
              ₹
            </span>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full p-2 focus:outline-none"
              required
            />
          </div>
          {/* UPLOAD Image */}
          <UploadImage
            value={formData.image}
            onUpload={(url) => setFormData({ ...formData, image: url })}
          />
          <textarea
            name="description"
            placeholder="Short Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-2 border rounded resize-none focus:outline-none"
            rows="4"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 cursor-pointer active:scale-95 transition duration-150"
          >
            Update Campground
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCamp;
