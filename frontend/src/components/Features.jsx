import { MapPin, Star, Tent } from "lucide-react";

const Features = () => {
  return (
    <section className="max-w-7xl mx-auto py-20 px-6 bg-gray-100">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Why Choose CampX?
        </h2>
        <p className="text-2xl text-gray-600 mx-auto">
          Your gateway to discovering and sharing the best camping experiences
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 text-gray-800">
        <div className="text-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl space-y-4 border-2 border-gray-200 rounded-lg bg-white">
          <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto">
            <MapPin className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-semibold">Find Perfect Spots</h3>
          <p className="text-lg text-gray-600">
            Discover hidden gems and popular campgrounds with detailed
            information and reviews
          </p>
        </div>

        <div className="text-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl space-y-4 border-2 border-gray-200 rounded-lg bg-white">
          <div className="w-16 h-16 bg-orange-800 rounded-full flex items-center justify-center mx-auto">
            <Star className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-semibold">Share Experiences</h3>
          <p className="text-lg text-gray-600">
            Rate and review campgrounds to help fellow campers make informed
            decisions
          </p>
        </div>

        <div className="text-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl space-y-4 border-2 border-gray-200 rounded-lg bg-white">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-700 to-green-800 rounded-full flex items-center justify-center mx-auto">
            <Tent className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-semibold">Easy Booking</h3>
          <p className="text-lg text-gray-600">
            Simple and secure booking process to reserve your perfect camping
            spot
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
