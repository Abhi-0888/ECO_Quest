"use client";
import Link from "next/link";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import { useUser } from "@/context/user-context";

export default function Home() {
    const { user, leaderboard } = useUser();
    return (
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col gap-16 px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-16">
            <section className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
                <div className="space-y-7">
                    <div className="inline-flex items-center gap-2 rounded-full border border-green-700/40 bg-green-900/20 px-3 py-1 text-xs text-green-100 shadow-sm shadow-green-900/40">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-700/90 text-[11px] text-green-50">
                            GB
                        </span>
                        <span className="font-medium tracking-wide">
                            Turn real-world eco-actions into Gbits
                        </span>
                    </div>

                    <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
                        Save the planet.
                        <span className="block bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                            Level up your life.
                        </span>
                    </h1>

                    <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                        Hara Bhara is a gamified sustainability platform that converts everyday
                        eco-actions into green credits called Gbits. Log recycling, tree
                        planting, energy saving and low-carbon commutes   every action is
                        tracked, rewarded and ranked.
                    </p>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="flex gap-3">
                            <Link href="/dashboard">
                                <Button size="lg">Open demo dashboard</Button>
                            </Link>
                            <Link href="/how-it-works">
                                <Button size="lg" variant="secondary">
                                    How Hara Bhara works
                                </Button>
                            </Link>
                            <Link href="/daily-actions">
                                <Button size="lg" variant="secondary">
                                    Daily actions
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <dl className="mt-4 grid gap-4 text-xs text-slate-300 sm:grid-cols-3">
                        <div className="space-y-1">
                            <dt className="text-[11px] uppercase tracking-[0.18em] text-green-400/80">
                                Verified actions
                            </dt>
                            <dd className="text-lg font-semibold text-green-200">50k+</dd>
                        </div>
                        <div className="space-y-1">
                            <dt className="text-[11px] uppercase tracking-[0.18em] text-green-400/80">
                                Partner campuses
                            </dt>
                            <dd className="text-lg font-semibold text-green-200">120</dd>
                        </div>
                        <div className="space-y-1">
                            <dt className="text-[11px] uppercase tracking-[0.18em] text-green-400/80">
                                Average weekly streak
                            </dt>
                            <dd className="text-lg font-semibold text-green-200">9 days</dd>
                        </div>
                    </dl>
                </div>

                <div className="relative">
                    <div className="pointer-events-none absolute -left-16 -top-20 h-40 w-40 rounded-full bg-green-600/20 blur-3xl" />
                    <div className="pointer-events-none absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

                    <div className="relative rounded-3xl border border-green-900/80 bg-black/60 p-4 shadow-[0_0_120px_-40px_rgba(34,197,94,0.8)] backdrop-blur-xl">
                        <div className="flex items-center justify-between gap-2 border-b border-green-900/70 pb-3">
                            <div>
                                <p className="text-xs text-slate-400">Live Gbits balance</p>
                                <p className="text-3xl font-semibold text-green-400">1,240</p>
                            </div>
                            <div className="flex flex-col items-end text-xs text-green-200">
                                <span className="inline-flex items-center gap-1 rounded-full bg-green-600/20 px-2 py-1 text-[11px]">
                                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                    Green streak 26 days
                                </span>
                                <span className="mt-1 text-[11px] text-slate-400">
                                    +180 Gbits this week
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <Card
                                eyebrow="Daily actions"
                                title="Log, repeat, grow"
                                className="hover:-translate-y-0.5 hover:border-green-500/70 hover:shadow-green-900/80 transition"
                            >
                                Log your eco-actions - from recycling and tree care to
                                energy saving and low-carbon travel - and watch your Gbits grow
                                over time.
                            </Card>
                            <Card
                                eyebrow="Game layer"
                                title="Quests, streaks & leagues"
                                className="hover:-translate-y-0.5 hover:border-emerald-400/70 hover:shadow-emerald-900/80 transition"
                            >
                                <p>
                                    Daily quests, campus leagues and city-wide events turn
                                    sustainability into a social, repeatable habit loop.
                                </p>
                                <ul className="mt-3 space-y-1 text-[11px] text-emerald-200">
                                    <li>
                                        Streak: <span className="font-semibold">{user?.streakDays ?? 0} days</span>
                                    </li>
                                    <li>
                                        Level: <span className="font-semibold">{user?.level ?? 1}</span>
                                        {" "}with <span className="font-semibold">{(user?.gbitsTotal ?? 0).toLocaleString()} Gbits</span>
                                    </li>
                                    <li>
                                        Leaderboard: <span className="font-semibold">#{" "}{(leaderboard?.find((e) => e.id === user?.id)?.rank) ?? "-"}</span>
                                    </li>
                                </ul>
                                <Link href="/game-layer">
                                    <Button size="sm" variant="secondary" className="mt-3">
                                        Open game layer
                                    </Button>
                                </Link>
                            </Card>
                        </div>

                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-green-400/80">
                        Why Gbit feels different
                    </p>
                    <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
                        Hybrid verification + social play + institutional visibility.
                    </h2>
                    <p className="max-w-3xl text-sm text-slate-400">
                        Instead of relying only on self-reporting, Gbit blends smart hardware,
                        mobile gameplay and an impact dashboard so actions are trustworthy,
                        fun to share and easy to audit.
                    </p>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                    <Card eyebrow="Hardware layer" title="IoT-verified actions">
                        Smart recycling bins, GPS-tagged trees, QR eco-stations and wearable
                        GreenBands log proof (geo-tags, images, telemetry) before Gbits are issued.
                    </Card>
                    <Card eyebrow="Gamified app" title="Earn, share, repeat">
                        Real-time sync to the mobile app gives users Gbit balances,
                        leaderboards, and social shout-outs so sustainability feels like a daily quest.
                    </Card>
                    <Card eyebrow="Impact dashboard" title="For colleges & NGOs">
                        Institutions track collective progress, launch challenges and export
                        CSR-ready evidence from the same verified hardware events.
                    </Card>
                </div>
            </section>

            <section className="space-y-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
                            Why teams choose Hara Bhara
                        </h2>
                        <p className="max-w-xl text-sm text-slate-400">
                            Designed for campuses, residential communities and climate-first
                            companies that want sustainability to feel joyful, not preachy.
                        </p>
                    </div>
                    <Link
                        href="/contact"
                        className="text-xs font-medium text-green-400 hover:text-green-300"
                    >
                        Contact us
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card
                        eyebrow="Verified impact"
                        title="Impact analytics"
                    >
                        Turn everyday eco-actions into clean, analysable data so you can
                        see progress across people, teams and locations.
                    </Card>
                    <Card
                        eyebrow="Behavior design"
                        title="Habit loops that stick"
                    >
                        Points, streaks, levels and leaderboards driven by behavioral
                        science, configured for your community.
                    </Card>
                    <Card
                        eyebrow="Plug-and-play"
                        title="APIs and SDKs first"
                    >
                        Use our REST and webhook-based APIs to connect existing apps,
                        access Gbit balances, and trigger real rewards.
                    </Card>
                </div>
            </section>

            {/* Decor image with edge masking */}
            {/* Decor image with edge masking */}
            <div className="mt-16 flex w-full justify-center opacity-90 mix-blend-screen pointer-events-none select-none pb-8">
                <div className="relative overflow-hidden w-full max-w-4xl flex justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 h-full w-full"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950 z-10 h-full w-full"></div>
                    <img
                        src="/jhad-pic.jpg"
                        alt="Hara Bhara Tree"
                        className="h-auto max-h-[400px] w-auto max-w-full object-contain opacity-80"
                    />
                </div>
            </div>
        </div>
    );
}
