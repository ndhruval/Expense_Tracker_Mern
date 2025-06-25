import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import React, { useState, useContext } from "react";
import { validateEmail } from "../../utils/helper"; // Ensure this is defined
import axiosInstance from "../../utils/axiosInstance"; // Ensure axios instance is set up
import { API_PATHS } from "../../utils/apiPaths"; // Ensure the path is correct
import { UserContext } from "../../context/UserContext"; // Ensure context import is correct
import { LuUser } from "react-icons/lu";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(UserContext); // UserContext to update user data
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError(""); // Clear any previous error
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token); // Store token in localStorage
        updateUser(user); // Update the user context
        navigate("/dashboard"); // Navigate to the dashboard after successful login
      }
    } catch (error) {
      console.error("Login error:", error); // Log the error for debugging
      if (error.response && error.response.data.message) {
        setError(error.response.data.message); // Set error from backend response
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center animate-fade-in-up">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
              <LuUser className="text-2xl text-indigo-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold gradient-text mb-1">Welcome Back</h3>
              <p className="text-gray-700 text-lg">
                Sign in to your account to continue managing your finances
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button 
            type="submit" 
            className="btn-primary flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner w-4 h-4"></div>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>

          <div className="text-center pt-4">
            <p className="text-gray-700">
              Don't have an account?{" "}
              <Link className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-200" to="/signup">
                Create Account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Login;
