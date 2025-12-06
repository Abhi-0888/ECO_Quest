"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";

export default function ContactPage() {
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState(null);

    async function onSubmit(e) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        setStatus("sending");
        setError(null);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                body: JSON.stringify({
                    name: formData.get("name"),
                    email: formData.get("email"),
                    org: formData.get("org"),
                    message: formData.get("message"),
                }),
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error("Request failed");

            setStatus("success");
            form.reset();
        } catch (err) {
            console.error(err);
            setStatus("error");
            setError("Mock-only endpoint: in production this would create a ticket or send an email.");
        }
    }

    return (
        <div className="mx-auto max-w-4xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14">
            <header className="space-y-3">
                <p className="text-xs uppercase tracking-[0.18em] text-emerald-300/80">
                    Contact & support
                </p>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                    Talk to the Hara Bhara team.
                </h1>
                <p className="max-w-2xl text-sm text-slate-300">
                    Share a pilot idea, ask about integrations, or just tell us how you
                    would like to use Gbits and eco-actions to nudge your community.
                </p>
            </header>

            <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                <form
                    onSubmit={onSubmit}
                    className="space-y-4 rounded-2xl border border-emerald-900/70 bg-black/60 p-4 shadow-lg shadow-emerald-950/40"
                >
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="text-xs font-medium text-slate-200" htmlFor="name">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                required
                                className="mt-1 w-full rounded-xl border border-emerald-900/70 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                placeholder="Aarav Sharma"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-200" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="mt-1 w-full rounded-xl border border-emerald-900/70 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-medium text-slate-200" htmlFor="org">
                            Organisation / community (optional)
                        </label>
                        <input
                            id="org"
                            name="org"
                            className="mt-1 w-full rounded-xl border border-emerald-900/70 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            placeholder="Campus, society or company name"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-medium text-slate-200" htmlFor="message">
                            How would you like to use Hara Bhara?
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={4}
                            className="mt-1 w-full rounded-xl border border-emerald-900/70 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            placeholder="Tell us about your community, the kind of eco-actions you want to track, and any tools you already use."
                        />
                    </div>

                    <div className="flex items-center justify-between gap-3 text-[11px] text-slate-400">
                        <p className="text-sm text-slate-300">
                            Replace this form with your CRM, helpdesk or support workflow when you go live.
                        </p>
                        <Button size="sm" disabled={status === "sending"}>
                            {status === "sending" ? "Sending..." : "Send message"}
                        </Button>
                    </div>

                    {status === "success" && (
                        <p className="text-[11px] text-emerald-300">
                            Thanks for reaching out! This is a demo-only response.
                        </p>
                    )}
                    {status === "error" && error && (
                        <p className="text-[11px] text-amber-300">{error}</p>
                    )}
                </form>

                <Card eyebrow="Support" title="What happens in production?">
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                        <li>This form would create a ticket in your helpdesk or CRM.</li>
                        <li>
                            Messages can be routed by campus, city or organisation type for
                            faster onboarding.
                        </li>
                        <li>
                            For pilots, you can pre-configure campaigns and pilot
                            locations.
                        </li>
                    </ul>
                </Card>
            </section>
        </div>
    );
}
