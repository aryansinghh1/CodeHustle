# CodeHustle 🚀

**CodeHustle** is a modern, full-stack Hackathon Management & Judging Platform designed to streamline the entire hackathon lifecycle—from team creation, hackathon registration, and project submission to judge evaluations and live leaderboard rankings.

---

## 🌟 Key Features

### 👤 Role-Based Portals & Access Control (RBAC)

#### 👩‍💻 Participant Portal
- **Hackathon Discovery**: Browse active and upcoming hackathons with detailed rules, deadlines, prize pools, and judging criteria.
- **Dynamic Team Creation**: Create teams and specify member names dynamically (automatically capped by the hackathon's `maxTeamSize`).
- **Single-Registration Constraint**: A participant can only register once per hackathon across all their teams to prevent multi-team spam.
- **Approved Submissions**: Submit GitHub repositories, live demo links, problem statements, solutions, and tech stacks strictly for hackathons where team registration is **Approved**.
- **Participant Dashboard**: Track team status, registrations, and project submissions.

#### 🎪 Organizer Portal
- **Hackathon Management**: Create, edit, and delete hackathons with custom deadlines, rules, prize pools, maximum team sizes, and assigned judges.
- **Registration Control**: Review incoming team applications and approve or reject team registrations.
- **Submissions & Remarks Viewer**: View all submitted projects along with individual judge score breakdowns, criteria ratings, and judge remarks.
- **Direct Leaderboard Access**: Quick access to live hackathon rankings.

#### 👨‍⚖️ Judge Portal
- **Assigned Projects View**: Access submissions strictly for hackathons assigned by the organizer.
- **Status Filter Tabs**: Easily toggle between **All**, **Pending**, and **Reviewed** projects.
- **7-Criteria Scoring System**: Evaluate projects on a scale of 0-10 across 7 criteria (Max 70 points):
  - 💡 Innovation
  - 🛠️ Technical Complexity
  - 🎨 UI / UX
  - ⚙️ Functionality
  - 📈 Scalability
  - 📚 Documentation
  - 🎤 Presentation
- **Feedback & Remarks**: Provide detailed comments and seamlessly update submitted reviews.
- **Judge Dashboard**: Monitor completed vs. pending project evaluation metrics.

#### 🛡️ Admin Portal
- Platform management and statistics overview.
- Create designated **Judge** and **Organizer** user accounts.
- Registration restrictions ensuring Admin and Judge roles cannot register as hackathon participants.

#### 📊 Live Leaderboard
- Real-time ranking calculations based on cumulative average scores from assigned judges.
- Publicly accessible to participants, organizers, judges, and visitors.

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: React 19 (Vite)
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **UI Components**: React Icons, React Hot Toast
- **Styling**: Vanilla CSS Design System (Glassmorphism, CSS Custom Properties, Dark Mode Theme)

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express 5
- **Database**: MongoDB & Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) & Bcrypt Password Hashing
- **Middleware**: Custom Role-Based Auth Middleware, Error Handler, Morgan Logger, CORS

---

## 📁 Detailed Directory Structure

