"use client";
import Link from "next/link";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { useUser } from "@/context/user-context";

function getActionsSummary(actions) {
    const totalActions = actions.length;
    const totalGbits = actions.reduce((sum, a) => sum + (a.gbits ?? 0), 0);

    const byType = {};
    for (const action of actions) {
        byType[action.type] = (byType[action.type] ?? 0) + (action.gbits ?? 0);
    }

    const maxByType = Object.values(byType).length
        ? Math.max(...Object.values(byType))
        : 1;

    return { totalActions, totalGbits, byType, maxByType };
}

const weeklySeries = [12, 18, 9, 24, 15, 20, 11];

export default function DailyActionsPage() {
    const { actions, user } = useUser();
    const { totalActions, totalGbits, byType, maxByType } = getActionsSummary(actions);

    return (
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-emerald-300/80">
                        Daily actions
                    </p>
                    <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                        Your day in eco-actions.
                    </h1>
                    <p className="mt-2 max-w-xl text-sm text-slate-300">
                        Explore today&apos;s actions, see where your Gbits are coming from, and
                        spot which habits are driving your streak the most.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/dashboard">
                        <Button variant="secondary" size="sm">
                            Back to dashboard
                        </Button>
                    </Link>
                    <Link href="/scan">
                        <Button size="sm">Log a new action</Button>
                    </Link>
                </div>
            </header>

            <section className="mt-8 grid gap-4 md:grid-cols-4">
                <Card
                    eyebrow="Today"
                    title="Logged actions"
                    value={`${totalActions} actions`}
                />
                <Card
                    eyebrow="Today"
                    title="Earned Gbits"
                    value={`+${totalGbits} GB`}
                />
                <Card eyebrow="Streak" title="Active days" value={`${user?.streakDays ?? 0} days`} />
                <Card eyebrow="Level" title="Current level" value={`Lv ${user?.level ?? 1}`} />
            </section>

            <section className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                <Card eyebrow="Breakdown" title="Gbits by action type">
                    <div className="mt-4 flex items-end gap-3">
                        {Object.entries(byType).map(([type, value]) => {
                            const heightPercent = (value / maxByType) * 100;
                            const minHeight = 14;
                            const barHeight = Math.max(minHeight, heightPercent);

                            return (
                                <div key={type} className="flex flex-1 flex-col items-center gap-2">
                                    <div className="relative flex h-32 w-full items-end rounded-full bg-emerald-950/70">
                                        <div
                                            className="absolute bottom-0 w-full rounded-full bg-gradient-to-t from-emerald-500 via-lime-400 to-teal-300"
                                            style={{ height: `${barHeight}%` }}
                                        />
                                    </div>
                                    <p className="text-[11px] font-medium text-slate-200">
                                        {type}
                                    </p>
                                    <p className="text-[11px] text-slate-400">{value} GB</p>
                                </div>
                            );
                        })}
                    </div>
                </Card>

                <Card eyebrow="Rhythm" title="Last 7 days snapshot">
                    <div className="mt-4 flex items-end gap-1.5">
                        {weeklySeries.map((value, index) => {
                            const heightPercent = (value / Math.max(...weeklySeries)) * 100;
                            const label = index === weeklySeries.length - 1 ? "Today" : `D${index + 1
                                }`;

                            return (
                                <div key={index} className="flex flex-1 flex-col items-center gap-1">
                                    <div className="flex h-20 w-full items-end rounded-lg bg-emerald-950/60">
                                        <div
                                            className="w-full rounded-lg bg-emerald-400/80"
                                            style={{ height: `${Math.max(10, heightPercent)}%` }}
                                        />
                                    </div>
                                    <p className="text-[10px] text-slate-400">{label}</p>
                                    <p className="text-[10px] text-emerald-200">{value} GB</p>
                                </div>
                            );
                        })}
                    </div>
                    <p className="mt-3 text-[11px] text-slate-400">
                        This series is based on mock data. In a live deployment you&apos;d plug
                        this into a real timeseries of your users&apos; eco-actions.
                    </p>
                </Card>
            </section>

            <section className="mt-10 grid gap-4 lg:grid-cols-2">
                <Card eyebrow="Feed" title="Today&apos;s actions">
                    <ul className="mt-3 space-y-2 text-xs text-slate-200">
                        {actions.map((action) => (
                            <li
                                key={action.id}
                                className="flex items-center justify-between gap-3 rounded-xl border border-emerald-900/60 bg-emerald-950/40 px-3 py-2"
                            >
                                <div>
                                    <p className="text-xs font-medium text-slate-100">
                                        {action.type}
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
                </Card>

                <Card eyebrow="Ideas" title="What to try next?">
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                        <li>Turn a one-off clean-up into a weekly community ritual.</li>
                        <li>Run a 7-day water-saving challenge in your hostel or office.</li>
                        <li>Reward low-carbon commutes with bonus Gbits on peak days.</li>
                    </ul>
                    <Link href="/scan">
                        <Button size="sm" variant="secondary" className="mt-3">
                            Log one of these now
                        </Button>
                    </Link>
                </Card>
            </section>
        </div>
    );
}
