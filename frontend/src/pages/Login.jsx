import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/users/userSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  // handling login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await dispatch(loginUser(userData)).unwrap();
      if (data.message) {
        toast.success(data.message || "Login successfull", {
          position: "top-center",
        });
      } else {
        toast.error(data.error || "Error in login", { position: "top-center" });
      }
    } catch (err) {
      toast.error(data.error || "Login failed", { position: "top-center" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat">
      {/* Blur overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(/bgImg2.jpg)` }}
      ></div>
      <div className="absolute inset-0 backdrop-blur-sm bg-black/30"></div>

      {/* Main container */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="flex flex-col items-center">
          <img
            src="/leaf.svg"
            alt="leaf image"
            className="flex justify-center w-16"
          />
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Welcome Back
          </h2>
          <p className="mb-7 text-center text-gray-600">
            Login to your CampX account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            className="w-full p-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            className="w-full mt-2 p-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="w-full h-12 font-semibold bg-green-600 text-white text-lg py-3 mt-6 rounded-md hover:bg-green-700 active:scale-95 transition cursor-pointer bg-gradient-to-b from-green-800 via-green-700 to-green-600"
          >
            Login
          </button>
        </form>

        <p className="mt-5 text-center text-gray-600">
          Don't have an account?
          <Link
            to="/signup"
            className="text-green-700 font-semibold hover:underline"
          >
            &nbsp;SignUp for CampX
          </Link>
        </p>
      </div>
    </div>
  );
}
