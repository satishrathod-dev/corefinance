"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Login } from "@/config/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false)

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    const reqBody = {
      email: email,
      password: password,
    };

    try {
      setIsLoading(true);

      const response = await Login(reqBody);
      console.log("response from api call", response);

      const { responseCode, responseMessage } = response.data;
      // console.log("login response", response)

      if (responseCode === 200) {
        toast.success("Login successful!!");
        console.log("hii")
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
        setIsSuccess(true);
      }

      setUser({
        email: "",
        password: "",
      });
      // Simulate API call
    } catch (err) {
      console.log("error", err);
      toast.error("Login failed", err);
    } finally {
      setIsLoading(false);
    }

    // setTimeout(() => {
    //   setIsLoading(false);
    //   // For demo purposes only
    //   window.location.href = "/dashboard";
    // }, 1000);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Auth form */}
      <div className="flex w-full flex-col justify-between p-10 align-center h-screen md:w-1/2">
        <div className="mx-auto w-full max-w-md py-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">Sign in to your account</h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-primary hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Image/Illustration */}
      <div className="hidden bg-gradient-to-br from-primary/90 to-primary-foreground/90 md:block md:w-1/2">
        <div className="flex h-full flex-col items-center justify-center p-12 text-white">
          <div className="max-w-md">
            <h2 className="mb-6 text-3xl font-bold">Welcome back to FinCorp</h2>
            <p className="mb-6 text-lg">
              Manage your finances smarter with our powerful dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
