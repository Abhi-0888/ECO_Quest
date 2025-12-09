"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user-context";
import Button from "@/components/ui/button";

export default function BetaSignupPage() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { signup } = useUser();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    const res = await signup({ name, city, email, password });
    setMessage(res.message || "");
    if (res.success) {
      // after signup, send to login
      setTimeout(() => router.push("/login"), 800);
    }
  };

  return (
    <div className="flex min-height-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-emerald-900/60 bg-black/50 p-6 shadow-xl backdrop-blur-xl sm:p-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-50">Create your account</h2>
          <p className="mt-2 text-sm text-slate-400">Sign up to access the app.</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="name" className="text-xs font-medium text-slate-200">Your Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block w-full rounded-xl border border-emerald-900/60 bg-slate-950/50 px-3 py-2 text-slate-100 placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="text-xs font-medium text-slate-200">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full rounded-xl border border-emerald-900/60 bg-slate-950/50 px-3 py-2 text-slate-100 placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-xs font-medium text-slate-200">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full rounded-xl border border-emerald-900/60 bg-slate-950/50 px-3 py-2 text-slate-100 placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
                placeholder="Enter a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="city" className="text-xs font-medium text-slate-200">City / Campus</label>
              <input
                id="city"
                name="city"
                type="text"
                required
                className="mt-1 block w-full rounded-xl border border-emerald-900/60 bg-slate-950/50 px-3 py-2 text-slate-100 placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
                placeholder="e.g. Bengaluru, SRM AP"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" className="w-full text-sm">Sign up</Button>

          {message && <p className="text-center text-xs text-emerald-300">{message}</p>}
        </form>

        <div className="text-center">
          <p className="text-xs text-slate-500">Already have an account? <a href="/login" className="text-emerald-300 underline">Login</a></p>
        </div>
      </div>
    </div>
  );
}