import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import NotFound from "../pages/Error/NotFound";
import Listing from "../pages/Hackathon/Listing";
import Details from "../pages/Hackathon/Details";
import TeamPage from "../pages/Team/TeamPage";
import Register from "../pages/Registration/Register";
import MyRegistrations from "../pages/Registration/MyRegistrations";
import ParticipantDashboard from "../pages/Participant/Dashboard";
import OrganizerDashboard from "../pages/Organizer/Dashboard";
import CreateHackathon from "../pages/Organizer/CreateHackathon";
import MyHackathons from "../pages/Organizer/MyHackathons";
import EditHackathon from "../pages/Organizer/EditHackathon";
import Registrations from "../pages/Organizer/Registrations";
import MySubmissions from "../pages/Submission/MySubmissions";

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

      <Route path="/my-registrations" element={<MyRegistrations />} />

      <Route path="/participant/dashboard" element={<ParticipantDashboard />} />

      <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />

      <Route path="/organizer/create-hackathon" element={<CreateHackathon />} />

      <Route path="/organizer/my-hackathons" element={<MyHackathons />} />

      <Route path="/organizer/edit-hackathon/:id" element={<EditHackathon />} />

      <Route path="/organizer/registrations/:id" element={<Registrations />} />

      <Route path="/my-submissions" element={<MySubmissions />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
