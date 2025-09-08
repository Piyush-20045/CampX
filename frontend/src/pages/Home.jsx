import { Link } from "react-router-dom";
import Features from "../components/Features";

const Home = () => {
  return (
    <div>
      <div className="pt-18 px-2 h-screen bg-gradient-to-r from-[#a0a6b0] via-[#6b7280] to-[#374151] bg-[url('/bg.avif')] bg-cover bg-center">
        {/* HERO Section */}
        <div className="pt-7 max-h-fit flex flex-col justify-center items-center text-white text-center md:text-start">
          <img src="camp.svg" className="h-44 w-44" />
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-200 mb-4">
            Welcome to <span className="text-orange-300">CampX</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mb-8 animate-fade-in">
            Discover and book unique campgrounds, from serene national parks to
            hidden backcountry spots.
          </p>
          <div className="flex gap-5 md:gap-12">
            <Link
              to="/campgrounds"
              className="px-3 py-3 md:px-5 md:py-2 text-sm md:text-lg font-medium rounded-lg bg-gradient-to-b from-green-700 to-green-800 hover:scale-105 hover:shadow-xl active:scale-100 transition-all cursor-pointer"
            >
              Explore Campgrounds
            </Link>
            <Link
              to="/create"
              className="px-3 py-3 md:px-5 md:py-2 text-sm md:text-lg font-medium rounded-lg bg-gray-100 text-gray-800 hover:scale-105 hover:shadow-xl active:scale-100 transition-all cursor-pointer"
            >
              Add Your Campground
            </Link>
          </div>
        </div>
      </div>
      {/* FEATURES Section */}
      <Features />
    </div>
  );
};

export default Home;
