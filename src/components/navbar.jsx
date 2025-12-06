"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/button";
import { useUser } from "@/context/user-context";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

const protectedNavItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/scan", label: "Action Scan" },
    { href: "/rewards", label: "Rewards" },
];

function NavLink({ href, label }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`text-sm font-medium transition-colors hover:text-green-400 ${isActive ? "text-green-400" : "text-slate-200"
                }`}
        >
            {label}
        </Link>
    );
}

export function Navbar() {
    const [open, setOpen] = useState(false);
    const { user, isLoggedIn, logout } = useUser();

    // Combine items based on auth status
    const displayedNavItems = isLoggedIn
        ? [...navItems.slice(0, 1), ...protectedNavItems, ...navItems.slice(1)]
        : navItems;

    return (
        <header className="sticky top-0 z-40 border-b border-green-900/40 bg-black/70 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600/10 ring-1 ring-green-600/40 overflow-hidden">
                        <img
                            src="/protect-earth.jpg"
                            alt="Hara Bhara"
                            className="h-9 w-9 object-cover"
                            onError={(e) => {
                                // fallback to SVG if JPG isn't present
                                // @ts-ignore next-line
                                e.currentTarget.src = '/protect-earth.svg';
                            }}
                        />
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-sm font-semibold tracking-wide text-green-200">
                            Hara Bhara
                        </span>
                        <span className="text-[11px] text-slate-400">
                            Gamified sustainability
                        </span>
                    </div>
                </Link>

                <nav className="hidden items-center gap-7 md:flex">
                    {displayedNavItems.map((item) => (
                        <NavLink key={item.href} href={item.href} label={item.label} />
                    ))}
                </nav>

                <div className="hidden items-center gap-3 md:flex">
                    {isLoggedIn ? (
                        <div className="flex items-center gap-4">
                            <div className="text-right hidden lg:block">
                                <p className="text-xs font-medium text-emerald-200">{user.name}</p>
                                <p className="text-[10px] text-slate-400">{user.gbitsTotal} GB</p>
                            </div>
                            <Button variant="secondary" size="sm" onClick={logout}>
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="secondary" size="sm">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button size="sm">Join the beta</Button>
                            </Link>
                        </>
                    )}
                </div>

                <button
                    type="button"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-green-600/60 bg-green-600/10 text-slate-100 shadow-sm transition hover:bg-green-600/20 md:hidden"
                    onClick={() => setOpen((prev) => !prev)}
                    aria-label="Toggle navigation"
                >
                    <span className="sr-only">Toggle navigation</span>
                    <div className="space-y-1.5">
                        <span
                            className={`block h-0.5 w-5 rounded-full bg-current transition-transform ${open ? "translate-y-1.5 rotate-45" : ""
                                }`}
                        />
                        <span
                            className={`block h-0.5 w-5 rounded-full bg-current transition-opacity ${open ? "opacity-0" : "opacity-100"
                                }`}
                        />
                        <span
                            className={`block h-0.5 w-5 rounded-full bg-current transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""
                                }`}
                        />
                    </div>
                </button>
            </div>

            {open && (
                <div className="border-t border-green-900/40 bg-black/95 md:hidden">
                    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6">
                        <nav className="flex flex-col gap-3">
                            {displayedNavItems.map((item) => (
                                <NavLink key={item.href} href={item.href} label={item.label} />
                            ))}
                        </nav>
                        <div className="flex flex-col gap-3 pt-2">
                            {isLoggedIn ? (
                                <Button variant="secondary" className="w-full" onClick={logout}>
                                    Logout ({user.name})
                                </Button>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button variant="secondary" className="w-full">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link href="/contact">
                                        <Button className="w-full">Join the beta</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;
