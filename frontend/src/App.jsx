import Home from "./pages/Home";
import Campgrounds from "./pages/Campgrounds";
import Create from "./pages/Create";
import { Routes, Route } from "react-router-dom";
import SingleCamps from "./pages/SingleCamps";
import EditCamp from "./pages/EditCamp";
import { ToastContainer } from "react-toastify";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import PageNotFound from "./pages/PageNotFound";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadUserFromStorage } from "./features/users/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/campgrounds" element={<Campgrounds />} />
        <Route path="/create" element={<Create />} />
        <Route path="/camp/:id" element={<SingleCamps />} />
        <Route path="/edit/:id" element={<EditCamp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
