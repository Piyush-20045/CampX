import { TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PageNotFound = () => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="px-2 pt-32 min-h-screen flex flex-col items-center">
        <p className="pb-8 p-9 flex items-center gap-2 text-center text-3xl font-semibold text-gray-800 border rounded-2xl shadow-md shadow-black hover:shadow-none">
          <span className="text-5xl text-gray-700">404</span> - Page Not Found!{" "}
          <TriangleAlert color="red" size={36} className="animate-bounce" />
        </p>
        <Link
          to="/"
          className="mt-5 px-6 py-3 text-lg font-medium border rounded-xl text-white bg-gradient-to-b from-green-800 via-green-700 to-green-600 shadow-md shadow-black active:scale-95 active:shadow-none transition-all"
        >
          ⬅ Back to Home
        </Link>
      </div>
    </motion.div>
  );
};

export default PageNotFound;