```text
CodeHustle/
├── Backend/
│   ├── config/
│   │   └── db.js                        # MongoDB Mongoose connection config
│   ├── controllers/
│   │   ├── authController.js            # User registration, login, profile management
│   │   ├── userController.js            # Admin user management & judge list retrieval
│   │   ├── hackathonController.js       # Hackathon CRUD, status updates, judge assignments
│   │   ├── teamController.js            # Dynamic team creation, member management
│   │   ├── registrationController.js    # Hackathon registration, organizer approval/rejection
│   │   ├── submissionController.js      # Project entry submission & participant queries
│   │   ├── reviewController.js          # 7-criteria judge evaluation & review upsert
│   │   ├── leaderboardController.js     # Live average score ranking calculation
│   │   └── dashboardController.js       # Role-specific analytics (Organizer, Judge, Participant)
│   ├── middleware/
│   │   ├── authMiddleware.js            # JWT verification & role authorization (RBAC)
│   │   └── errorMiddleware.js           # Centralized Express error handler
│   ├── models/
│   │   ├── User.js                      # User schema (roles: admin, organizer, judge, participant)
│   │   ├── Hackathon.js                 # Hackathon schema (dates, rules, criteria, judges)
│   │   ├── Team.js                      # Team schema (leader, memberNames, max size)
│   │   ├── Registration.js              # Registration schema (status: Pending, Approved, Rejected)
│   │   ├── Submission.js                # Project submission schema (links, description, techStack)
│   │   └── Review.js                    # Judge evaluation schema (7 criteria, totalScore pre-save)
│   ├── routes/
│   │   ├── authRoutes.js                # /api/auth endpoints
│   │   ├── userRoutes.js                # /api/users endpoints
│   │   ├── hackathonRoutes.js           # /api/hackathons endpoints
│   │   ├── teamRoutes.js                # /api/teams endpoints
│   │   ├── registrationRoutes.js        # /api/registrations endpoints
│   │   ├── submissionRoutes.js          # /api/submissions endpoints
│   │   ├── reviewRoutes.js              # /api/reviews endpoints
│   │   ├── leaderboardRoutes.js         # /api/leaderboard endpoints
│   │   └── dashboardRoutes.js           # /api/dashboard endpoints
│   ├── utils/
│   │   └── asyncHandler.js              # Async wrapper middleware
│   ├── app.js                           # Express application initialization & middleware
│   ├── server.js                        # Server port listener & DB connection entry
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── EmptyState.jsx       # Reusable empty data placeholder
│   │   │   │   ├── Footer.jsx           # Global application footer
│   │   │   │   ├── Loader.jsx           # Global loading spinner
│   │   │   │   ├── Navbar.jsx           # Responsive navbar with role navigation
│   │   │   │   └── ProtectedRoute.jsx   # Role-based route guard
│   │   ├── context/
│   │   │   └── AuthContext.jsx          # Auth state management & token storage
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx           # Master page layout wrapper
│   │   ├── pages/
│   │   │   ├── Admin/
│   │   │   │   └── CreateUser.jsx       # Admin portal user/judge account creation
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx            # User authentication login
│   │   │   │   └── Signup.jsx           # Participant registration
│   │   │   ├── Hackathon/
│   │   │   │   ├── Details.jsx          # Public hackathon overview & registration trigger
│   │   │   │   └── Listing.jsx          # Public hackathons discovery grid
│   │   │   ├── Home/
│   │   │   │   └── Home.jsx             # Hero landing page & features showcase
│   │   │   ├── Judge/
│   │   │   │   ├── Dashboard.jsx        # Judge metrics & quick actions
│   │   │   │   ├── ReviewSubmission.jsx # 7-criteria evaluation form & feedback
│   │   │   │   └── Submissions.jsx      # Assigned projects list with All/Pending/Reviewed tabs
│   │   │   ├── Leaderboard/
│   │   │   │   └── Leaderboard.jsx      # Live hackathon project rankings table
│   │   │   ├── Organizer/
│   │   │   │   ├── CreateHackathon.jsx  # New hackathon creation & judge selector
│   │   │   │   ├── Dashboard.jsx        # Organizer metrics overview
│   │   │   │   ├── EditHackathon.jsx    # Hackathon modification & judge assignment
│   │   │   │   ├── MyHackathons.jsx     # Organizer hackathons management cards
│   │   │   │   ├── Registrations.jsx    # Team registration approval/rejection panel
│   │   │   │   └── Submissions.jsx      # Submitted projects & detailed judge remarks viewer
│   │   │   ├── Participant/
│   │   │   │   └── Dashboard.jsx        # Participant activity & dashboard metrics
│   │   │   ├── Profile/
│   │   │   │   └── Profile.jsx          # User profile details
│   │   │   ├── Registration/
│   │   │   │   ├── MyRegistrations.jsx  # Participant hackathon registrations history
│   │   │   │   └── Register.jsx         # Team hackathon registration form
│   │   │   ├── Submission/
│   │   │   │   ├── CreateSubmission.jsx # Project entry form (Approved hackathons only)
│   │   │   │   ├── EditSubmission.jsx   # Project submission editor
│   │   │   │   └── MySubmissions.jsx    # Participant project submissions list
│   │   │   └── Team/
│   │   │       └── TeamPage.jsx         # Dynamic team creation & member management
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx            # Application route registry & RBAC protected routes
│   │   └── services/
│   │       ├── axios.js                 # Axios instance & auth bearer interceptor
│   │       ├── authService.js           # Auth API service calls
│   │       ├── dashboardService.js      # Dashboard metrics API calls
│   │       ├── hackathonService.js      # Hackathon API service calls
│   │       ├── leaderboardService.js    # Leaderboard API service calls
│   │       ├── registrationService.js   # Registration API service calls
│   │       ├── reviewService.js         # Review evaluation API service calls
│   │       ├── submissionService.js     # Project submission API service calls
│   │       ├── teamService.js           # Team API service calls
│   │       └── userService.js           # User/Judge API service calls
│   ├── vercel.json                      # Vercel SPA routing rewrite rules
│   └── package.json
│
└── README.md                            # Comprehensive project documentation
```

---

## 🚀 Local Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/CodeHustle.git
cd CodeHustle
```

### 2. Configure & Start Backend
```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend/` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/codehustle
JWT_SECRET=your_secret_jwt_key
```

Start the backend server:
```bash
npm run dev
# Server will run on http://localhost:5000
```

### 3. Configure & Start Frontend
Open a new terminal window:
```bash
cd Frontend
npm install
```

Create a `.env` file inside the `Frontend/` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the Vite development server:
```bash
npm run dev
# Frontend will run on http://localhost:5173
```

---

## 🌐 Production Deployment

### **Backend (Render)**
1. Host backend code on **Render** (Web Service).
2. Set Root Directory to `Backend`.
3. Set Environment Variables:
   - `MONGO_URI`: MongoDB Atlas Connection String
   - `JWT_SECRET`: Production Secret Key
   - `PORT`: `5000`
4. Build Command: `npm install`
5. Start Command: `npm start`

### **Frontend (Vercel)**
1. Host frontend code on **Vercel**.
2. Set Root Directory to `Frontend`.
3. Set Framework Preset to **Vite**.
4. Set Environment Variable:
   - `VITE_API_URL`: `https://your-render-backend-url.onrender.com/api`

---

## 📜 API Route Endpoints Summary

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register a new user account |
| `POST` | `/api/auth/login` | Public | Login & receive JWT token |
| `GET` | `/api/hackathons` | Public | List all hackathons |
| `POST` | `/api/hackathons` | Organizer | Create a new hackathon |
| `POST` | `/api/teams` | Participant | Create a team with member names |
| `POST` | `/api/registrations` | Participant | Register team for hackathon |
| `PUT` | `/api/registrations/:id/approve` | Organizer | Approve team registration |
| `POST` | `/api/submissions` | Participant | Submit project (Approved team required) |
| `POST` | `/api/reviews` | Judge | Submit / Update project evaluation |
| `GET` | `/api/leaderboard/:hackathonId` | Public | Live hackathon leaderboard rankings |

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).


## Live Link
https://code-hustle-orcin.vercel.app/ 