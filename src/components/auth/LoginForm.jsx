import { useState } from "react";
import { FiUser, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = ({ error2, onSubmit }) => {

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [focused, setFocused] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(error2);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await onSubmit?.(formData);
      toast.success("Login successfully!")

    } catch (err) {
      const erroMessage = err?.message;
      if (err?.status == 401) {
        setError("Invalid credentials. Try again.")
      }
      else {
        setError(err?.message || "Invalid credentials. Try again.");

      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-gray-900 border border-cyan-900 rounded-2xl p-8">

        <div className="flex flex-col items-center mb-8">

          <div className="w-16 h-16 rounded-full bg-cyan-950 border-2 border-cyan-500
                          flex items-center justify-center mb-4">
            <IoChatbubbleEllipsesOutline size={30} className="text-cyan-400" />
          </div>

          <h1 className="text-3xl font-bold tracking-widest text-white uppercase">
            Nex<span className="text-cyan-400">Chat</span>
          </h1>

          <p className="text-xs text-cyan-800 mt-1 tracking-widest font-mono uppercase">
            welcome back
          </p>

        </div>

        {error && (
          <div className="flex items-center gap-3 bg-red-950 border border-red-800
                          rounded-xl px-4 py-3 mb-6">
            <FiAlertCircle size={16} className="text-red-400 shrink-0" />
            <span className="text-red-400 text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div className="flex flex-col gap-2">

            <label className="text-xs text-cyan-700 tracking-widest font-mono uppercase">
              username
            </label>

            <div className="relative">

              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <FiUser
                  size={17}
                  className={`transition-colors duration-200
                    ${focused === "username" ? "text-cyan-400" : "text-cyan-800"}`}
                />
              </div>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onFocus={() => setFocused("username")}
                onBlur={() => setFocused("")}
                placeholder="enter your username"
                autoComplete="username"
                className={`w-full font-mono text-sm text-cyan-100 placeholder-gray-600
                            bg-gray-800 rounded-xl pl-10 pr-4 py-3
                            border outline-none transition-all duration-200
                            ${focused === "username"
                    ? "border-cyan-500 bg-gray-950 ring-1 ring-cyan-500"
                    : "border-gray-700 hover:border-gray-600"
                  }`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">

            <label className="text-xs text-cyan-700 tracking-widest font-mono uppercase">
              password
            </label>

            <div className="relative">

              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <FiLock
                  size={17}
                  className={`transition-colors duration-200
                    ${focused === "password" ? "text-cyan-400" : "text-cyan-800"}`}
                />
              </div>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused("")}
                placeholder="enter your password"
                autoComplete="current-password"
                className={`w-full font-mono text-sm text-cyan-100 placeholder-gray-600
                            bg-gray-800 rounded-xl pl-10 pr-12 py-3
                            border outline-none transition-all duration-200
                            ${focused === "password"
                    ? "border-cyan-500 bg-gray-950 ring-1 ring-cyan-500"
                    : "border-gray-700 hover:border-gray-600"
                  }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2
                           text-gray-500 hover:text-cyan-400 transition-colors duration-200"
              >
                {showPassword
                  ? <FiEyeOff size={17} />
                  : <FiEye size={17} />
                }
              </button>

            </div>
          </div>

          <div className="flex justify-end -mt-2">
            <button
              type="button"
              className="text-xs text-cyan-800 hover:text-cyan-500
                         font-mono tracking-wider transition-colors duration-200"
            >
              forgot_password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-cyan-500 hover:bg-cyan-400
                       disabled:bg-cyan-900 disabled:text-cyan-700 disabled:cursor-not-allowed
                       text-gray-950 font-bold text-base tracking-widest uppercase
                       rounded-xl py-3 transition-all duration-200
                       hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? (

              <span className="flex items-center justify-center gap-2">

                <span className="font-mono text-sm text-cyan-300">
                  authenticating...
                </span>
              </span>

            ) : (
              "Login"
            )}
          </button>

        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-800" />
          <span className="text-xs text-gray-600 font-mono tracking-widest">or</span>
          <div className="flex-1 h-px bg-gray-800" />
        </div>

        <p className="text-center text-sm text-gray-500">
          No account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-cyan-400 font-semibold hover:text-cyan-300
                       transition-colors duration-200
                       underline underline-offset-4"
          >
            Create one
          </button>
        </p>

      </div>
    </div>
  );
};

export default LoginForm;