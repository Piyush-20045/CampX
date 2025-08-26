import { useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { createCamp } from "../features/camps/campsSlice";
import { toast } from "react-toastify";
import { FlameKindling, Upload } from "lucide-react";

const Create = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    image: "",
    description: "",
  });

  // handle upload image
  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;
    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_NAME);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_NAME
      }/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const uploadedImg = await res.json();
    const imageUrl = uploadedImg.url;
    setFormData({ ...formData, image: imageUrl });
    console.log(imageUrl);
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  return (
    <div className="min-h-screen flex flex-col px-2 bg-gray-900">
      <Navbar />

      <div className="mx-1 my-12 py-8 px-5 max-w-xl md:min-w-xl sm:mx-auto bg-gray-100 rounded-lg shadow">
        <h2 className="flex justify-center items-center text-2xl text-gray-700 font-bold mb-4 text-center">
          <FlameKindling size={44} color="brown"/> Add New Campground
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
          <div className="flex flex-col items-center gap-2 h-fit p-2 border rounded-lg">
            {/* UPLOAD IMAGES */}
            <label
              htmlFor="file-upload"
              className="w-full flex flex-col items-center gap-2 cursor-pointer"
            >
              {loading ? (
                <p className="text-lg bg-white flex justify-center items-center p-4 rounded-2xl w-full">
                  Uploading
                  <img src="loading.gif" className="w-10" />
                </p>
              ) : formData.image ? (
                <img src={formData.image} />
              ) : (
                <span className="py-2 flex gap-2 items-center text-xl font-semibold text-gray-600">
                  Upload a camp image
                  <Upload size={48} />
                </span>
              )}
            </label>
            <input
              type="file"
              id="file-upload"
              name="image"
              onChange={handleUpload}
              className="hidden"
              required
            />
          </div>
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
