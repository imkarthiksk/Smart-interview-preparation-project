import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    navigate("/login");

  };

   return (
    <div className="h-16  border-slate-200 bg-white/70 backdrop-blur-xl px-4 md:px-6">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
            SmartHire AI
          </h2>
          <p className="text-xs text-slate-500">
            Welcome Back 👋
          </p>
        </div>

        <div className="flex items-center gap-4">
          <FaBell
            className="cursor-pointer text-xl text-slate-600 hover:text-slate-900"
          />

          <img
            src="https://ui-avatars.com/api/?name=User&background=2563eb&color=fff"
            alt="Profile"
            className="h-9 w-9 rounded-full border border-slate-200 shadow-sm md:h-10 md:w-10"
          />

          <button
            onClick={() => navigate("/profile")}
            className="hidden rounded-lg border border-sky-600 px-4 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-50 md:inline-block"
          >
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;