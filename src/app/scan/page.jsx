"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import { useUser } from "@/context/user-context";
import Link from "next/link";

export default function ScanPage() {
    const [actionReference, setActionReference] = useState("TREE-QR-NEEM-0142");
    const [actionType, setActionType] = useState("TREE_PLANT");
    const [stravaActivity, setStravaActivity] = useState("https://www.strava.com/activities/1234567890");
    const [imageEvidence, setImageEvidence] = useState(null);
    const [status, setStatus] = useState("idle");
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const { addGbits, user } = useUser();

    if (!user) {
        return (
            <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-6 px-4 py-20 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-slate-50">
                    Action Scanning
                </h1>
                <p className="text-slate-400">Please log in to verify actions and earn Gbits.</p>
                <Link href="/login">
                    <Button>Go to Login</Button>
                </Link>
            </div>
        );
    }

    async function onSubmit(e) {
        e.preventDefault();
        setStatus("loading");
        setError(null);
        setResult(null);

        try {
            const res = await fetch("/api/scan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    actionReference,
                    actionType,
                    stravaActivity,
                    photoEvidence: imageEvidence?.name ?? null,
                }),
            });
            if (!res.ok) throw new Error("Request failed");
            const json = await res.json();

            setResult(json.data);

            // Log the action to context
            addGbits(
                json.data.estimatedGbits,
                json.data.actionReference,
                json.data.actionType,
                "App Log"
            );

            setStatus("done");
        } catch (err) {
            console.error(err);
            setStatus("error");
            setError("Mock only: in production this would call a secured ingestion API backed by eco-actions.");
        }
    }

    return (
        <div className="mx-auto max-w-4xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14">
            <header className="space-y-2">
                <p className="text-xs uppercase tracking-[0.18em] text-emerald-300/80">
                    Action scan demo
                </p>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                    Simulate logging a new eco-action.
                </h1>
                <p className="max-w-2xl text-sm text-slate-300">
                    Enter a short reference and action type to see how Hara Bhara would
                    estimate Gbits for a single sustainability action.
                </p>
            </header>

            <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                <form
                    onSubmit={onSubmit}
                    className="space-y-4 rounded-2xl border border-emerald-900/70 bg-black/50 p-4 shadow-lg shadow-emerald-950/40"
                >
                    <div>
                        <label className="text-xs font-medium text-slate-200">
                            Action reference or note
                        </label>
                        <p className="text-[11px] text-slate-400">
                            For example: &quot;Hostel A recycling&quot;, &quot;Neem tree planting&quot;,
                            &quot;Cycle commute to office&quot;.
                        </p>
                        <input
                            className="mt-2 w-full rounded-xl border border-emerald-900/70 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            value={actionReference}
                            onChange={(e) => setActionReference(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-xs font-medium text-slate-200">
                            Action type
                        </label>
                        <select
                            className="mt-2 w-full rounded-xl border border-emerald-900/70 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            value={actionType}
                            onChange={(e) => setActionType(e.target.value)}
                        >
                            <option value="TREE_PLANT">Tree planting</option>
                            <option value="RECYCLE_SMART_BIN">Recycling drop</option>
                            <option value="WATER_SAVE">Water-saving routine</option>
                            <option value="ACTIVE_TRANSPORT">Cycling / walking commute</option>
                        </select>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                        <div>
                            <label className="text-xs font-medium text-slate-200">
                                Upload evidence photo
                            </label>
                            <p className="text-[11px] text-slate-400">
                                Snap a quick pic of the action (tree you planted, clean-up pile, bike odometer).
                            </p>
                            <input
                                type="file"
                                accept="image/*"
                                className="mt-2 w-full rounded-xl border border-emerald-900/70 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 file:mr-3 file:rounded-lg file:border-none file:bg-emerald-500/20 file:px-3 file:py-1 file:text-[11px] file:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                onChange={(e) => setImageEvidence(e.target.files?.[0] ?? null)}
                            />
                            {imageEvidence && (
                                <p className="mt-1 text-[11px] text-emerald-300">
                                    Selected: {imageEvidence.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-xs font-medium text-slate-200">
                                Share Strava activity link
                            </label>
                            <p className="text-[11px] text-slate-400">
                                Paste a Strava &quot;Share Activity&quot; URL—perfect for runs, rides, or walks contributing to your impact.
                            </p>
                            <input
                                className="mt-2 w-full rounded-xl border border-emerald-900/70 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                value={stravaActivity}
                                onChange={(e) => setStravaActivity(e.target.value)}
                                placeholder="https://www.strava.com/activities/..."
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-[11px] text-slate-400">
                        <p>
                            This page sends a POST request to <code className="text-emerald-300">/api/scan</code>.
                        </p>
                        <Button size="sm" disabled={status === "loading"}>
                            {status === "loading" ? "Verifying..." : "Verify action"}
                        </Button>
                    </div>

                    {error && (
                        <p className="text-[11px] text-amber-300">
                            {error}
                        </p>
                    )}
                </form>

                <Card eyebrow="Result" title="Verification output">
                    {status === "idle" && (
                        <p className="mt-2 text-xs text-slate-400">
                            Submit the form to verify your action and earn Gbits instantly.
                        </p>
                    )}

                    {status === "loading" && (
                        <p className="mt-2 text-xs text-slate-300">Verifying action...</p>
                    )}

                    {status === "done" && result && (
                        <div className="mt-2 space-y-2 text-xs text-slate-200">
                            <div className="mb-4 rounded-lg bg-emerald-900/30 p-2 text-center text-sm font-bold text-emerald-300">
                                +{result.estimatedGbits} Gbits Added to Wallet!
                            </div>
                            <p>
                                <span className="text-slate-400">Action reference:</span> {" "}
                                {result.actionReference}
                            </p>
                            <p>
                                <span className="text-slate-400">Action type:</span> {" "}
                                {result.actionType}
                            </p>

                            <p className="text-[11px] text-slate-400">{result.message}</p>

                            <Link href="/dashboard">
                                <Button size="sm" variant="secondary" className="mt-2 w-full">
                                    Check Dashboard
                                </Button>
                            </Link>
                        </div>
                    )}

                    {status === "error" && !result && (
                        <p className="mt-2 text-xs text-amber-300">
                            {error}
                        </p>
                    )}
                </Card>
            </section>
        </div>
    );
}
