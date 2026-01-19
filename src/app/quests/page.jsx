"use client";

import { motion } from "framer-motion";
import {
    Trophy,
    Flame,
    Zap,
    Leaf,
    Droplets,
    Wind,
    ArrowRight,
    Star,
    Shield
} from "lucide-react";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Link from "next/link";
import { useUser } from "@/context/user-context";

const quests = [
    {
        id: "quest-1",
        title: "Energy Saver Elite",
        category: "Energy",
        icon: Zap,
        description: "Reduce your home energy consumption by 10% this week.",
        reward: 500,
        difficulty: "Medium",
        participants: 1240,
        color: "text-amber-400",
        bgColor: "bg-amber-400/10",
        borderColor: "border-amber-400/20"
    },
    {
        id: "quest-2",
        title: "Waste Warrior",
        category: "Waste",
        icon: Leaf,
        description: "Log 5 recycling actions in 3 days to earn the Waste Warrior badge.",
        reward: 350,
        difficulty: "Easy",
        participants: 3500,
        color: "text-emerald-400",
        bgColor: "bg-emerald-400/10",
        borderColor: "border-emerald-400/20"
    },
    {
        id: "quest-3",
        title: "H2O Guardian",
        category: "Water",
        icon: Droplets,
        description: "Switch to water-efficient habits for a full week.",
        reward: 600,
        difficulty: "Hard",
        participants: 850,
        color: "text-cyan-400",
        bgColor: "bg-cyan-400/10",
        borderColor: "border-cyan-400/20"
    },
    {
        id: "quest-4",
        title: "Carbon Crusher",
        category: "Transport",
        icon: Wind,
        description: "Cycle or walk for all commutes under 5km this week.",
        reward: 750,
        difficulty: "Hard",
        participants: 520,
        color: "text-indigo-400",
        bgColor: "bg-indigo-400/10",
        borderColor: "border-indigo-400/20"
    },
    {
        id: "quest-5",
        title: "Eco Community Hub",
        category: "Social",
        icon: Shield,
        description: "Invite 3 friends to join Hara Bhara and log their first action.",
        reward: 1000,
        difficulty: "Medium",
        participants: 2100,
        color: "text-rose-400",
        bgColor: "bg-rose-400/10",
        borderColor: "border-rose-400/20"
    },
    {
        id: "quest-6",
        title: "Tree Guardian",
        category: "Nature",
        icon: Star,
        description: "Plant a native sapling and track its growth for 30 days.",
        reward: 1500,
        difficulty: "Hard",
        participants: 340,
        color: "text-lime-400",
        bgColor: "bg-lime-400/10",
        borderColor: "border-lime-400/20"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
};

export default function QuestsPage() {
    const { user } = useUser();

    if (!user) {
        return (
            <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-6 px-4 py-20 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-slate-50">
                    Active Quests
                </h1>
                <p className="text-slate-400">Join quests to earn extra Gbits and badges.</p>
                <Link href="/login">
                    <Button shadow>Go to Login</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-400">
                        <Trophy className="h-3 w-3" />
                        Quest Board
                    </div>
                    <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                        Challenges & Missions
                    </h1>
                    <p className="mt-2 max-w-xl text-sm text-slate-300">
                        Complete specialized quests to accelerate your green impact and climb the global ranks.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-center">
                        <p className="text-[10px] uppercase tracking-wider text-emerald-500/70 py-0.5">Active Streaks</p>
                        <div className="flex items-center justify-center gap-1.5">
                            <Flame className="h-4 w-4 text-orange-400 fill-orange-400/20" />
                            <span className="text-xl font-bold text-white">{user.streakDays || 0}</span>
                        </div>
                    </div>
                </div>
            </header>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
                {quests.map((quest) => (
                    <motion.div key={quest.id} variants={itemVariants}>
                        <div className={`group relative overflow-hidden rounded-[2rem] border ${quest.borderColor} bg-slate-900/40 p-1 hover:border-emerald-500/40 transition-all duration-300`}>
                            <div className="relative rounded-[1.8rem] bg-slate-950/40 p-6 h-full flex flex-col">
                                <div className="flex items-start justify-between">
                                    <div className={`rounded-2xl ${quest.bgColor} p-3 transition-transform duration-300 group-hover:scale-110`}>
                                        <quest.icon className={`h-6 w-6 ${quest.color}`} />
                                    </div>
                                    <div className="text-right text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                                        {quest.difficulty}
                                    </div>
                                </div>

                                <div className="mt-6 flex-grow">
                                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                                        {quest.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                                        {quest.description}
                                    </p>
                                </div>

                                <div className="mt-8 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                                <Zap className="h-3 w-3 text-emerald-400" />
                                            </div>
                                            <span className="text-sm font-bold text-emerald-400">+{quest.reward} GB</span>
                                        </div>
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="h-6 w-6 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] text-slate-300">
                                                    {String.fromCharCode(64 + i)}
                                                </div>
                                            ))}
                                            <div className="h-6 w-6 rounded-full border-2 border-slate-900 bg-emerald-500/20 flex items-center justify-center text-[8px] text-emerald-400 font-bold">
                                                +{quest.participants > 1000 ? (quest.participants / 1000).toFixed(1) + 'k' : quest.participants}
                                            </div>
                                        </div>
                                    </div>

                                    <Button className="w-full h-11 rounded-xl group/btn overflow-hidden relative">
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            Accept Quest
                                            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <section className="mt-20 relative overflow-hidden rounded-[2.5rem] border border-emerald-500/20 bg-emerald-500/5 p-8 lg:p-12">
                <div className="absolute top-0 right-0 -tr-20 h-64 w-64 bg-emerald-500/10 blur-[80px]" />
                <div className="relative flex flex-col lg:flex-row items-center gap-8 justify-between">
                    <div className="max-w-xl text-center lg:text-left">
                        <h2 className="text-2xl font-bold text-white sm:text-3xl">Have a custom quest idea?</h2>
                        <p className="mt-3 text-slate-400">
                            Create a community quest for your campus or housing block and lead your local ecosystem towards sustainability.
                        </p>
                    </div>
                    <Link href="/quests/new">
                        <Button variant="secondary" size="lg" className="h-14 px-8">
                            Propose New Quest
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
