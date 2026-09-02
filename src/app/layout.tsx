import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "TechPartner | Your Dedicated Monthly Tech Partner — $200/mo",
  description:
    "AI automation, custom software, and business system optimization for a flat $200/month fee. No contracts. 30+ services included.",
  keywords: [
    "TechPartner",
    "AI automation",
    "business technology",
    "custom software",
    "tech support",
    "small business tech",
    "AI tools",
    "website development",
    "workflow automation",
  ],
  authors: [{ name: "TechPartner" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "TechPartner | $200/mo Everything-Included Tech Partner",
    description:
      "AI automation, custom apps, websites, and more — all for one flat monthly fee. No contracts, no surprises.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-[#050a12] text-slate-200">
        {children}
        <Toaster />
      </body>
    </html>
  );
}