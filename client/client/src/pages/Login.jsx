import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { loginUser } from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await loginUser(formData);
    console.log(JSON.stringify(res.data, null, 2));
    // Save JWT
    localStorage.setItem("token", res.data.token);

    // Save User Details
    localStorage.setItem("userId", res.data.user._id);
    localStorage.setItem("userName", res.data.user.name);
    localStorage.setItem("userEmail", res.data.user.email);

    alert(res.data.message);

    navigate("/dashboard");
  } catch (error) {
    console.log(error);
    console.log(error.response);

    alert(error.response?.data?.message || "Login Failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-[#f8fafc]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#dbeafe_0%,transparent_45%)]"></div>

      <div className="relative w-full max-w-md rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,.08)] p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="mx-auto mb-5 w-16 h-16 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center shadow-sm">
            <span className="text-3xl">֎🇦🇮</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            AI Resume Analyzer
          </h1>

          <p className="text-slate-500 mt-3 text-sm md:text-base">
            Login to Continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-slate-700 mb-2 block text-sm font-medium">
              Email
            </label>

            <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-1 transition focus-within:border-sky-400 focus-within:ring-4 focus-within:ring-sky-100">
              <FaEnvelope className="text-sky-600 mr-3 text-lg shrink-0" />
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full py-3 outline-none bg-transparent text-slate-800 placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-slate-700 mb-2 block text-sm font-medium">
              Password
            </label>

            <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-1 transition focus-within:border-sky-400 focus-within:ring-4 focus-within:ring-sky-100">
              <FaLock className="text-sky-600 mr-3 text-lg shrink-0" />
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full py-3 outline-none bg-transparent text-slate-800 placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="
            w-full py-3.5 rounded-2xl font-semibold text-white
            bg-sky-600
            shadow-[0_10px_25px_rgba(14,165,233,.25)]
            hover:bg-sky-700
            hover:shadow-[0_14px_30px_rgba(14,165,233,.35)]
            hover:scale-[1.01]
            transition-all duration-300
          "
          >
            Login
          </button>
        </form>

        <p className="text-center text-slate-500 mt-6 text-sm">
          Don&apos;t have an account?
          <Link
            to="/register"
            className="ml-2 font-semibold text-sky-700 hover:text-sky-800 underline underline-offset-4"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
