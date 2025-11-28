"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Eye, EyeOff, ChevronRight } from "lucide-react";
import Toast from "@/app/components/Toast";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/authSlice";
import { AppDispatch, RootState } from "../../store/store";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state?.auth);
  const isLoading = authState?.isLoading ?? false;
  const error = authState?.error;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormData) => {
    // try {
    //   await new Promise((resolve) => setTimeout(resolve, 1000))

    //   // Store user data
    //   localStorage.setItem("user", JSON.stringify({ name: data.email.split("@")[0], email: data.email }))
    //   localStorage.setItem("token", "dummy-token-123")

    //   setToast({ type: "success", message: "Login successful! Redirecting..." })
    //   setTimeout(() => router.push("/dashboard"), 1500)
    // } catch (error) {
    //   setToast({ type: "error", message: "Login failed. Please try again." })
    // } finally {

    // }

    const result = await dispatch(
      login({ email: data.email, password: data.password })
    );
    if (result.meta.requestStatus === "fulfilled") {
      setToast({
        type: "success",
        message: "Login successful! Redirecting...",
      });
      router.push("/dashboard");
    } else {
      setToast({
        type: "error",
        message:
          (result.payload as string) || "Login failed. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center px-4 py-12 pt-24">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
            <p className="text-gray-600">Welcome back to Alpha Furniture</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-colors"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-amber-600 font-semibold hover:text-amber-700 text-sm"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? "Logging in..." : "Login"}
              {!isLoading && <ChevronRight className="ml-2 w-4 h-4" />}
            </button>

            {/* Register Link */}
            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-amber-600 font-semibold hover:text-amber-700"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
