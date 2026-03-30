import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const { toast } = useToast();
  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpForm) => {
    console.log(data);
    toast({
      title: "Account Created",
      description: "Welcome to Ramsey Solutions! (Mock signup)",
    });
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-border p-8">
        <div className="flex justify-center mb-6">
          <img
            className="h-10 w-auto"
            src="https://cdn.ramseysolutions.net/media/rscom/logos/flat-blue-50-ramsey-logo.svg"
            alt="Ramsey Solutions"
          />
        </div>
        
        <h2 className="text-2xl font-bold text-center text-primary mb-8">Create Your Free Account</h2>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-primary mb-1">First Name</label>
              <input
                {...form.register("firstName")}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-secondary focus:outline-none transition-colors"
              />
              {form.formState.errors.firstName && <p className="text-destructive text-xs mt-1">{form.formState.errors.firstName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-primary mb-1">Last Name</label>
              <input
                {...form.register("lastName")}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-secondary focus:outline-none transition-colors"
              />
              {form.formState.errors.lastName && <p className="text-destructive text-xs mt-1">{form.formState.errors.lastName.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-primary mb-1">Email Address</label>
            <input
              {...form.register("email")}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-secondary focus:outline-none transition-colors"
            />
            {form.formState.errors.email && <p className="text-destructive text-xs mt-1">{form.formState.errors.email.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-bold text-primary mb-1">Password</label>
            <input
              type="password"
              {...form.register("password")}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-secondary focus:outline-none transition-colors"
            />
            {form.formState.errors.password && <p className="text-destructive text-xs mt-1">{form.formState.errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-primary font-bold text-lg py-4 rounded-xl hover:bg-yellow-300 transition-colors shadow-md mt-4"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground font-medium text-sm">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-secondary font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
