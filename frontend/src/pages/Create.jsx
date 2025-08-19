import { useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { createCamp } from "../features/camps/campsSlice";
import { toast } from "react-toastify";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createCamp(formData));
    setFormData({
      name: "",
      location: "",
      price: "",
      image: "",
      description: "",
    });
    toast.success("Campground created", { position: "top-center" });
  };

  return (
    <div className="min-h-screen flex flex-col px-2 bg-gray-900">
      <Navbar />

      <div className="mx-1 my-12 py-8 px-5 max-w-xl sm:mx-auto bg-gray-100 rounded-lg shadow">
        <h2 className="text-2xl text-gray-800 font-bold mb-4 text-center">
          Add New Campground
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Campground Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
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
            />
          </div>
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Short Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded resize-none"
            rows="4"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 cursor-pointer active:scale-95 transition duration-150"
          >
            Add Campground
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
