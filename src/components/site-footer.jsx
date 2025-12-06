import Link from "next/link";

export default function SiteFooter() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-emerald-900/40 bg-black/80 py-8 text-sm text-slate-400">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <div className="space-y-1">
                    <p className="font-medium text-slate-200">
                        Hara Bhara - Green actions, real impact.
                    </p>
                    <p className="text-xs text-slate-500">
                        Gbits, GreenBands, QR-tagged trees and smart bins are part of the Hara Bhara verification stack.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <Link href="/about" className="hover:text-emerald-300">
                        About
                    </Link>
                    <Link href="/contact" className="hover:text-emerald-300">
                        Contact & support
                    </Link>
                    <Link href="/how-it-works" className="hover:text-emerald-300">
                        How it works
                    </Link>
                    <span className="h-4 w-px bg-emerald-900/60" aria-hidden="true" />
                    <p className="text-xs text-slate-500">
                        © {year} Hara Bhara. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
