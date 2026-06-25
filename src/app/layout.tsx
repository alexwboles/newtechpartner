import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}