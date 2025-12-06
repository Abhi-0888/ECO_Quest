"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";

export default function NewQuestPage() {
    const [quest, setQuest] = useState({
        name: "Morning ride to campus",
        description: "Cycle 4 km before 9 AM on three weekdays to earn a health + climate bonus.",
        reward: 120,
        cadence: "weekly",
        startDate: new Date().toISOString().slice(0, 10),
        visibility: "campus",
    });
    const [status, setStatus] = useState("idle");

    function handleChange(key, value) {
        setQuest((prev) => ({ ...prev, [key]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setStatus("saving");
        setTimeout(() => setStatus("saved"), 700);
    }

    return (
        <div className="mx-auto max-w-4xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14">
            <header className="space-y-3">
                <p className="text-xs uppercase tracking-[0.18em] text-emerald-300/80">Quest builder</p>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                    Add a new quest for your community
                </h1>
                <p className="text-sm text-slate-300">
                    Modelled after apps like StepSetGo: define a repeatable challenge, assign a Gbit reward,
                    and publish it so users can join from the dashboard.
                </p>
            </header>

            <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-emerald-900/60 bg-black/60 p-4">
                    <div>
                        <label className="text-xs font-medium text-slate-200">Quest name</label>
                        <input
                            className="mt-2 w-full rounded-xl border border-emerald-900/70 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            value={quest.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="e.g. 10k city cleanup"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-medium text-slate-200">Description</label>
                        <textarea
                            className="mt-2 w-full rounded-xl border border-emerald-900/70 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            rows={3}
                            value={quest.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            placeholder="Tell users what they must do and how verification happens"
                        />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="text-xs font-medium text-slate-200">Reward (Gbits)</label>
                            <input
                                type="number"
                                min={10}
                                className="mt-2 w-full rounded-xl border border-emerald-900/70 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                value={quest.reward}
                                onChange={(e) => handleChange("reward", Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-200">Cadence</label>
                            <select
                                className="mt-2 w-full rounded-xl border border-emerald-900/70 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                value={quest.cadence}
                                onChange={(e) => handleChange("cadence", e.target.value)}
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="seasonal">Seasonal / campaign</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="text-xs font-medium text-slate-200">Start date</label>
                            <input
                                type="date"
                                className="mt-2 w-full rounded-xl border border-emerald-900/70 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                value={quest.startDate}
                                onChange={(e) => handleChange("startDate", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-200">Visibility</label>
                            <select
                                className="mt-2 w-full rounded-xl border border-emerald-900/70 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                value={quest.visibility}
                                onChange={(e) => handleChange("visibility", e.target.value)}
                            >
                                <option value="campus">Campus / company</option>
                                <option value="city">City-wide</option>
                                <option value="global">Global challenge</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 text-[11px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                        <p>Submissions go to your quest orchestration API. This page is mock-only.</p>
                        <div className="flex gap-2">
                            <Link href="/dashboard" className="text-emerald-300 hover:text-emerald-200">
                                Cancel
                            </Link>
                            <Button size="sm" disabled={status === "saving"}>
                                {status === "saving" ? "Saving..." : "Publish quest"}
                            </Button>
                        </div>
                    </div>

                    {status === "saved" && (
                        <p className="text-[11px] text-emerald-300">Quest saved! In production this would POST to your backend.</p>
                    )}
                </form>

                <Card eyebrow="Preview" title="What players will see">
                    <div className="mt-3 space-y-3 text-sm text-slate-200">
                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/80">{quest.cadence} quest</p>
                            <h2 className="text-lg font-semibold text-slate-50">{quest.name}</h2>
                            <p className="text-sm text-slate-400">{quest.description}</p>
                        </div>
                        <div className="rounded-2xl border border-emerald-900/50 bg-emerald-950/40 px-3 py-2 text-xs text-emerald-200">
                            <p>
                                Reward: <span className="font-semibold">+{quest.reward} Gbits</span>
                            </p>
                            <p>Start: {quest.startDate}</p>
                            <p>Visibility: {quest.visibility.toUpperCase()}</p>
                        </div>
                        <p className="text-[11px] text-slate-400">
                            When published, this quest appears in dashboards, push notifications, and the rewards marketplace summary.
                        </p>
                    </div>
                </Card>
            </section>
        </div>
    );
}
