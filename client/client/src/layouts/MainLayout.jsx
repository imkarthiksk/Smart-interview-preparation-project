import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Iridescence from "../components/Iridescence"; // ✅ Path check பண்ணுங்க

function MainLayout() {
  return (
    <div className="relative w-full h-full">
      {/* Background - Iridescence */}
      <div className="fixed inset-0 -z-10">
        <Iridescence
          color={[0.6, 0.75, 0.95]} // Sky blue
          speed={1.0}
          amplitude={0.15}
          mouseReact={true}
        />
      </div>

 

      {/* Website Content */}
      <div className="relative z-10 flex">
        <Sidebar />

<div className="ml-64 w-full bg-[#F8FAFC] min-h-screen px-8">
          <Navbar />
          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;