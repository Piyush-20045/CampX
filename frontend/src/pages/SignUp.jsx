import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signUp } from "../features/users/userSlice";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const data = await dispatch(signUp(userData)).unwrap();
      if (data.message) {
        toast.success("Sign up successfull!", { position: "top-center" });
        navigate("/");
      } else {
        toast.error(data.error || "Error in signUp", {
          position: "top-center",
        });
      }
    } catch (err) {
      toast.error("Something went wrong", { position: "top-center" });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-300 via-green-500 to-green-700">
      {/* Blur overlay */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: "url(/bgImg2.jpg)" }}
      ></div>
      <div className="absolute inset-0 backdrop-blur-sm "></div>

      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="flex flex-col items-center">
          <img src="/leaf.svg" className="w-16" />
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Register now
          </h2>
          <p className="mb-7 text-center text-gray-600">
            Sign Up to CampX and explore the nearest camps
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            className="w-full p-3 border  rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {/* <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          /> */}
          <button
            type="submit"
            className="w-full h-12 font-semibold bg-green-600 text-white text-lg py-3 mt-5 rounded-md hover:bg-green-700 active:scale-95 transition cursor-pointer bg-gradient-to-b from-green-800 via-green-700 to-green-600"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account
          <Link
            to="/login"
            className="text-green-700 font-semibold hover:underline"
          >
            , Login
          </Link>
        </p>
      </div>
    </div>
  );
}
