"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Mail, Lock, User, AlertCircle, Check, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ThemeToggle } from "@/components/theme-toggle";
import axios from "axios";
import { Registration } from "@/config/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  // const [firstName, setFirstName] = useState("")
  // const [lastName, setLastName] = useState("")
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    fullname: {
      firstName: "",
      lastName: "",
    },
    password: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form
    if (
      !user.fullname.firstName ||
      !user.fullname.lastName ||
      !user.email ||
      !user.password ||
      !confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (user.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (user.password.length < 6) {
      // will add regex for password here later
      setError("Password must be at least 6 characters");
      return;
    }
    const req = {
      fullname: {
        firstName: user.fullname.firstName,
        lastName: user.fullname.lastName,
      },
      email: user.email,
      password: user.password,
    };

    try {
      setIsLoading(true);

      const response = await Registration(req);
      // console.log("response from api call", response);
      // const responseData = response.json()
      if (response.error) {
        toast.error(response.error.message || "registration failed");
        return;
      }

      toast.success("Registration successful!!");
      setTimeout(() => {
        router.push("/");
      }, 2000);
      setIsSuccess(true);

      setUser({
        email: "",
        fullname: { firstName: "", lastName: "" },
        password: "",
      });
      setConfirmPassword(""); // <-- add this
      setError(""); // <-- optional, clears previous error if any
    } catch (err) {
      toast.error("registration failed" + err.message);
      console.log("error", err);
    } finally {
      setIsLoading(false);
    }

    // const newUser = {
    //   fullname: {
    //     firstName: firstName,
    //     lastName: lastName,
    //   },
    //   email: user.email,
    //   password: user.password,
    // };

    // console.log("user", newUser);

    // const response = await axios.post(
    //   "http://localhost:8000/api/register",
    //   user
    // );
    // console.log("response", response);

    // This would connect to your register API

    // setIsLoading(true);
    // // Simulate API call
    // setTimeout(() => {
    //   setIsLoading(false);
    //   // For demo purposes only
    //   window.location.href = "/dashboard";
    // }, 1000);
  };

  const handleNameChange = (e) => {
    setUser((prev) => ({
      ...prev,
      fullname: {
        ...prev.fullname,
        firstName: e.target.value,
      },
    }));
  };

  const handleLastnamechange = (e) => {
    setUser((prev) => ({
      ...prev,
      fullname: {
        ...prev.fullname,
        lastName: e.target.value,
      },
    }));
  };

  const handleEmailChange = (e) => {
    setUser((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setUser((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  if (isSuccess) {
    return (
      <div className="animate-bounce-in text-center space-y-6">
        <Alert className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 shadow-lg">
          <Check className="h-5 w-5 text-green-600" />
          <AlertDescription className="text-base font-medium">
            🎉 Account created successfully! Redirecting to login page...
          </AlertDescription>
        </Alert>

        {/* Spinner with message */}
        <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
          <svg
            className="h-5 w-5 animate-spin text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          Redirecting...
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Auth form */}
      <div className="flex w-full flex-col justify-between p-10 md:w-1/2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary"></div>
            <span className="text-xl font-bold">FinCorp</span>
          </div>
          <ThemeToggle />
        </div>

        <div className="mx-auto w-full max-w-md py-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">Create an account</h1>
            <p className="text-muted-foreground">
              Enter your information to get started
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">
                  First name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="firstName"
                    placeholder="Firstname"
                    className="pl-10"
                    value={user.fullname.firstName}
                    onChange={handleNameChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">
                  Last name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="lastName"
                    placeholder="Lastname"
                    className="pl-10"
                    value={user.fullname.lastName}
                    onChange={handleLastnamechange}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10"
                  value={user.email}
                  onChange={handleEmailChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  value={user.password}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Must be at least 6 characters long
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              // onClick={handleSubmit}
            >
              {isLoading ? "Creating account..." : "Create account"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} FinDash. All rights reserved.
        </div>
      </div>

      {/* Right side - Image/Illustration */}
      <div className="hidden bg-gradient-to-br from-primary/90 to-primary-foreground/90 md:block md:w-1/2">
        <div className="flex h-full flex-col items-center justify-center p-12 text-white">
          <div className="max-w-md">
            <h2 className="mb-6 text-3xl font-bold">
              Take control of your financial future
            </h2>
            <p className="mb-6 text-lg">
              Join thousands of users who are already managing their finances
              smarter with our powerful dashboard.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p>Free 14-day trial, no credit card required</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p>Comprehensive financial tracking tools</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p>Personalized financial insights</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p>Bank-level security for your data</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
