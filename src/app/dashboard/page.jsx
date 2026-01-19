"use client";

import Link from "next/link";
import { useUser } from "@/context/user-context";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function DashboardPage() {
    const { user, actions, leaderboard } = useUser();

    // If not client-side yet or not logged in, we might show loading or empty state
    // But since we are updating to functional, let's assume if !user we show a message
    if (!user) {
        return (
            <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-6 px-4 py-20 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-slate-50">
                    Please log in to view your dashboard
                </h1>
                <Link href="/login">
                    <Button>Go to Login</Button>
                </Link>
            </div>
        );
    }

    const levelProgress = Math.min(
        100,
        Math.round((user.gbitsTotal / user.nextLevelAt) * 100)
    );

    return (
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-emerald-300/80">
                        My Dashboard
                    </p>
                    <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                        Hi {user.name}, here is your green impact.
                    </h1>
                    <p className="mt-2 max-w-xl text-sm text-slate-300">
                        Track your Gbits, verify actions, and climb the leaderboard.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/scan">
                        <Button size="sm">Log new action</Button>
                    </Link>
                    <Link href="/quests/new">
                        <Button variant="secondary" size="sm">Add quest</Button>
                    </Link>
                </div>
            </header>

            <section className="mt-8 grid gap-4 md:grid-cols-4">
                <Card eyebrow="Gbits" title="Total balance" value={`${user.gbitsTotal.toLocaleString()} GB`} />
                <Card
                    eyebrow="This week"
                    title="Earned Gbits"
                    value={`+${user.gbitsThisWeek} GB`}
                />
                <Card
                    eyebrow="Green streak"
                    title="Active days"
                    value={`${user.streakDays} days`}
                />
                <Card
                    eyebrow="Impact snapshot"
                    title="Key eco-actions"
                    value={`${user.treesPlanted} trees planted`}
                >
                    +{user.smartBinDrops} recycling / clean-up actions
                </Card>
            </section>

            <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                <div>
                    <div className="flex items-center justify-between gap-3">
                        <h2 className="text-sm font-semibold text-slate-100">
                            Recent verified actions
                        </h2>
                        <p className="text-[11px] text-slate-400">
                            Your latest sustainability actions.
                        </p>
                    </div>
                    <div className="mt-3 overflow-hidden rounded-2xl border border-emerald-900/70 bg-black/40">
                        {actions.length === 0 ? (
                            <div className="p-8 text-center text-sm text-slate-400">
                                No actions logged yet. Go to <Link href="/scan" className="text-emerald-400 underline">Scan</Link> to add one!
                            </div>
                        ) : (
                            <table className="min-w-full text-left text-xs text-slate-300">
                                <thead className="border-b border-emerald-900/70 bg-emerald-950/40 text-[11px] uppercase tracking-[0.16em] text-emerald-200">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">Action</th>
                                        <th className="px-4 py-3 font-medium">Location</th>
                                        <th className="px-4 py-3 font-medium">Verified via</th>
                                        <th className="px-4 py-3 font-medium">When</th>
                                        <th className="px-4 py-3 text-right font-medium">Gbits</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {actions.map((action) => (
                                        <tr
                                            key={action.id}
                                            className="border-b border-emerald-900/40 last:border-0 hover:bg-emerald-950/40"
                                        >
                                            <td className="px-4 py-3 text-xs font-medium text-slate-100">
                                                {action.type}
                                                <p className="mt-0.5 text-[11px] font-normal text-slate-400">
                                                    {action.description}
                                                </p>
                                            </td>
                                            <td className="px-4 py-3 text-xs text-slate-300">
                                                {action.location}
                                            </td>
                                            <td className="px-4 py-3 text-xs text-emerald-200">
                                                {action.verification}
                                            </td>
                                            <td className="px-4 py-3 text-xs text-slate-400">
                                                {formatDate(action.date)}
                                            </td>
                                            <td className="px-4 py-3 text-right text-xs font-semibold text-emerald-300">
                                                +{action.gbits}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <Card eyebrow="Quest of the day" title="Smart Commute Mission">
                        <div className="mt-2 space-y-3">
                            <p className="text-xs text-slate-400">
                                Travel at least 2km by walking or cycling today to earn a bonus streak multiplier.
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-medium text-emerald-400">Progress: 1.2 / 2.0 km</span>
                                <span className="text-[11px] text-slate-500">60%</span>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-emerald-950/70">
                                <div className="h-full bg-emerald-500" style={{ width: "60%" }} />
                            </div>
                            <Link href="/scan" className="block">
                                <Button size="sm" variant="secondary" className="w-full">Update Progress</Button>
                            </Link>
                        </div>
                    </Card>

                    <Card eyebrow="Level" title={`Level ${user.level}`}>
                        <div className="mt-2">
                            <div className="flex items-center justify-between text-[11px] text-slate-400">
                                <span>
                                    {user.gbitsTotal} / {user.nextLevelAt} Gbits
                                </span>
                                <span className="text-emerald-300">{levelProgress}%</span>
                            </div>
                            <div className="mt-2 h-2 overflow-hidden rounded-full bg-emerald-950/70">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-lime-300 to-teal-300"
                                    style={{ width: `${levelProgress}%` }}
                                />
                            </div>
                            <p className="mt-2 text-[11px] text-slate-400">
                                Keep your streak alive to unlock weekly multipliers and bonus
                                Gbits.
                            </p>
                        </div>
                    </Card>

                    <Card eyebrow="Leaderboard" title="Top green contributors">
                        <ul className="mt-3 space-y-2 text-xs text-slate-200">
                            {leaderboard.map((entry) => (
                                <li
                                    key={entry.id}
                                    className="flex items-center justify-between gap-2 rounded-xl border border-emerald-900/60 bg-emerald-950/40 px-2.5 py-2"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <span className="text-[11px] text-slate-400">
                                            #{entry.rank ?? "-"}
                                        </span>
                                        <div
                                            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold text-emerald-950 ${entry.avatarColor}`}
                                        >
                                            {entry.name[0]}
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-slate-100">
                                                {entry.name}
                                            </p>
                                            <p className="text-[11px] text-slate-400">
                                                {entry.city} · {entry.streakDays} day streak
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-semibold text-emerald-300">
                                            {entry.gbits.toLocaleString()} GB
                                        </p>
                                        <p className="text-[11px] text-slate-400">{entry.rewardsClaimed ?? 0} rewards</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    <Card eyebrow="Feedback" title="Tell us what you would track">
                        <p className="mt-2 text-[11px] text-slate-400">
                            In a live deployment, this widget could post to an internal
                            feedback API or product board.
                        </p>
                        <textarea
                            className="mt-2 w-full rounded-xl border border-emerald-900/70 bg-black/60 p-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            rows={3}
                            placeholder="e.g. Metered water usage in my hostel block, campus shuttle usage, office cafeteria waste"
                        />
                        <Button size="sm" className="mt-2 w-full">
                            Send feedback
                        </Button>
                    </Card>
                </div>
            </section>
        </div>
    );
}
