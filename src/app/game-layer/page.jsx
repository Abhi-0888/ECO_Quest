"use client";
import Link from "next/link";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { useUser } from "@/context/user-context";

const sampleQuests = [
    {
        id: "quest-1",
        title: "Three-day recycling streak",
        reward: "+35 Gbits",
        difficulty: "Easy",
    },
    {
        id: "quest-2",
        title: "Plant or care for 3 trees this week",
        reward: "+80 Gbits",
        difficulty: "Medium",
    },
    {
        id: "quest-3",
        title: "Five low-carbon commutes in 7 days",
        reward: "+120 Gbits",
        difficulty: "Hard",
    },
];


export default function GameLayerPage() {
    const { leaderboard, globalFeed, user } = useUser();

    // Fallback to static mock data if context isn't ready (e.g. server render)
    // or if not logged in, we verify what we have.
    const displayLeaderboard = leaderboard && leaderboard.length > 0 ? leaderboard : [];
    const displayFeed = globalFeed && globalFeed.length > 0 ? globalFeed : [];

    // Slice for Top 3 and Recent 3
    const topLeaders = displayLeaderboard.slice(0, 5); // Show top 5
    const recent = displayFeed.slice(0, 3);

    // Default stats if not logged in
    const stats = user ? {
        streakDays: user.streakDays,
        level: user.level || 1, // Ensure level exists or calc it
        gbitsTotal: user.gbitsTotal,
        gbitsThisWeek: user.gbitsThisWeek,
        treesPlanted: user.treesPlanted || 0,
        smartBinDrops: user.smartBinDrops || 0
    } : {
        streakDays: 0,
        level: 1,
        gbitsTotal: 0,
        gbitsThisWeek: 0,
        treesPlanted: 0,
        smartBinDrops: 0
    };

    return (
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-emerald-300/80">
                        Game layer
                    </p>
                    <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                        Quests, streaks &amp; leagues.
                    </h1>
                    <p className="mt-2 max-w-xl text-sm text-slate-300">
                        See how Hara Bhara turns simple eco-actions into streaks, levels and
                        friendly competition using the demo data powering this site.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/">
                        <Button variant="secondary" size="sm">
                            Back to home
                        </Button>
                    </Link>
                    <Link href="/scan">
                        <Button size="sm">Log a new action</Button>
                    </Link>
                </div>
            </header>

            <section className="mt-8 grid gap-4 md:grid-cols-4">
                <Card
                    eyebrow="Current streak"
                    title="Active days"
                    value={`${stats.streakDays} days`}
                />
                <Card
                    eyebrow="Level"
                    title="Player level"
                    value={`Lv ${stats.level}`}
                >
                    {stats.gbitsTotal} Gbits total
                </Card>
                <Card
                    eyebrow="This week"
                    title="Earned Gbits"
                    value={`+${stats.gbitsThisWeek} GB`}
                />
                <Card
                    eyebrow="Trees &amp; clean-ups"
                    title="Highlights"
                    value={`${stats.treesPlanted} trees`}
                >
                    +{stats.smartBinDrops} recycling / clean-up actions
                </Card>
            </section>

            <section className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                <Card eyebrow="Quests" title="Example quests (demo)">
                    <ul className="mt-3 space-y-2 text-xs text-slate-200">
                        {sampleQuests.map((quest) => (
                            <li
                                key={quest.id}
                                className="flex items-center justify-between gap-3 rounded-xl border border-emerald-900/60 bg-emerald-950/40 px-3 py-2"
                            >
                                <div>
                                    <p className="text-xs font-medium text-slate-100">
                                        {quest.title}
                                    </p>
                                    <p className="text-[11px] text-slate-400">
                                        Difficulty: {quest.difficulty}
                                    </p>
                                </div>
                                <p className="text-xs font-semibold text-emerald-300">
                                    {quest.reward}
                                </p>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-3 text-[11px] text-slate-400">
                        In a live deployment, quests would be configured per campus or
                        organisation and refreshed weekly.
                    </p>
                </Card>

                <Card eyebrow="Leaderboard" title="Top green contributors">
                    <ul className="mt-3 space-y-2 text-xs text-slate-200">
                        {topLeaders.map((entry, index) => (
                            <li
                                key={entry.id}
                                className={`flex items-center justify-between gap-2 rounded-xl border px-2.5 py-2 ${entry.isCurrentUser
                                    ? "border-emerald-500/50 bg-emerald-900/40"
                                    : "border-emerald-900/60 bg-emerald-950/40"
                                    }`}
                            >
                                <div className="flex items-center gap-2.5">
                                    <span className="text-[11px] text-slate-400">#{entry.rank ?? index + 1}</span>
                                    <div
                                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold text-emerald-950 ${entry.avatarColor}`}
                                    >
                                        {entry.name[0]}
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-slate-100">
                                            {entry.name} {entry.isCurrentUser && "(You)"}
                                        </p>
                                        <p className="text-[11px] text-slate-400">
                                            {entry.city}  • {entry.streakDays} day streak • {entry.rewardsClaimed ?? 0} rewards
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xs font-semibold text-emerald-300">
                                    {entry.gbits.toLocaleString()} GB
                                </p>
                            </li>
                        ))}
                    </ul>
                </Card>
            </section>

            <section className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                <Card eyebrow="Recent actions" title="Community Feed">
                    <ul className="mt-3 space-y-2 text-xs text-slate-200">
                        {recent.map((action) => (
                            <li
                                key={action.id}
                                className="flex items-center justify-between gap-3 rounded-xl border border-emerald-900/60 bg-emerald-950/40 px-3 py-2"
                            >
                                <div>
                                    <p className="text-xs font-medium text-slate-100">
                                        {action.type} <span className="text-emerald-400/70 font-normal">by {action.user || "Community Member"}</span>
                                    </p>
                                    <p className="text-[11px] text-slate-400">
                                        {action.description}
                                    </p>
                                </div>
                                <p className="text-xs font-semibold text-emerald-300">
                                    +{action.gbits} GB
                                </p>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-3 text-[11px] text-slate-400">
                        This feed updates in real-time as users verify actions.
                    </p>
                </Card>

                <Card eyebrow="How to extend" title="From demo to live">
                    <p className="mt-3 text-[11px] text-slate-300">
                        - Replace this mock data with your own event stream.
                    </p>
                    <p className="mt-1 text-[11px] text-slate-300">
                        - Define quests and leagues that match your campus or company.
                    </p>
                    <p className="mt-1 text-[11px] text-slate-300">
                        - Use these patterns as a reference when building your own game
                        layer.
                    </p>
                    <Link href="/contact">
                        <Button size="sm" variant="secondary" className="mt-3">
                            Talk about game design
                        </Button>
                    </Link>
                </Card>
            </section>
        </div>
    );
}
