import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login({ email, password });
    if (success) {
      if (email === "admin@example.com") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex items-center justify-center mb-6">
          <div className="h-px bg-primary-900 flex-1 mx-4"></div>
          <h2 className="text-3xl font-serif font-bold uppercase text-primary-900">
            Sign In
          </h2>
          <div className="h-px bg-primary-900 flex-1 mx-4"></div>
        </div>
        <div>
          <h3 className="sr-only">Sign in to your account</h3>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-primary-900 rounded-lg px-8 py-10 shadow-md space-y-6"
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 rounded-t-md focus:outline-none focus:ring-2 focus:ring-accent-600 focus:border-accent-600 placeholder-gray-400 text-primary-900 font-serif"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 rounded-b-md focus:outline-none focus:ring-2 focus:ring-accent-600 focus:border-accent-600 placeholder-gray-400 text-primary-900 font-serif"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md bg-accent-600 text-white font-medium hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-accent-600"
            >
              Sign In
            </button>
          </div>

          <div className="text-center text-sm">
            <span className="text-primary-600 mr-1">
              Don't have an account?
            </span>
            <Link
              to="/signup"
              className="text-accent-600 font-semibold hover:text-accent-700"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
