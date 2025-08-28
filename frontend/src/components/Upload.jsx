import { useState } from "react";
import { Upload, X } from "lucide-react";

const UploadImage = ({ onUpload, value }) => {
  const [loading, setLoading] = useState(false);

  // Uploading to cloudinary
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

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
    onUpload(uploadedImg.url); //sending back this url
    setLoading(false);
  };
  // Remove image
  const handleRemove = () => {
    onUpload("");
  };
  return (
    <div className="flex flex-col items-center gap-2 h-fit p-2 border rounded-lg">
      {/* conditional rendering */}
      <label
        htmlFor="file-upload"
        className="w-full flex flex-col items-center gap-2 cursor-pointer"
      >
        {loading ? (
          <p className="text-lg bg-white flex justify-center items-center p-4 rounded-2xl w-full">
            Uploading
            <img src="/loading.gif" alt="..." className="w-10" />
          </p>
        ) : value ? (
          <div className="relative w-full">
            <img
              src={value}
              alt="Preview"
              className="rounded-lg max-h-48 object-cover w-full"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <span className="py-2 flex gap-2 items-center text-xl font-semibold text-gray-600">
            Upload a camp image
            <Upload size={48} />
          </span>
        )}
      </label>
      {/* input */}
      <input
        type="file"
        id="file-upload"
        name="image"
        onChange={handleUpload}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};

export default UploadImage;
