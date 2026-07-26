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
import CreateSubmission from "../pages/Submission/CreateSubmission";
import EditSubmission from "../pages/Submission/EditSubmission";

import JudgeDashboard from "../pages/Judge/Dashboard";
import JudgeSubmissions from "../pages/Judge/Submissions";
import ReviewSubmission from "../pages/Judge/ReviewSubmission";

import Leaderboard from "../pages/Leaderboard/Leaderboard";

import AdminDashboard from "../pages/Admin/Dashboard";
import Users from "../pages/Admin/Users";
import CreateUser from "../pages/Admin/CreateUser";

import Profile from "../pages/Profile/Profile";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/hackathons" element={<Listing />} />

      <Route path="/hackathons/:id" element={<Details />} />

      <Route path="/leaderboard/:hackathonId" element={<Leaderboard />} />

      {/* ================= PARTICIPANT ================= */}

      <Route
        path="/participant/dashboard"
        element={
          <ProtectedRoute role="participant">
            <ParticipantDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teams"
        element={
          <ProtectedRoute role="participant">
            <TeamPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/register/:hackathonId"
        element={
          <ProtectedRoute role="participant">
            <Register />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-registrations"
        element={
          <ProtectedRoute role="participant">
            <MyRegistrations />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-submissions"
        element={
          <ProtectedRoute role="participant">
            <MySubmissions />
          </ProtectedRoute>
        }
      />

      <Route
        path="/submission/create"
        element={
          <ProtectedRoute role="participant">
            <CreateSubmission />
          </ProtectedRoute>
        }
      />

      <Route
        path="/submission/edit/:id"
        element={
          <ProtectedRoute role="participant">
            <EditSubmission />
          </ProtectedRoute>
        }
      />

      {/* ================= ORGANIZER ================= */}

      <Route
        path="/organizer/dashboard"
        element={
          <ProtectedRoute role="organizer">
            <OrganizerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizer/create-hackathon"
        element={
          <ProtectedRoute role="organizer">
            <CreateHackathon />
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizer/my-hackathons"
        element={
          <ProtectedRoute role="organizer">
            <MyHackathons />
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizer/edit-hackathon/:id"
        element={
          <ProtectedRoute role="organizer">
            <EditHackathon />
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizer/registrations/:id"
        element={
          <ProtectedRoute role="organizer">
            <Registrations />
          </ProtectedRoute>
        }
      />

      {/* ================= JUDGE ================= */}

      <Route
        path="/judge/dashboard"
        element={
          <ProtectedRoute role="judge">
            <JudgeDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/judge/submissions"
        element={
          <ProtectedRoute role="judge">
            <JudgeSubmissions />
          </ProtectedRoute>
        }
      />

      <Route
        path="/judge/review/:id"
        element={
          <ProtectedRoute role="judge">
            <ReviewSubmission />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN ================= */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="admin">
            <Users />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/create-user"
        element={
          <ProtectedRoute role="admin">
            <CreateUser />
          </ProtectedRoute>
        }
      />

      {/* ================= COMMON AUTH ROUTES ================= */}

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* ================= 404 ================= */}

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;