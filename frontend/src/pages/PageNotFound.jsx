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
        <p className="pb-8 p-9 flex items-center gap-2 text-center text-3xl font-semibold text-gray-800 border rounded-2xl">
          <span className="text-5xl text-gray-700">404</span> - Page Not Found!{" "}
          <TriangleAlert color="red" size={36} className="animate-bounce" />
        </p>
        <Link
          to="/"
          className="mt-5 font-medium text-lg text-blue-700 hover:underline"
        >
          ⬅ Back to Home
        </Link>
      </div>
    </motion.div>
  );
};

export default PageNotFound;
