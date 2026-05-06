import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Ibrahim Khalil | AI Engineer & Computer Vision Developer",
  description:
    "AI Engineer specializing in Computer Vision, Fashion AI, and intelligent digital experiences. Building the future with PyTorch, OpenCV, and cutting-edge AI systems.",
  keywords: [
    "AI Engineer",
    "Computer Vision",
    "Fashion AI",
    "Machine Learning",
    "Muhammad Ibrahim Khalil",
    "PyTorch",
    "Deep Learning",
  ],
  authors: [{ name: "Muhammad Ibrahim Khalil" }],
  openGraph: {
    title: "Muhammad Ibrahim Khalil | AI Engineer & Computer Vision Developer",
    description:
      "Building AI systems for fashion, automation, and intelligent digital experiences.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ibrahim Khalil | AI Engineer",
    description: "Building AI systems for fashion, automation, and intelligent digital experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-black text-white antialiased">{children}</body>
    </html>
  );
}
