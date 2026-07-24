import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import NotFound from "../pages/Error/NotFound";
import Listing from "../pages/Hackathon/Listing";
import Details from "../pages/Hackathon/Details";
import TeamPage from "../pages/Team/TeamPage";
import Register from "../pages/Registration/Register";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/hackathons" element={<Listing />} />

      <Route path="/hackathons/:id" element={<Details />} />

      <Route path="/teams" element={<TeamPage />} />

      <Route path="/register/:hackathonId" element={<Register />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
