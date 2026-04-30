import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";


const signInSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type SignInForm = z.infer<typeof signInSchema>;

export default function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: SignInForm) => {
    setErrorMsg("");
    setIsSubmitting(true);
    const result = await login(data.email, data.password);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setErrorMsg(result.error || "Login failed");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-border p-8">
        <div className="flex justify-center mb-6">
          <Link to="/" className="w-12 h-12 block overflow-hidden">
            <img
              src="https://cdn.ramseysolutions.net/media/rscom/logos/flat-blue-50-ramsey-logo.svg"
              alt="Ramsey"
              className="h-12 w-auto max-w-none"
            />
          </Link>
        </div>

        <h2 className="text-3xl font-bold text-center text-[#0073B9] mb-2">
          Sign In
        </h2>
        <p className="text-center text-gray-500 text-sm mb-8">
          Access your trading dashboard
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {errorMsg && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
              {errorMsg}
            </div>
          )}
          <div>
            <label className="block text-sm font-bold text-[#0073B9] mb-2">
              Email Address
            </label>
            <input
              autoComplete="username"
              {...form.register("email")}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#0073B9] focus:outline-none transition-colors"
              placeholder="you@example.com"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-[#0073B9]">
                Password
              </label>
              <span className="text-sm font-semibold text-[#0073B9] cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>
            <input
              type="password"
              autoComplete="current-password"
              {...form.register("password")}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#0073B9] focus:outline-none transition-colors"
              placeholder="••••••••"
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center bg-[#FCD214] text-[#0073B9] font-bold text-lg py-4 rounded-xl hover:bg-yellow-300 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#0073B9]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 font-medium">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="text-[#0073B9] font-bold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

