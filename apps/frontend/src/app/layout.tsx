import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import Providers from "./Providers";
import "./globals.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://optishrink.vercel.app"),
  title: {
    default: "OptiShrink — compress PDFs and optimize images",
    template: "%s — OptiShrink",
  },
  description:
    "A focused file compression tool for PDFs and images. Three levels, batch runs, real before-and-after sizes, and a history that stays with you.",
  keywords: ["compress PDF", "optimize images", "image compression", "PDF compressor", "OptiShrink"],
  openGraph: {
    title: "OptiShrink — compress PDFs and optimize images",
    description:
      "A focused file compression tool for PDFs and images. Three levels, batch runs, real before-and-after sizes, and a history that stays with you.",
    type: "website",
    siteName: "OptiShrink",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f16" },
  ],
};

const themeScript = `
try {
  var stored = localStorage.getItem("optishrink-theme");
  if (stored === "dark") document.documentElement.classList.add("dark");
} catch {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${sans.variable} ${mono.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
