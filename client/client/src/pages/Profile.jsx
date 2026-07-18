import { useEffect, useState } from "react";
import { FaUserCircle, FaEnvelope, FaUser } from "react-icons/fa";

function Profile() {
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    // Get email from localStorage (set during login/register)
    const storedEmail = localStorage.getItem("userEmail") || "guest@example.com";
    const storedName = localStorage.getItem("userName") || "Guest User";

    setUserEmail(storedEmail);
    setUserName(storedName);
  }, []);

  if (!userEmail) return null; // Wait for data to load

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 text-slate-900 md:p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-2xl font-bold text-slate-900 md:text-3xl">
          My Profile
        </h1>

        <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,.07)] md:p-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center border-b border-slate-100 pb-6">
            <FaUserCircle className="text-8xl text-sky-600 md:text-9xl" />
            <h2 className="mt-4 text-2xl font-bold text-slate-900 md:text-3xl">
              {userName}
            </h2>
            <p className="text-sm text-slate-500 md:text-base">
              MERN Stack Developer
            </p>
          </div>

          {/* Profile Form */}
          <div className="mt-6 grid gap-6 md:grid-cols-2 md:mt-10">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600 md:text-base">
                <FaUser />
                Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100 md:px-5 md:py-4 md:text-base"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600 md:text-base">
                <FaEnvelope />
                Email
              </label>
              <input
                type="email"
                value={userEmail}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100 md:px-5 md:py-4 md:text-base"
                readOnly
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => {
                localStorage.setItem("userName", userName);
                alert("Profile updated!");
              }}
              className="rounded-2xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(14,165,233,.25)] transition-all duration-300 hover:bg-sky-700 hover:scale-[1.01] hover:shadow-[0_14px_30px_rgba(14,165,233,.35)] md:px-8 md:py-4 md:text-base"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;