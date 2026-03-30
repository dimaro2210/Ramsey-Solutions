import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type SignInForm = z.infer<typeof signInSchema>;

export default function SignIn() {
  const { toast } = useToast();
  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" }
  });

  const onSubmit = (data: SignInForm) => {
    console.log(data);
    toast({
      title: "Signed In",
      description: "Welcome back! (Mock login)",
    });
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-border p-8">
        <div className="flex justify-center mb-8">
          <img
            className="h-12 w-auto"
            src="https://cdn.ramseysolutions.net/media/rscom/logos/flat-blue-50-ramsey-logo.svg"
            alt="Ramsey Solutions"
          />
        </div>
        
        <h2 className="text-3xl font-bold text-center text-primary mb-8">Sign In</h2>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-primary mb-2">Email Address</label>
            <input
              {...form.register("email")}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-secondary focus:outline-none transition-colors"
              placeholder="you@example.com"
            />
            {form.formState.errors.email && (
              <p className="text-destructive text-sm mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-primary">Password</label>
              <a href="#" className="text-sm font-semibold text-secondary hover:underline">Forgot password?</a>
            </div>
            <input
              type="password"
              {...form.register("password")}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-secondary focus:outline-none transition-colors"
              placeholder="••••••••"
            />
            {form.formState.errors.password && (
              <p className="text-destructive text-sm mt-1">{form.formState.errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-primary font-bold text-lg py-4 rounded-xl hover:bg-yellow-300 transition-colors shadow-md"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground font-medium">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-secondary font-bold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
