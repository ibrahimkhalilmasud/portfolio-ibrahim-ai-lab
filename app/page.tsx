"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const LoadingScreen = dynamic(() => import("@/components/layout/LoadingScreen"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/layout/CustomCursor"), { ssr: false });
const Header = dynamic(() => import("@/components/layout/Header"), { ssr: false });
const HeroSection = dynamic(() => import("@/components/sections/HeroSection"), { ssr: false });
const AILabSection = dynamic(() => import("@/components/sections/AILabSection"), { ssr: false });
const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"), { ssr: false });
const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"), { ssr: false });
const ResearchSection = dynamic(() => import("@/components/sections/ResearchSection"), { ssr: false });
const TimelineSection = dynamic(() => import("@/components/sections/TimelineSection"), { ssr: false });
const GitHubSection = dynamic(() => import("@/components/sections/GitHubSection"), { ssr: false });
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"), { ssr: false });

/** Fallback timeout so the page is never permanently blocked if onComplete is delayed. */
const LOADING_FALLBACK_MS = 3500;

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), LOADING_FALLBACK_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative bg-black min-h-screen overflow-x-hidden">
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <Header />
      <HeroSection />
      <AILabSection />
      <ProjectsSection />
      <SkillsSection />
      <ResearchSection />
      <TimelineSection />
      <GitHubSection />
      <ContactSection />
    </main>
  );
}
