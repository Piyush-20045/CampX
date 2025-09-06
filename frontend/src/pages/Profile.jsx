import { useState } from "react";
import { User, Mail, Lock, PencilLine, LogOut, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  logout,
  updateUser,
  updateName,
  updatePassword,
} from "../features/users/userSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // modal states
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);

  // inputs
  const [newName, setNewName] = useState(user?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // log out logic
  const handleLogout = () => {
    dispatch(logout());
    toast.success("You are now logged out!", { position: "top-center" });
  };

  // update name
  const handleNameUpdate = async () => {
    try {
      const data = await dispatch(updateName(newName)).unwrap();

      dispatch(updateUser(data.user));
      toast.success(`Name updated to ${data.user.name}`);
      setIsNameModalOpen(false);
    } catch (err) {
      toast.error("Failed to update name");
    }
  };

  // update password
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (!newPassword || !currentPassword) return;
    const passwords = { newPassword, currentPassword };

    try {
      const data = await dispatch(updatePassword(passwords)).unwrap();
      toast.success(data.message || "Password updated!");
      setIsPassModalOpen(false);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      toast.error(err.message || "Failed to update password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#a0a6b0] via-[#6b7280] to-[#374151] text-gray-100 pt-32 px-4 py-10">
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
              onClick={() => setIsNameModalOpen(true)}
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

          {/* Password */}
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
              onClick={() => setIsPassModalOpen(true)}
            >
              Change
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-between md:justify-end md:mr-6">
          <Link
            to="/login"
            onClick={handleLogout}
            className="w-fit px-3 py-2 flex md:hidden rounded-xl gap-1 text-md font-medium bg-red-600 active:scale-95 transition"
          >
            <LogOut />
            Log Out
          </Link>

          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 cursor-pointer text-md font-medium"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>

      {/* Edit Name Modal */}
      {isNameModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-100 flex justify-center items-center">
          <div className="bg-gray-800 rounded-2xl p-6 w-96 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
              onClick={() => setIsNameModalOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit Name</h2>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white mb-4 outline-none"
              required
            />
            <button
              onClick={handleNameUpdate}
              className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded-xl font-medium"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isPassModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form className="bg-gray-800 rounded-2xl p-6 w-96 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
              onClick={() => setIsPassModalOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white mb-3 outline-none"
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white mb-4 outline-none"
              required
            />
            <button
              onClick={handlePasswordUpdate}
              className="w-full bg-green-600 hover:bg-green-500 py-2 rounded-xl font-medium"
            >
              Update Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
