import { useState } from "react";
import { LogIn } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";
import { setAuthToken } from "../services/api";

interface LoginProps {
  onLoginSuccess: (user: any) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      setAuthToken(data.token);
      onLoginSuccess(data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE IMAGE */}
      <div className="hidden md:flex w-1/2 bg-blue-000 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80"
          alt="Login Visual"
          className="w-full h-full object-cover opacity-100 animate-zoom-slow"
        />
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>


        <div className="absolute bottom-12 left-12
">
          <h1 className="text-4xl font-extrabold mb-3 tracking-tight">
            Welcome Back 
          </h1>
          <p className="text-lg text-gray-700 max-w-sm leading-relaxed">
            Your all-in-one platform to manage people, projects, and performance.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE LOGIN FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 animate-fade-in">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-10 w-full max-w-md border border-white/30 animate-scale-in">

          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-4 rounded-2xl shadow-lg">
              <LogIn className="text-white" size={32} />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-1 tracking-tight">
            ERP System
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Sign in to continue
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl shadow-inner">
            <p className="text-sm text-gray-600 font-medium mb-2">
              Test Credentials:
            </p>
            <p className="text-xs text-gray-500">Email: admin@erp.com</p>
            <p className="text-xs text-gray-500">Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
