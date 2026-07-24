import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import NotFound from "../pages/Error/NotFound";
import Listing from "../pages/Hackathon/Listing";
import Details from "../pages/Hackathon/Details";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="*" element={<NotFound />} />
      
      <Route path="/hackathons" element={<Listing />} />

      <Route path="/hackathons/:id" element={<Details />} />
      
    </Routes>
  );
}

export default AppRoutes;
