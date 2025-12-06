import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import SiteFooter from "@/components/site-footer";
import { UserProvider } from "@/context/user-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hara Bhara - Gamified Sustainability Platform",
  description:
    "Hara Bhara turns real-world eco-actions into Gbits - green credits that make sustainable living feel like a game.",
};
// Use the site icon (replace `protect-earth.svg` with a PNG if you prefer)
export const icons = {
  // prefer JPG (user provided) with svg as fallback
  icon: '/protect-earth.jpg',
  apple: '/protect-earth.jpg',
  shortcut: '/protect-earth.jpg',
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-slate-950 via-slate-950 to-black text-slate-50`}
      >
        <UserProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 bg-gradient-to-b from-emerald-950/40 via-slate-950 to-black">
              {children}
            </main>
            <SiteFooter />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
