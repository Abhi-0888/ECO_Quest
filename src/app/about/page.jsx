import Card from "@/components/ui/card";

export default function AboutPage() {
    return (
        <div className="mx-auto max-w-5xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14">
            <section className="space-y-4">
                <p className="text-xs uppercase tracking-[0.18em] text-emerald-300/80">
                    About Hara Bhara
                </p>
                <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                    Gamifying climate action for campuses, communities and companies.
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                    Gbit stands apart because it merges IoT hardware, gamified digital engagement and
                    real-world verification—something rarely attempted in Indian sustainability tech.
                    Smart recycling bins, GPS-enabled tree tags, wearable GreenBands and QR eco-stations
                    log every action, while geo-tagging, image capture and AI checks confirm authenticity
                    in seconds. Those verified events instantly sync to the app so people can earn Gbits,
                    compete on leaderboards and inspire peers via the social feed.
                </p>
            </section>

            <section className="mt-10 grid gap-6 md:grid-cols-3">
                <Card eyebrow="Mission" title="Make green the default choice">
                    We want millions of people to choose the greener option  walking
                    instead of driving, refilling instead of buying plastic, planting and
                    caring for trees  because it feels fun, social and rewarding.
                </Card>
                <Card eyebrow="Approach" title="Hardware + habit loops">
                    Hybrid verification pairs IoT inputs (smart bins, GPS tags, RFID bands)
                    with manual uploads to reduce fraud, while streaks, quests and rewards
                    keep people coming back daily.
                </Card>
                <Card eyebrow="Impact" title="Dashboards for institutions">
                    Colleges, NGOs and CSR teams use the Impact Dashboard to monitor
                    collective progress, launch challenges and showcase verifiable ESG
                    metrics pulled from the same hardware events.
                </Card>
            </section>

            <section className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                <Card eyebrow="Built for" title="Early partners we designed for">
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                        <li>Universities running annual plantation drives.</li>
                        <li>Residential communities tracking waste segregation.</li>
                        <li>Climate-first companies offering green employee benefits.</li>
                    </ul>
                </Card>
                <Card eyebrow="Where this fits" title="Our API workflow">
                    <p className="mt-3 text-xs text-slate-300">
                        Hara Bhara exposes APIs for ingesting eco-action events from your
                        apps, and for reading Gbit balances, streaks and leaderboards. Use
                        this demo UI as-is or as a reference when embedding into your own
                        products.
                    </p>
                </Card>
            </section>
        </div>
    );
}
