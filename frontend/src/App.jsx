import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Campgrounds from "./pages/Campgrounds";
import Create from "./pages/Create";
import SingleCamps from "./pages/SingleCamps";
import EditCamp from "./pages/EditCamp";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadUserFromStorage } from "./features/users/userSlice";
import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";
import FooterComponent from "./components/Footer";
import ScrollToTop from "./utils/ScrollToTop";

// Layout with Navbar
const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <FooterComponent />
  </>
);
const EmptyLayout = () => (
  <>
    <Outlet />
  </>
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <div className="2xl:px-64">
      <ScrollToTop />
      <Routes>
        {/* Routes WITH Navbar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/campgrounds" element={<Campgrounds />} />
          <Route path="/create" element={<Create />} />
          <Route path="/camp/:id" element={<SingleCamps />} />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EditCamp />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Routes WITHOUT Navbar */}
        <Route element={<EmptyLayout />}>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
