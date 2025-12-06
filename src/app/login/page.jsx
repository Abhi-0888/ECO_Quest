"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user-context";
import Button from "@/components/ui/button";

export default function LoginPage() {
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const { login } = useUser();
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !city) return;

        login(name, city);
        router.push("/dashboard");
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
                            <label htmlFor="name" className="text-xs font-medium text-slate-200">
                                Your Name
                            </label>
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
                            <label htmlFor="city" className="text-xs font-medium text-slate-200">
                                City / Campus
                            </label>
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

                    <Button type="submit" className="w-full text-sm">
                        Start Earning Gbits
                    </Button>

                    <p className="text-center text-xs text-slate-500">
                        This is a demo. No password required.
                    </p>
                </form>
            </div>
        </div>
    );
}
