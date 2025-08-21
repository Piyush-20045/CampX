import Home from "./pages/Home";
import Campgrounds from "./pages/Campgrounds";
import Create from "./pages/Create";
import { Routes, Route } from "react-router-dom";
import SingleCamps from "./pages/SingleCamps";
import EditCamp from "./pages/EditCamp";
import { ToastContainer } from "react-toastify";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <Routes>
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
