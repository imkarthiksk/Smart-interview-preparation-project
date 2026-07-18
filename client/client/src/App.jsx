import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";
import Interview from "./pages/Interview";
import InterviewResources from "./pages/InterviewResources";
import History from "./pages/History";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";
import InterviewGenerator from "./pages/InterviewGenerator";
import CompanyInterview from "./pages/CompanyInterview";
import InterviewCompleted from "./pages/InterviewCompleted";
import Report from "./pages/Report";
import Iridescence from "./components/Iridescence";

function App() {
 return (
    <div className="relative w-full h-full">
      {/* Background - Iridescence (Sky Blue Theme) */}
      <div className="fixed inset-0 -z-10">
        <Iridescence
          color={[0.6, 0.75, 0.95]} // Sky blue
          speed={1.0}
          amplitude={0.15}
          mouseReact={true}
        />
      </div>
    {/* Routes */}
    <div className="relative z-10">
      <Routes>

        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/interview-generator" element={<InterviewGenerator />} />
          <Route path="/company-interview" element={<CompanyInterview />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/interview-completed" element={<InterviewCompleted />} />
          <Route path="/interview-resources" element={<InterviewResources />} />
          <Route path="/history" element={<History />} />
          <Route path="/report" element={<Report />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </div>

  </div>
);
}
export default App;