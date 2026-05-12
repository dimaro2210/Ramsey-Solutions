import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import OnboardingModal from "@/components/OnboardingModal";

const signUpSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreeTerms: z.literal(true, {
      errorMap: () => ({ message: "You must agree to the terms" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {},
  });

  const onSubmit = async (data: SignUpForm) => {
    setErrorMsg("");
    const result = await signup({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      accountType: "Individual Trading",
    }, data.password);

    if (result.success) {
      setShowOnboarding(true);
    } else {
      setErrorMsg(result.error || "Sign up failed. Please try again.");
    }
  };

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    setOnboardingComplete(true);
    localStorage.setItem("ramsey_onboarding_done", "true");
    setShowConfirmation(true);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#0073B9] focus:outline-none transition-colors";
  const labelClass = "block text-sm font-bold text-[#0073B9] mb-1";
  const errorClass = "text-red-500 text-xs mt-1";

  if (showConfirmation) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-border p-10 text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-black text-[#0073B9] mb-4">Account Created Successfully!</h2>
          <p className="text-gray-500 mb-3 leading-relaxed">
            Your trading account has been set up and is ready to go. You can now sign in and start exploring the platform.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            Use the email and password you just created to log in.
          </p>
          <button
            onClick={() => navigate("/sign-in")}
            className="w-full bg-[#0073B9] text-white font-bold text-lg py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-md"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      {showOnboarding && <OnboardingModal onClose={handleCloseOnboarding} />}

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-border p-8">
        <div className="flex justify-center mb-4">
          <Link to="/" className="w-12 h-12 block overflow-hidden">
            <img
              src="https://cdn.ramseysolutions.net/media/rscom/logos/flat-blue-50-ramsey-logo.svg"
              alt="Ramsey"
              className="h-12 w-auto max-w-none"
            />
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-center text-[#0073B9] mb-2">
          Create Your Trading Account
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Start investing in stocks today
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {errorMsg && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
              {errorMsg}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>First Name</label>
              <input {...form.register("firstName")} className={inputClass} placeholder="John" />
              {form.formState.errors.firstName && (
                <p className={errorClass}>{form.formState.errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className={labelClass}>Last Name</label>
              <input {...form.register("lastName")} className={inputClass} placeholder="Doe" />
              {form.formState.errors.lastName && (
                <p className={errorClass}>{form.formState.errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className={labelClass}>Email Address</label>
            <input
              {...form.register("email")}
              className={inputClass}
              placeholder="john@example.com"
            />
            {form.formState.errors.email && (
              <p className={errorClass}>{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Phone Number</label>
            <input
              {...form.register("phone")}
              className={inputClass}
              placeholder="(555) 123-4567"
            />
            {form.formState.errors.phone && (
              <p className={errorClass}>{form.formState.errors.phone.message}</p>
            )}
          </div>



          <div>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              autoComplete="new-password"
              {...form.register("password")}
              className={inputClass}
              placeholder="Min. 8 characters"
            />
            {form.formState.errors.password && (
              <p className={errorClass}>{form.formState.errors.password.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Confirm Password</label>
            <input
              type="password"
              autoComplete="new-password"
              {...form.register("confirmPassword")}
              className={inputClass}
              placeholder="Re-enter password"
            />
            {form.formState.errors.confirmPassword && (
              <p className={errorClass}>
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex items-start gap-2 pt-2">
            <input
              type="checkbox"
              {...form.register("agreeTerms")}
              className="mt-1 w-4 h-4 accent-[#0073B9]"
            />
            <label className="text-xs text-gray-600">
              I agree to the{" "}
              <span className="text-[#0073B9] font-medium">
                Terms of Service
              </span>
              ,{" "}
              <span className="text-[#0073B9] font-medium">Privacy Policy</span>
              , and{" "}
              <span className="text-[#0073B9] font-medium">
                Trading Risk Disclosure
              </span>
              . I understand that crypto and stock trading involves risk and I may
              lose money.
            </label>
          </div>
          {form.formState.errors.agreeTerms && (
            <p className={errorClass}>
              {form.formState.errors.agreeTerms.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#FCD214] text-[#0073B9] font-bold text-lg py-4 rounded-xl hover:bg-yellow-300 transition-colors shadow-md mt-2"
          >
            Create Trading Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500 font-medium text-sm">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-[#0073B9] font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

