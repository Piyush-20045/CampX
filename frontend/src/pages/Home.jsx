import { Search } from "lucide-react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="">
      <div className="px-2 h-screen bg-[url(bgImg.jpg)] bg-gray-950 bg-cover bg-center">
        {/* NAVBAR */}
        <Navbar />

        {/* HERO Section */}
        <div className="mt-8 max-h-fit flex flex-col justify-center items-center text-white text-center md:text-start">
          <img src="camp.svg" className="h-44 w-44 text-white " />
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Find Your Perfect Escape.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            Discover and book unique campgrounds, from serene national parks to
            hidden backcountry spots.
          </p>
          {/* SEARCH */}
          <div className="w-full max-w-2xl flex justify-center gap-2 text-white px-5 py-3 bg-green-600 rounded-full shadow-md">
            <Search className="h-6 w-6" />
            <input
              type="text"
              placeholder="Search for a destination..."
              className="w-full focus:outline-none bg-transparent placeholder-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
