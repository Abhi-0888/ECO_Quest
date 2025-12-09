"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user-context";
import Button from "@/components/ui/button";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useUser();
    const router = useRouter();

    const [error, setError] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) return;

        const res = await login(email, password);
        if (res?.success) {
            router.push("/dashboard");
        } else {
            setError(res?.message || "Login failed. Please sign up first.");
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
            <div className="w-full max-w-md space-y-8 rounded-2xl border border-emerald-900/60 bg-black/50 p-6 shadow-xl backdrop-blur-xl sm:p-10">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-50">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-slate-400">
                        Sign in to track your green impact
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email" className="text-xs font-medium text-slate-200">
                                Email
                            </label>
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
                            <label htmlFor="password" className="text-xs font-medium text-slate-200">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="mt-1 block w-full rounded-xl border border-emerald-900/60 bg-slate-950/50 px-3 py-2 text-slate-100 placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full text-sm">
                        Login
                    </Button>

                    {error && (
                        <p className="text-center text-xs text-red-300 mt-2">{error} <a href="/beta-signup" className="text-emerald-300 underline">Sign up</a></p>
                    )}

                    <p className="text-center text-xs text-slate-500">
                        New here? <a href="/beta-signup" className="text-emerald-300 underline">Create an account</a>
                    </p>
                </form>
            </div>
        </div>
    );
}
