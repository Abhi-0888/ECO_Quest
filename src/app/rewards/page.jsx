"use client";

import { useState } from "react";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import Link from "next/link";
import { useUser } from "@/context/user-context";

const rewardCatalog = [
    {
        id: "reward-1",
        title: "Carbon-neutral commute kit",
        partner: "EarthPulse",
        description: "Transit pass + bike share credits for a greener trip to work.",
        cost: 800,
        stock: "Live now",
        type: "Voucher",
    },
    {
        id: "reward-2",
        title: "Zero-waste starter stack",
        partner: "Leaf & Loop",
        description: "Stainless tumbler, refillable soap set and compostable liners.",
        cost: 1200,
        stock: "Limited",
        type: "Product",
    },
    {
        id: "reward-3",
        title: "Weekend tree-planting retreat",
        partner: "WildSteps",
        description: "Volunteer getaway with meals + stay covered (2 seats).",
        cost: 2200,
        stock: "Opens Friday",
        type: "Experience",
    },
];

const flashDrops = [
    {
        id: "drop-1",
        title: "Solar café voucher",
        window: "Today · 5:00 PM",
        cost: 450,
        slots: 30,
    },
    {
        id: "drop-2",
        title: "Metro ride credits",
        window: "Tomorrow · 11:00 AM",
        cost: 300,
        slots: 60,
    },
    {
        id: "drop-3",
        title: "Indie eco-brand mystery box",
        window: "Saturday · 8:00 PM",
        cost: 900,
        slots: 20,
    },
];

const redemptionSteps = [
    {
        title: "Log & earn",
        detail: "Track verified eco-actions—each one boosts your Gbits balance just like StepSetGo steps become coins.",
    },
    {
        title: "Watch the drops",
        detail: "Flash windows unlock at set times. Queue up early; inventory refreshes daily at 6 PM local time.",
    },
    {
        title: "Claim & enjoy",
        detail: "Spend Gbits on physical products, partner discounts or community vouchers. Your balance updates instantly.",
    },
];

