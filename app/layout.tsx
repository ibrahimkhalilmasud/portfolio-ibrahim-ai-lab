import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ibrahim-ai-lab.vercel.app"),
  title: "Ibrahim Khalil Masud | AI Systems Architect for Fashion Intelligence",
  description:
    "Applied computer vision researcher and technical founder building production AI infrastructure for virtual try-on, fabric intelligence, and multimodal fashion systems.",
  keywords: [
    "AI systems architect",
    "computer vision researcher",
    "fashion AI",
    "multimodal AI engineer",
    "technical founder",
    "virtual try-on",
    "fabric intelligence",
  ],
  authors: [{ name: "Ibrahim Khalil Masud" }],
  openGraph: {
    title: "Ibrahim Khalil Masud | AI Research + Fashion Intelligence Systems",
    description:
      "Premium AI lab portfolio focused on production-ready computer vision and multimodal fashion infrastructure.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ibrahim Khalil Masud | AI Systems Architect",
    description: "Applied computer vision and multimodal AI for fashion intelligence systems.",
  },
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070709" },
    { media: "(prefers-color-scheme: light)", color: "#f2f3f5" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
