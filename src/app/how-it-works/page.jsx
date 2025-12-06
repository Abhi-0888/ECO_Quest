import Link from "next/link";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";

export default function HowItWorksPage() {
    return (
        <div className="mx-auto max-w-5xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14">
            <section className="space-y-6">
                <div className="inline-flex items-center rounded-full border border-green-600/40 bg-green-600/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-green-200">
                    How it works
                </div>
                <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                    From eco-actions to Gbits in three layers.
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                    Hara Bhara (a.k.a. Gbit) blends smart hardware, mobile UX and a
                    verification pipeline to turn every eco-action into trusted green
                    credits. IoT devices verify what happened, the scoring engine converts
                    it into Gbits, and the social layer makes the habit stick.
                </p>
            </section>

            <section className="mt-10 grid gap-6 md:grid-cols-3">
                <Card eyebrow="1. Capture" title="Everyday eco-actions">
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                        <li>Recycling, tree planting, water and energy saving.</li>
                        <li>Low-carbon commutes and community clean-up drives.</li>
                        <li>
                            IoT cues: smart bins, GPS-tagged trees, QR eco-stations and Strava
                            activity links capture proof automatically.
                        </li>
                    </ul>
                </Card>
                <Card eyebrow="2. Convert" title="Gbit scoring engine">
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                        <li>Each action generates a base Gbit score.</li>
                        <li>Multipliers for consistency, impact and locality.</li>
                        <li>Transparent rules that institutions can configure.</li>
                    </ul>
                </Card>
                <Card eyebrow="3. Engage" title="Game & social layer">
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                        <li>Daily and weekly quests to nudge recurring actions.</li>
                        <li>Streaks, levels and city / campus leaderboards.</li>
                        <li>Reward catalogue for perks, trees and climate causes.</li>
                    </ul>
                </Card>
            </section>

            <section className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                <Card
                    eyebrow="Data flow"
                    title="From action to Gbits"
                    className="lg:order-1"
                >
                    <ol className="mt-3 space-y-2 text-xs text-slate-300">
                        <li>
                            1. Each eco-action your users take is recorded by your app or
                            platform with a unique ID.
                        </li>
                        <li>
                            2. Your backend sends a small, authenticated payload to an
                            ingestion API whenever an action occurs.
                        </li>
                        <li>
                            3. Hara Bhara validates the payload, applies scoring rules and
                            creates an immutable action record.
                        </li>
                        <li>
                            4. The user s Gbit balance and streaks are updated in real time
                            and can be queried by your apps and dashboards.
                        </li>
                    </ol>
                </Card>
                <Card
                    eyebrow="Claim rewards"
                    title="Convert Gbits into perks"
                    className="lg:order-2"
                >
                    <p className="mt-3 text-sm text-slate-300">
                        Once actions are ingested and scored, your community can spend their
                        Gbits on curated rewards—think StepSetGo-style drops for eco products,
                        vouchers and experiences.
                    </p>
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-400">
                        <li>• Flash windows refresh daily at 6 PM local time.</li>
                        <li>• Partners add real products, discounts or community vouchers.</li>
                        <li>• Claims update wallet balances instantly across apps.</li>
                    </ul>
                    <Link href="/rewards">
                        <Button size="sm" variant="secondary" className="mt-4">
                            Explore rewards hub
                        </Button>
                    </Link>
                </Card>
            </section>

            <section className="mt-10 grid gap-6 md:grid-cols-2">
                <Card eyebrow="Verification stack" title="Hardware + AI validation">
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                        <li>Smart recycling bins record weight + timestamp per drop.</li>
                        <li>GPS-enabled tree tags log growth events with geo fences.</li>
                        <li>GreenBands (RFID/NFC wearables) check participants into quests.</li>
                        <li>
                            QR eco-stations and photo uploads trigger AI checks for tamper
                            detection and authenticity.
                        </li>
                    </ul>
                </Card>
                <Card eyebrow="Impact dashboard" title="Real-time institutional view">
                    <p className="mt-3 text-sm text-slate-300">
                        Colleges, NGOs and CSR leaders see collective progress, launch
                        challenges, and export auditable ESG metrics—all sourced from the
                        same verified hardware events.
                    </p>
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-400">
                        <li>• Leaderboards by hostel, cohort or department.</li>
                        <li>• Challenge builder for hackathons or plantation drives.</li>
                        <li>• Downloadable evidence packs for CSR filings.</li>
                    </ul>
                </Card>
            </section>
        </div>
    );
}
