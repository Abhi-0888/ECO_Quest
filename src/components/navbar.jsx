"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, User, Sparkles } from "lucide-react";
import Button from "@/components/ui/button";
import { useUser } from "@/context/user-context";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/how-it-works", label: "Protocol" },
    { href: "/about", label: "Mission" },
];

const protectedNavItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/quests", label: "Quests" },
    { href: "/scan", label: "Verify" },
    { href: "/rewards", label: "Market" },
];

function NavLink({ href, label, onClick }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            onClick={onClick}
            className={`relative text-sm font-medium transition-all duration-300 hover:text-emerald-400 ${isActive ? "text-emerald-400" : "text-slate-400"
                }`}
        >
            {label}
            {isActive && (
                <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 h-0.5 w-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                />
            )}
        </Link>
    );
}

export function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { user, isLoggedIn, logout } = useUser();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    const displayedNavItems = isLoggedIn
        ? [...navItems.slice(0, 1), ...protectedNavItems, ...navItems.slice(1)]
        : navItems;

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-500 ${scrolled
                ? "border-b border-emerald-500/10 bg-slate-950/80 backdrop-blur-xl py-2"
                : "bg-transparent py-4"
                }`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-500/20 overflow-hidden transition-all duration-300 group-hover:ring-emerald-500/50 group-hover:bg-emerald-500/20">
                        <img
                            src="/protect-earth.jpg"
                            alt="Hara Bhara"
                            className="h-full w-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                            onError={(e) => { e.currentTarget.src = '/protect-earth.svg'; }}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                            Hara Bhara
                        </span>
                        <div className="flex items-center gap-1">
                            <Sparkles className="h-2.5 w-2.5 text-emerald-500" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">
                                Eco-Protocol
                            </span>
                        </div>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden items-center gap-8 md:flex">
                    {displayedNavItems.map((item) => (
                        <NavLink key={item.href} href={item.href} label={item.label} />
                    ))}
                </nav>

                <div className="hidden items-center gap-4 md:flex">
                    {isLoggedIn ? (
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <p className="text-xs font-bold text-white leading-none">{user.name}</p>
                                    <p className="text-[10px] font-medium text-emerald-500 tabular-nums">{user.gbitsTotal} Gbits</p>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                    <User className="h-4 w-4 text-emerald-400" />
                                </div>
                            </div>
                            <Button variant="secondary" size="sm" onClick={logout} className="h-9 px-4">
                                <LogOut className="h-3.5 w-3.5 mr-2" />
                                Exit
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/login">
                                <Button variant="secondary" size="sm" className="h-9 px-5">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button size="sm" className="h-9 px-5">
                                    Join Protocol
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition-all hover:bg-emerald-500/20 md:hidden"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden border-t border-emerald-500/10 bg-slate-950 md:hidden"
                    >
                        <div className="flex flex-col gap-6 px-6 py-8">
                            <nav className="flex flex-col gap-4">
                                {displayedNavItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className="text-lg font-semibold text-slate-300 hover:text-emerald-400"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                            <div className="flex flex-col gap-3 pt-4 border-t border-emerald-500/10">
                                {isLoggedIn ? (
                                    <Button variant="secondary" className="w-full h-11" onClick={logout}>
                                        Logout Session
                                    </Button>
                                ) : (
                                    <>
                                        <Link href="/login" className="w-full">
                                            <Button variant="secondary" className="w-full h-11">
                                                Sign In
                                            </Button>
                                        </Link>
                                        <Link href="/contact" className="w-full">
                                            <Button className="w-full h-11">
                                                Join Protocol
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

export default Navbar;
