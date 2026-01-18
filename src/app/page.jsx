"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    TreePine,
    Zap,
    Recycle,
    Trophy,
    ArrowRight,
    Users,
    Globe,
    Database,
    Cpu,
    Sparkles
} from "lucide-react";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import { useUser } from "@/context/user-context";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

export default function Home() {
    const { user, leaderboard } = useUser();

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col gap-16 px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pt-16"
        >
            {/* Hero Section */}
            <section className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
                <motion.div variants={itemVariants} className="space-y-8">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400 backdrop-blur-sm">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span className="tracking-wide">
                            Turn real-world eco-actions into Gbits
                        </span>
                    </div>

                    <h1 className="text-balance text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                        Save the planet.
                        <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                            Level up your life.
                        </span>
                    </h1>

                    <p className="max-w-xl text-lg leading-relaxed text-slate-400">
                        Hara Bhara is a gamified sustainability platform that converts everyday
                        eco-actions into green credits called <span className="text-emerald-400 font-semibold">Gbits</span>.
                        Every tree planted and every bottle recycled counts towards your legacy.
                    </p>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <Link href="/dashboard">
                            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base">
                                Open Demo Dashboard
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/how-it-works">
                            <Button size="lg" variant="secondary" className="w-full sm:w-auto h-14 px-8 text-base">
                                View Quest Log
                            </Button>
                        </Link>
                    </div>

                    <div className="pt-4 grid grid-cols-3 gap-8">
                        {[
                            { label: "Verified Actions", value: "50k+" },
                            { label: "Partner Campuses", value: "120" },
                            { label: "Weekly Streak", value: "9 days" }
                        ].map((stat, i) => (
                            <div key={i} className="space-y-1">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-500/70 font-bold">
                                    {stat.label}
                                </p>
                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Dashboard Preview Card */}
                <motion.div
                    variants={itemVariants}
                    className="relative"
                >
                    <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-tr from-emerald-500/20 via-cyan-500/10 to-transparent blur-2xl" />
                    <div className="glass-card relative border-emerald-500/20 bg-slate-900/60 p-6 shadow-2xl">
                        <div className="flex items-center justify-between pb-6 border-b border-emerald-500/10">
                            <div>
                                <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Live Gbits balance</p>
                                <div className="flex items-end gap-2">
                                    <p className="text-4xl font-black text-white">1,240</p>
                                    <span className="mb-1.5 text-xs font-bold text-emerald-400">+18% LW</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-400 border border-emerald-500/20">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    Streak: 26 Days
                                </span>
                            </div>
                        </div>

                        <div className="mt-8 grid gap-4">
                            <Card
                                eyebrow="Daily Habit"
                                title="Sustainable Commute"
                                className="!p-4 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-slate-400">Log your walk or cycle today</p>
                                    <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                        <Zap className="h-4 w-4 text-emerald-400" />
                                    </div>
                                </div>
                            </Card>

                            <Card
                                eyebrow="Current Quest"
                                title="The Green Legion"
                                className="!p-4"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-[11px]">
                                        <span className="text-slate-400">Leaderboard Rank</span>
                                        <span className="text-emerald-400 font-bold">#14 (Apex League)</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 w-[78%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                    </div>
                                    <Link href="/game-layer" className="block">
                                        <Button variant="secondary" size="sm" className="w-full">
                                            Return to Quests
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Features Grid */}
            <section className="space-y-12">
                <motion.div variants={itemVariants} className="text-center space-y-4">
                    <h2 className="text-3xl font-bold text-white">Engineered for real impact</h2>
                    <p className="mx-auto max-w-2xl text-slate-400">
                        We've built a multi-layered ecosystem that makes sustainability
                        not just a choice, but an engaging daily ritual.
                    </p>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-3">
                    {[
                        {
                            icon: Cpu,
                            eyebrow: "Hardware Layer",
                            title: "IoT-Verified Actions",
                            desc: "Smart bins and wearable GreenBands log proof of action before credits are issued."
                        },
                        {
                            icon: Trophy,
                            eyebrow: "Behavior Design",
                            title: "Gamified Experience",
                            desc: "Real-time leaderboards and social streaks turn climate action into a social habit loop."
                        },
                        {
                            icon: Database,
                            eyebrow: "Impact Analytics",
                            title: "For Institutions",
                            desc: "Campuses and NGOs can track collective progress and audit CSR-ready evidence."
                        }
                    ].map((feature, i) => (
                        <Card key={i} eyebrow={feature.eyebrow} title={feature.title} className="group">
                            <div className="mb-4 h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                                <feature.icon className="h-5 w-5 text-emerald-400" />
                            </div>
                            <p className="text-xs leading-relaxed text-slate-400">
                                {feature.desc}
                            </p>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Values Section */}
            <section className="relative overflow-hidden rounded-[2.5rem] border border-emerald-500/20 bg-slate-900/40 p-12 lg:p-20">
                <div className="absolute right-0 top-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-emerald-500/10 blur-[100px]" />
                <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div className="space-y-6">
                        <h2 className="text-4xl font-bold text-white">Why teams choose Hara Bhara</h2>
                        <div className="space-y-4">
                            {[
                                { title: "Verified Impact", desc: "Every Gbit is backed by auditable data." },
                                { title: "Behavioral Science", desc: "Designed with habit loops that actually stick." },
                                { title: "Developer First", desc: "Easy to integrate with our robust REST APIs." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1 h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">{item.title}</h4>
                                        <p className="text-sm text-slate-400">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="secondary" className="px-8 mt-4">
                            Contact our Team
                        </Button>
                    </div>

                    <div className="relative aspect-square lg:aspect-auto lg:h-[400px]">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
                        <img
                            src="/jhad-pic.jpg"
                            alt="Sustainability Impact"
                            className="h-full w-full object-cover rounded-3xl opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                </div>
            </section>
        </motion.div>
    );
}
