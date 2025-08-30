import { useState } from "react";
import Navbar from "../components/Navbar";
import UploadImage from "../components/Upload";
import { useDispatch } from "react-redux";
import { createCamp } from "../features/camps/campsSlice";
import { toast } from "react-toastify";
import { FlameKindling } from "lucide-react";

const Create = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Create camp fn
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createCamp(formData));
    setFormData({
      name: "",
      location: "",
      price: "",
      image: "",
      description: "",
    });
    toast.success("Campground created", { position: "top-center" });
  };
  console.log(formData.image);

  return (
    <div className="min-h-screen flex flex-col px-2 bg-gray-900">
      <div className="mx-1 my-12 py-8 px-5 max-w-xl md:min-w-xl sm:mx-auto bg-gray-100 rounded-lg shadow">
        <h2 className="flex justify-center items-center text-2xl text-gray-700 font-bold mb-4 text-center">
          <FlameKindling size={44} color="brown" /> Add New Campground
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Campground Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
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
              onChange={handleChange}
              className="w-full p-2 focus:outline-none"
              required
              min={1}
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
            onChange={handleChange}
            className="w-full p-2 border rounded resize-none focus:outline-none"
            rows="4"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full text-white py-2 rounded hover:bg-green-700 cursor-pointer active:scale-95 transition duration-150 bg-gradient-to-b from-green-800 via-green-700 to-green-600"
          >
            Add Campground
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
