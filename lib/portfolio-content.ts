import { promises as fs } from "node:fs";
import path from "node:path";

export interface ProjectNarrative {
  slug: string;
  title: string;
  category: string;
  focusTags: string[];
  currentStage: string;
  problem: string;
  architecture: string;
  models: string;
  deployment: string;
  application: string;
  challenges: string;
  research: string;
  scalability: string;
  demo: string;
}

export interface CurrentResearchItem {
  title: string;
  status: string;
  detail: string;
}

export interface PublicationItem {
  title: string;
  type: string;
  summary: string;
  link?: string;
}

function parseFrontmatter(raw: string): { frontmatter: Record<string, string>; body: string } {
  if (!raw.startsWith("---\n")) {
    return { frontmatter: {}, body: raw };
  }

  const end = raw.indexOf("\n---\n", 4);
  if (end === -1) {
    return { frontmatter: {}, body: raw };
  }

  const block = raw.slice(4, end).trim();
  const body = raw.slice(end + 5).trim();

  const frontmatter = block.split("\n").reduce<Record<string, string>>((acc, line) => {
    const index = line.indexOf(":");
    if (index === -1) return acc;
    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim();
    acc[key] = value;
    return acc;
  }, {});

  return { frontmatter, body };
}

function parseMarkdownSections(body: string): Record<string, string> {
  const sections: Record<string, string> = {};
  const matches = body.matchAll(/^##\s+(.+)$/gm);
  const headings = Array.from(matches);

  for (let i = 0; i < headings.length; i += 1) {
    const heading = headings[i];
    const headingText = heading[1].trim().toLowerCase();
    const start = (heading.index ?? 0) + heading[0].length;
    const end = i + 1 < headings.length ? (headings[i + 1].index ?? body.length) : body.length;

    sections[headingText] = body.slice(start, end).trim().replace(/\n+/g, " ");
  }

  return sections;
}

function toProjectNarrative(slug: string, raw: string): ProjectNarrative {
  const { frontmatter, body } = parseFrontmatter(raw);
  const sections = parseMarkdownSections(body);

  const tags = (frontmatter.tags ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return {
    slug,
    title: frontmatter.title ?? slug,
    category: frontmatter.category ?? "Research",
    focusTags: tags,
    currentStage: frontmatter.stage ?? "Active",
    problem: sections["problem statement"] ?? "",
    architecture: sections["architecture"] ?? "",
    models: sections["ai models used"] ?? "",
    deployment: sections["deployment strategy"] ?? "",
    application: sections["real-world application"] ?? "",
    challenges: sections["technical challenges"] ?? "",
    research: sections["research direction"] ?? "",
    scalability: sections["scalability potential"] ?? "",
    demo: sections["before / after demo"] ?? "",
  };
}

async function readProjectNarratives(): Promise<ProjectNarrative[]> {
  const contentDir = path.join(process.cwd(), "content", "projects");
  const files = await fs.readdir(contentDir);

  const markdownFiles = files.filter((file) => file.endsWith(".md")).sort();

  const projects = await Promise.all(
    markdownFiles.map(async (file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = await fs.readFile(path.join(contentDir, file), "utf8");
      return toProjectNarrative(slug, raw);
    })
  );

  return projects;
}

async function readCurrentResearchPanel(): Promise<CurrentResearchItem[]> {
  const filePath = path.join(process.cwd(), "content", "research", "current-research.md");
  const raw = await fs.readFile(filePath, "utf8");

  return raw
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2))
    .map((line) => {
      const [title = "", status = "", detail = ""] = line.split("|").map((item) => item.trim());
      return { title, status, detail };
    });
}

async function readPublicationItems(): Promise<PublicationItem[]> {
  const filePath = path.join(process.cwd(), "content", "research", "publications-experiments.md");
  const raw = await fs.readFile(filePath, "utf8");

  return raw
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2))
    .map((line) => {
      const [title = "", type = "", summary = "", link = ""] = line.split("|").map((item) => item.trim());
      return { title, type, summary, link: link || undefined };
    });
}

interface GitHubRepo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  topics?: string[];
  updated_at: string;
}

interface GitHubEvent {
  type: string;
  created_at: string;
}

function repoCategory(repo: GitHubRepo): "Research" | "Production Systems" | "Experimental Labs" | "Infrastructure" {
  const text = `${repo.name} ${(repo.topics ?? []).join(" ")} ${repo.description ?? ""}`.toLowerCase();

  if (/infra|pipeline|deploy|docker|ci|k8s|ops/.test(text)) return "Infrastructure";
  if (/experiment|lab|prototype|sandbox/.test(text)) return "Experimental Labs";
  if (/api|platform|app|system|production|service/.test(text)) return "Production Systems";
  return "Research";
}

export interface GitHubSnapshot {
  totalRepos: number;
  curated: Record<"Research" | "Production Systems" | "Experimental Labs" | "Infrastructure", GitHubRepo[]>;
  languageMix: Array<{ language: string; count: number }>;
  recentEvents: number;
  deploymentStatus: "Operational" | "Monitoring";
}

async function readGitHubSnapshot(): Promise<GitHubSnapshot> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-ibrahim-ai-lab",
  };

  const [reposRes, eventsRes] = await Promise.all([
    fetch("https://api.github.com/users/ibrahimkhalilmasud/repos?per_page=100&sort=updated", {
      headers,
      next: { revalidate: 3600 },
    }),
    fetch("https://api.github.com/users/ibrahimkhalilmasud/events/public?per_page=100", {
      headers,
      next: { revalidate: 1800 },
    }),
  ]);

  const repos = reposRes.ok ? ((await reposRes.json()) as GitHubRepo[]) : [];
  const events = eventsRes.ok ? ((await eventsRes.json()) as GitHubEvent[]) : [];

  const filtered = repos
    .filter((repo) => !repo.fork && !repo.archived)
    .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at));

  const curated: GitHubSnapshot["curated"] = {
    Research: [],
    "Production Systems": [],
    "Experimental Labs": [],
    Infrastructure: [],
  };

  for (const repo of filtered) {
    const category = repoCategory(repo);
    if (curated[category].length < 3) {
      curated[category].push(repo);
    }
  }

  const languageMap = new Map<string, number>();
  for (const repo of filtered) {
    if (!repo.language) continue;
    languageMap.set(repo.language, (languageMap.get(repo.language) ?? 0) + 1);
  }

  const languageMix = Array.from(languageMap.entries())
    .map(([language, count]) => ({ language, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recentEvents = events.filter((event) => Date.parse(event.created_at) >= weekAgo).length;

  return {
    totalRepos: filtered.length,
    curated,
    languageMix,
    recentEvents,
    deploymentStatus: recentEvents >= 3 ? "Operational" : "Monitoring",
  };
}

export async function getPortfolioData() {
  const [projects, currentResearch, publications, github] = await Promise.all([
    readProjectNarratives(),
    readCurrentResearchPanel(),
    readPublicationItems(),
    readGitHubSnapshot(),
  ]);

  return { projects, currentResearch, publications, github };
}
