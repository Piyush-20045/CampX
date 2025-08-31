import { Leaf, CircleUser, Menu, CircleX } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/users/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, token } = useSelector((state) => state.user);

  const Navlinks = [
    { href: "/", label: "Home" },
    { href: "/campgrounds", label: "Campgrounds" },
    { href: "/create", label: "New Campground" },
  ];

  // log out logic
  const handleLogout = () => {
    dispatch(logout());
    toast.success("You are now logged out!", { position: "top-center" });
  };
  return (
    <div className="px-2 lg:px-12 2xl:px-52 p-4 border-b flex justify-between items-center text-white shadow shadow-blue-200 bg-gradient-to-r from-[#919bac] via-[#6b7280] to-[#8e929b]">
      {/* LOGO */}
      <Link
        to="/"
        className="flex items-center text-3xl text-white font-extrabold font-logo"
      >
        {<Leaf color="green" size={28} />}CampX
      </Link>
      {/* Desktop Navbar Links*/}
      <nav className="hidden w-full md:flex justify-center gap-10 text-lg font-medium ">
        {Navlinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="hover:text-green-400 cursor-pointer active:scale-95 transition ease-in-out duration-200"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      {/* SignUp & Logout*/}
      {token ? (
        <Link
          to="/login"
          onClick={handleLogout}
          className="hidden md:flex gap-1 w-40 text-lg font-medium hover:text-green-400 cursor-pointer active:scale-95 transition ease-in-out duration-200"
        >
          {user?.name}
          <CircleUser />
          Log Out
        </Link>
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
        className="md:hidden pt-1 rounded-full active:bg-gray-700"
      >
        {isMenuOpen ? <CircleX size={28} /> : <Menu size={28} />}
      </button>
      {/* MOBILE MENU links */}
      <nav
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`md:hidden w-full p-6 absolute top-18 left-0 shadow-2xl flex flex-col rounded space-y-6 backdrop-blur-2xl bg-black/20 text-center text-lg font-medium opacity-0 transition-all duration-200 ease-out scale-95
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
            to="/login"
            onClick={handleLogout}
            className="flex gap-1 text-lg mx-auto font-medium hover:text-green-400"
          >
            <CircleUser />
            Log Out
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
  );
};

export default Navbar;
