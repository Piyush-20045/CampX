import Home from "./pages/Home";
import Campgrounds from "./pages/Campgrounds";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campgrounds" element={<Campgrounds />} />
      </Routes>
    </div>
  );
}

export default App;
