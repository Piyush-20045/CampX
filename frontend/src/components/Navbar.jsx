import {
  Leaf,
  CircleUser,
  Menu,
  CircleX,
  LogOut,
  UserCheck2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/users/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, token } = useSelector((state) => state.user);

  const Navlinks = [
    { href: "/", label: "Home" },
    { href: "/campgrounds", label: "Campgrounds" },
    { href: "/create", label: "New Campground" },
  ];

  // Effect to handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // log out logic
  const handleLogout = () => {
    dispatch(logout());
    toast.success("You are now logged out!", { position: "top-center" });
  };
  return (
    <div
      className={`2xl:px-64 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/60 backdrop-blur-sm shadow-md"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="px-2 lg:px-12 p-4 md:p-3 border-b flex justify-between items-center text-white">
        {/* LEAF LOGO */}
        <Link
          to="/"
          className="flex items-center text-3xl text-white font-extrabold font-logo"
        >
          {<Leaf color="green" size={28} />}CampX
        </Link>

        {/* Desktop Navbar Links*/}
        <nav className="ml-14 hidden w-full md:flex justify-center gap-10 text-lg font-medium ">
          {Navlinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `hover:text-green-400 cursor-pointer active:scale-95 transition ease-in-out duration-200 ${
                  isActive ? "text-green-400" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* LOGIN btn, USERNAME, LOGOUT dropdown menu*/}
        {token ? (
          <span
            onClick={() => setShowLogout(!showLogout)}
            className="p-2 md:w-80 lg:w-65 hidden md:flex justify-center items-center gap-1 border border-white rounded-xl hover:bg-gray-500 cursor-pointer"
          >
            <UserCheck2Icon />
            <p className="text-lg font-medium">{user.name}</p>
            {/* SVG-ICON */}
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                showLogout ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            {/* POP UP WHEN CLICKED ON USERNAME */}
            <div
              className={`w-40 top-16 p-2 absolute bg-gray-500 rounded-xl border z-20 shadow shadow-white opacity-0 transition-all duration-200 ease-out scale-95 ${
                showLogout ? "opacity-100 scale-100" : "pointer-events-none"
              }`}
            >
              <Link
                to="/profile"
                className="px-3 py-2 hidden md:flex rounded-xl gap-1 text-lg font-medium cursor-point hover:bg-gray-600"
              >
                <CircleUser />
                Profile
              </Link>
              <Link
                to="/login"
                onClick={handleLogout}
                className="mt-1 px-3 py-2 hidden md:flex rounded-xl gap-1 text-lg font-medium cursor-point border border-white bg-red-600 hover:bg-red-700 shadow-md shadow-black active:shadow-none"
              >
                <LogOut />
                Log Out
              </Link>
            </div>
          </span>
        ) : (
          <Link
            to="/login"
            className="hidden md:flex gap-1 w-40 text-lg font-medium hover:text-green-400 cursor-pointer active:scale-95 transition ease-in-out duration-200"
          >
            <CircleUser />
            Sign in/up
          </Link>
        )}

        {/* MOBILE MENU Btn */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden pt-1 rounded-full"
        >
          {isMenuOpen ? <CircleX size={28} /> : <Menu size={28} />}
        </button>

        {/* MOBILE MENU links */}
        <nav
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden w-full p-6 absolute top-18 left-0 shadow-2xl flex flex-col rounded space-y-6 backdrop-blur-sm bg-gray-900/80 text-center text-lg font-medium opacity-0 transition-all duration-200 ease-out scale-95
        ${isMenuOpen ? "opacity-100 scale-100" : "pointer-events-none"}`}
        >
          {Navlinks.map((link) => (
            <Link
              key={link.href}
              className="hover:text-green-400 cursor-pointer"
              to={link.href}
            >
              {link.label}
            </Link>
          ))}
          {token ? (
            <Link
              to="/profile"
              className="flex gap-1 text-lg mx-auto font-medium hover:text-green-400"
            >
              <CircleUser />
              Profile
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex gap-1 text-lg mx-auto font-medium hover:text-green-400"
            >
              <CircleUser />
              Sign in/up
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
