import Home from "./pages/Home";
import Campgrounds from "./pages/Campgrounds";
import Create from "./pages/Create";
import { Routes, Route } from "react-router-dom";
import SingleCamps from "./pages/SingleCamps";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campgrounds" element={<Campgrounds />} />
        <Route path="/create" element={<Create />} />
        <Route path="/camp/:id" element={<SingleCamps />} />
      </Routes>
    </div>
  );
}

export default App;