export default function RewardsPage() {
    const { user, claimReward, claimedRewards } = useUser();
    const [message, setMessage] = useState(null);
    const [visibleCodes, setVisibleCodes] = useState({});

    const handleClaim = (reward) => {
        setMessage(null);
        const result = claimReward(reward);
        if (result.success) {
            setMessage({ type: "success", text: result.message });
        } else {
            setMessage({ type: "error", text: result.message });
        }
    };

    if (!user) {
        return (
            <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-6 px-4 py-20 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-slate-50">
                    Rewards Marketplace
                </h1>
                <p className="text-slate-400">Please log in to check your balance and claim rewards.</p>
                <Link href="/login">
                    <Button>Go to Login</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14">
            <section className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-200">
                    Rewards hub
                </div>
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="space-y-4">
                        <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                            Redeem your Gbits for products, vouchers and experiences.
                        </h1>
                        <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
                            Inspired by the StepSetGo store flow, Hara Bhara lets you swap hard-earned
                            Gbits for curated drops—from daily flash deals to limited edition impact
                            bundles. Claims reset every evening so there is always something fresh to
                            chase.
                        </p>
                    </div>
                    <div className="grid gap-3 rounded-2xl border border-emerald-900/60 bg-black/50 px-4 py-3 text-xs text-slate-200 sm:grid-cols-3">
                        <div>
                            <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-300/80">
                                Wallet
                            </p>
                            <p className="text-2xl font-semibold text-emerald-200">
                                {user.gbitsTotal.toLocaleString()} GB
                            </p>
                        </div>
                        <div>
                            <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-300/80">
                                Weekly gain
                            </p>
                            <p className="text-2xl font-semibold text-emerald-200">
                                +{user.gbitsThisWeek}
                            </p>
                        </div>
                        <div>
                            <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-300/80">
                                Claims done
                            </p>
                            <p className="text-2xl font-semibold text-emerald-200">{claimedRewards.length}</p>
                        </div>
                    </div>
                </div>
            </section>

            {message && (
                <div className={`mt-6 rounded-lg p-3 text-sm text-center font-medium ${message.type === 'success' ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-800' : 'bg-red-900/40 text-red-300 border border-red-800'}`}>
                    {message.text}
                </div>
            )}

            {/* Redeemed Rewards Section */}
            {claimedRewards.length > 0 && (
                <section className="mt-10">
                    <div className="flex items-center justify-between gap-3 mb-4">
                        <h2 className="text-sm font-semibold text-slate-100">Your My Rewards & Vouchers</h2>
                        <p className="text-[11px] text-slate-400">Items you have successfully claimed</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {claimedRewards.map((reward, index) => (
                            <div
                                key={`${reward.id}-${index}`}
                                className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-emerald-900/10 p-4"
                            >
                                <div className="absolute top-0 right-0 rounded-bl-xl bg-emerald-500/20 px-2 py-1 text-[10px] font-medium text-emerald-300">
                                    REDEEMED
                                </div>
                                <p className="text-xs uppercase tracking-[0.2em] text-emerald-400/80">
                                    {reward.partner}
                                </p>
                                <h3 className="mt-1 text-base font-semibold text-slate-50">{reward.title}</h3>
                                <div className="mt-4 flex items-end justify-between">
                                    <div className="text-xs text-slate-400">
                                        <p>Cost: {reward.cost} GB</p>
                                        <p>On: {new Date(reward.claimedAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="h-7 text-xs"
                                            onClick={() =>
                                                setVisibleCodes((prev) => ({
                                                    ...prev,
                                                    [reward.id + '-' + index]: !prev[reward.id + '-' + index],
                                                }))
                                            }
                                        >
                                            {visibleCodes[reward.id + '-' + index] ? "Hide Code" : "View Code"}
                                        </Button>
                                        {visibleCodes[reward.id + '-' + index] && (
                                            <div className="flex items-center gap-2 rounded-md bg-black/60 px-3 py-1 text-xs">
                                                <span className="font-mono text-sm text-emerald-200">{reward.redeemCode || "—"}</span>
                                                <Button
                                                    size="xs"
                                                    variant="ghost"
                                                    className="h-6 px-2 text-xs"
                                                    onClick={async () => {
                                                        try {
                                                            await navigator.clipboard.writeText(reward.redeemCode || "");
                                                            setMessage({ type: "success", text: "Copied code to clipboard" });
                                                            setTimeout(() => setMessage(null), 1800);
                                                        } catch (e) {
                                                            setMessage({ type: "error", text: "Copy failed" });
                                                            setTimeout(() => setMessage(null), 1800);
                                                        }
                                                    }}
                                                >
                                                    Copy
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <section className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                <div>
                    <div className="flex items-center justify-between gap-3">
                        <h2 className="text-sm font-semibold text-slate-100">Featured rewards</h2>
                        <p className="text-[11px] text-slate-400">Inventory refresh · 6:00 PM daily</p>
                    </div>
                    <div className="mt-3 space-y-3">
                        {rewardCatalog.map((reward) => (
                            <div
                                key={reward.id}
                                className="rounded-2xl border border-emerald-900/60 bg-black/50 p-4 shadow-[0_0_40px_-20px_rgba(16,185,129,0.7)]"
                            >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/80">
                                            {reward.type} · {reward.partner}
                                        </p>
                                        <h3 className="text-lg font-semibold text-slate-50">{reward.title}</h3>
                                        <p className="text-sm text-slate-400">{reward.description}</p>
                                    </div>
                                    <div className="flex flex-col items-start gap-2 text-sm text-emerald-200 sm:items-end">
                                        <span className="text-2xl font-semibold">
                                            {reward.cost.toLocaleString()} GB
                                        </span>
                                        <span className="text-[11px] uppercase tracking-[0.2em] text-emerald-300/80">
                                            {reward.stock}
                                        </span>
                                        <Button
                                            size="sm"
                                            className="w-full sm:w-auto"
                                            variant={user.gbitsTotal >= reward.cost ? "secondary" : "ghost"}
                                            onClick={() => handleClaim(reward)}
                                            disabled={user.gbitsTotal < reward.cost}
                                        >
                                            {user.gbitsTotal >= reward.cost ? "Claim with Gbits" : "Insufficient Gbits"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <Card eyebrow="Flash drops" title="Queue up StepSetGo-style windows">
                        <ul className="mt-3 space-y-2 text-sm text-slate-200">
                            {flashDrops.map((drop) => (
                                <li
                                    key={drop.id}
                                    className="flex items-center justify-between gap-2 rounded-xl border border-emerald-900/50 bg-emerald-950/40 px-3 py-2"
                                >
                                    <div>
                                        <p className="font-medium">{drop.title}</p>
                                        <p className="text-[11px] text-slate-400">{drop.window}</p>
                                    </div>
                                    <div className="text-right text-xs text-emerald-200">
                                        <p className="text-base font-semibold">{drop.cost} GB</p>
                                        <p>{drop.slots} slots</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-4 text-[11px] text-slate-400">
                            Stay logged in a few minutes before the window opens—popular drops sell
                            out within seconds, exactly like the StepSetGo “flash store” experience.
                        </p>
                    </Card>

                    <Card eyebrow="Partners" title="Brands backing your impact">
                        <p className="mt-2 text-sm text-slate-300">
                            We collaborate with climate-positive companies for every reward so
                            your claims keep the impact flywheel going.
                        </p>
                        <ul className="mt-3 grid gap-2 text-sm text-emerald-200">
                            <li>• EarthPulse mobility</li>
                            <li>• Leaf & Loop zero-waste</li>
                            <li>• WildSteps eco-tourism</li>
                            <li>• Campus cafés & farmers markets</li>
                        </ul>
                        <Link
                            href="/contact"
                            className="mt-3 inline-flex text-[11px] font-medium text-emerald-300 hover:text-emerald-200"
                        >
                            Add your brand to the rewards marketplace →
                        </Link>
                    </Card>
                </div>
            </section>

            <section className="mt-12">
                <div className="rounded-3xl border border-lime-400/40 bg-lime-400/5 p-6">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[0.18em] text-lime-200">
                                How claims work
                            </p>
                            <h2 className="mt-2 text-2xl font-semibold text-slate-900 lg:text-3xl">
                                A simple three-step loop
                            </h2>
                        </div>
                        <Link href="/scan">
                            <Button size="sm" variant="secondary">
                                Boost my Gbits
                            </Button>
                        </Link>
                    </div>
                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        {redemptionSteps.map((step, index) => (
                            <div key={step.title} className="rounded-2xl border border-white/20 bg-white/10 p-4">
                                <span className="text-3xl font-semibold text-slate-100">0{index + 1}</span>
                                <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
                                <p className="mt-2 text-sm text-slate-100/80">{step.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
