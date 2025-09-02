import { User, Mail, Lock, PencilLine, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../features/users/userSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // log out logic
  const handleLogout = () => {
    dispatch(logout());
    toast.success("You are now logged out!", { position: "top-center" });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-4 py-10">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Your Profile</h1>

        <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-6 space-y-6">
          {/* Name */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gray-700">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400">Name</p>
              <p className="text-lg font-medium">{user.name}</p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-700 hover:bg-gray-600"
              onClick={() => console.log("Edit name")}
            >
              <PencilLine className="w-4 h-4" />
              <span className="text-sm">Edit</span>
            </button>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gray-700">
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-lg font-medium break-all">{user.email}</p>
            </div>
          </div>

          {/* Password (masked) */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gray-700">
              <Lock className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400">Password</p>
              <p className="text-lg font-medium tracking-widest select-none">
                ••••••••
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-green-600 hover:bg-green-500"
              onClick={() => console.log("Navigate to change password page")}
            >
              Change
            </button>
          </div>
        </div>
        <div className="mt-6 flex justify-between md:justify-end md:mr-6">
          {/* LOGIN btn */}
          <Link
            to="/login"
            onClick={handleLogout}
            className="w-fit px-3 py-2 flex md:hidden rounded-xl gap-1 text-md font-medium bg-red-600 active:scale-95 transition"
          >
            <LogOut />
            Log Out
          </Link>
          {/* BACK btn */}
          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 cursor-pointer text-md font-medium"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
