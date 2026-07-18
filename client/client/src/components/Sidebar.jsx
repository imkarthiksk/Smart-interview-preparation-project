import {
  FaTachometerAlt,
  FaFileAlt,
  FaRobot,
  FaHistory,
  FaUser
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt />
    },
    {
      name: "Resume",
      path: "/resume",
      icon: <FaFileAlt />
    },
    {
      name: "Interview Resources",
      path: "/interview",
      icon: <FaRobot />
    },
    {
      name: "History",
      path: "/history",
      icon: <FaHistory />
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />
    }
  ];

  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-72 border-r border-slate-200 bg-white/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(15,23,42,.06)]">
      <div className="px-6 py-8 border-b border-slate-200">
        <div className="flex items-center gap-3">
          

         <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center justify-center gap-2">
  <span className="inline-block animate-spin [animation-duration:4s]">
    ֎
  </span>
  AI Resume
  Analyzer

</h1>
        </div>
      </div>

      <nav className="mt-6 flex flex-col gap-2 px-4">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-4 rounded-2xl px-4 py-3.5 text-[15px] font-medium transition-all duration-300
              ${
                isActive
                  ? "bg-sky-600 text-white shadow-[0_10px_25px_rgba(14,165,233,.25)]"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              }`
            }
          >
            <span className="text-lg transition-transform duration-300 group-hover:scale-110">
              {item.icon}
            </span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;