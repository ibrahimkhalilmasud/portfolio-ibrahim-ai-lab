import MotionReveal from "@/components/portfolio/MotionReveal";
import HeroVisual from "@/components/portfolio/HeroVisual";
import ServiceWorkerRegistration from "@/components/portfolio/ServiceWorkerRegistration";
import { getPortfolioData } from "@/lib/portfolio-content";

const navItems = [
  { href: "#hero", label: "Hero" },
  { href: "#ai-research-lab", label: "AI Research Lab" },
  { href: "#core-systems", label: "Core Systems" },
  { href: "#fashion-ai-projects", label: "Fashion AI Projects" },
  { href: "#technical-stack", label: "Technical Stack" },
  { href: "#research-direction", label: "Research Direction" },
  { href: "#github-systems", label: "GitHub Systems" },
  { href: "#publications-experiments", label: "Publications / Experiments" },
  { href: "#vision-statement", label: "Vision Statement" },
  { href: "#contact-collaboration", label: "Contact / Collaboration" },
];

const stackClusters = [
  {
    heading: "Computer Vision + Fashion Geometry",
    items: ["Body Segmentation", "Garment Parsing", "Pose Normalization", "Reconstruction"],
  },
  {
    heading: "Multimodal AI + Retrieval",
    items: ["Cross-Modal Embeddings", "Style Reasoning", "RAG", "Diffusion Controls"],
  },
  {
    heading: "Production Infrastructure",
    items: ["FastAPI Services", "Containerized Inference", "Caching + Queueing", "Observability"],
  },
];

export default async function Home() {
  const { projects, currentResearch, publications, github } = await getPortfolioData();

  const fashionProjects = projects.filter((project) => project.category === "Fashion AI Projects");
  const coreSystemProjects = projects.filter((project) => project.category === "Core Systems");

  const liveProjectCounter = projects.length;
  const modelCounter = projects.reduce((count, project) => count + project.focusTags.length, 0);

  return (
    <main className="lab-root">
      <ServiceWorkerRegistration />

      <header className="lab-header">
        <div className="lab-header-inner">
          <a href="#hero" className="brand-mark" aria-label="Go to top">
            IBRAHIM AI LAB
          </a>
          <nav aria-label="Section navigation">
            <ul className="header-nav-list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <section id="hero" className="hero-shell">
        <div className="hero-background-layer" aria-hidden="true" />
        <HeroVisual />
        <div className="hero-content">
          <MotionReveal>
            <p className="eyebrow">Applied AI Systems • Computer Vision • Fashion Intelligence</p>
            <h1>Building AI Infrastructure for Fashion Intelligence</h1>
            <p className="hero-subtitle">
              AI systems architect and technical founder engineering production-ready multimodal pipelines for virtual try-on,
              fabric intelligence, and deployment-grade fashion AI.
            </p>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <div className="hero-tag-grid">
              {[
                "Virtual Try-On",
                "Fabric Intelligence",
                "Multimodal AI",
                "Computer Vision",
                "Inference Systems",
                "Applied Research",
              ].map((tag) => (
                <span key={tag} className="focus-tag">
                  {tag}
                </span>
              ))}
            </div>
          </MotionReveal>

          <MotionReveal delay={0.2}>
            <div className="hero-metrics">
              <article>
                <p className="metric-value">{liveProjectCounter}</p>
                <p className="metric-label">Live Systems</p>
              </article>
              <article>
                <p className="metric-value">{modelCounter}</p>
                <p className="metric-label">Model Components</p>
              </article>
              <article>
                <p className="metric-value">{github.totalRepos}</p>
                <p className="metric-label">Curated Repositories</p>
              </article>
              <article>
                <p className="metric-value">{github.recentEvents}</p>
                <p className="metric-label">7-Day Activity Signals</p>
              </article>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.3}>
            <div className="currently-building">
              <p>Currently Building</p>
              <ul>
                <li>Temporal consistency controls for virtual runway try-on</li>
                <li>Textile embedding benchmark for material search and recommendation</li>
                <li>Cost-aware deployment orchestration for multimodel inference</li>
              </ul>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section id="ai-research-lab" className="section-block">
        <MotionReveal>
          <p className="section-kicker">AI Research Lab</p>
          <h2>Production-first research loop for fashion AI systems</h2>
        </MotionReveal>
        <div className="lab-two-column">
          <MotionReveal delay={0.05}>
            <article className="glass-card">
              <h3>Lab Operating Model</h3>
              <p>
                Each experiment is scoped against a deployable objective: lower return rates, better styling outcomes, faster product
                onboarding, and reliable inference at scale. Research tracks are validated against real deployment constraints from day
                one.
              </p>
            </article>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <article className="glass-card current-research-panel">
              <h3>Current Research Panel</h3>
              <ul>
                {currentResearch.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong>
                    <span>{item.status}</span>
                    <p>{item.detail}</p>
                  </li>
                ))}
              </ul>
            </article>
          </MotionReveal>
        </div>
      </section>

      <section id="core-systems" className="section-block">
        <MotionReveal>
          <p className="section-kicker">Core Systems</p>
          <h2>System-level architecture beyond portfolio cards</h2>
        </MotionReveal>
        <div className="project-narrative-grid">
          {coreSystemProjects.map((project, index) => (
            <MotionReveal key={project.slug} delay={0.05 * index}>
              <article className="project-narrative">
                <header>
                  <h3>{project.title}</h3>
                  <span>{project.currentStage}</span>
                </header>
                <dl>
                  <div>
                    <dt>Problem Statement</dt>
                    <dd>{project.problem}</dd>
                  </div>
                  <div>
                    <dt>Architecture</dt>
                    <dd>{project.architecture}</dd>
                  </div>
                  <div>
                    <dt>AI Models Used</dt>
                    <dd>{project.models}</dd>
                  </div>
                  <div>
                    <dt>Deployment Strategy</dt>
                    <dd>{project.deployment}</dd>
                  </div>
                  <div>
                    <dt>Real-World Application</dt>
                    <dd>{project.application}</dd>
                  </div>
                  <div>
                    <dt>Technical Challenges</dt>
                    <dd>{project.challenges}</dd>
                  </div>
                  <div>
                    <dt>Research Direction</dt>
                    <dd>{project.research}</dd>
                  </div>
                  <div>
                    <dt>Scalability Potential</dt>
                    <dd>{project.scalability}</dd>
                  </div>
                  <div>
                    <dt>Before / After Demo</dt>
                    <dd>{project.demo}</dd>
                  </div>
                </dl>
              </article>
            </MotionReveal>
          ))}
        </div>
      </section>

      <section id="fashion-ai-projects" className="section-block fashion-centerpiece">
        <MotionReveal>
          <p className="section-kicker">Fashion Intelligence Systems</p>
          <h2>Runway-grade applied AI for garment, fabric, and body understanding</h2>
        </MotionReveal>
        <div className="fashion-layout">
          <div className="fashion-editorial-panel">
            <p>
              Designed as the centerpiece: this layer blends editorial storytelling with inference pipelines, showing how virtual
              dressing, textile intelligence, garment reconstruction, and diffusion workflows become deployable systems.
            </p>
            <ul>
              <li>AI virtual dressing + body segmentation</li>
              <li>Fabric simulation priors + textile intelligence retrieval</li>
              <li>Garment reconstruction for reusable geometry assets</li>
              <li>Diffusion workflows tuned for production latency budgets</li>
            </ul>
          </div>

          <div className="fashion-projects-list">
            {fashionProjects.map((project, index) => (
              <MotionReveal key={project.slug} delay={0.08 * index}>
                <article className="fashion-project-row">
                  <h3>{project.title}</h3>
                  <p>{project.problem}</p>
                  <div className="pipeline-strip">
                    {project.focusTags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <p className="pipeline-note">Pipeline: {project.architecture}</p>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="technical-stack" className="section-block">
        <MotionReveal>
          <p className="section-kicker">Technical Stack</p>
          <h2>Applied stack optimized for multimodal research and production delivery</h2>
        </MotionReveal>
        <div className="stack-grid">
          {stackClusters.map((cluster, index) => (
            <MotionReveal key={cluster.heading} delay={0.06 * index}>
              <article className="glass-card">
                <h3>{cluster.heading}</h3>
                <ul>
                  {cluster.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </MotionReveal>
          ))}
        </div>
      </section>

      <section id="research-direction" className="section-block">
        <MotionReveal>
          <p className="section-kicker">Research Direction</p>
          <h2>From visual intelligence to resilient deployment systems</h2>
        </MotionReveal>
        <MotionReveal delay={0.05}>
          <article className="glass-card">
            <p>
              The roadmap centers on resilient multimodal systems: temporal try-on, robust body understanding, fabric-aware retrieval,
              and explainable style reasoning. Every direction is measured by deployment readiness, not demo novelty.
            </p>
            <div className="direction-grid">
              <div>
                <h3>Near-term</h3>
                <p>Temporal consistency + mobile inference optimization.</p>
              </div>
              <div>
                <h3>Mid-term</h3>
                <p>Unified garment geometry and textile embedding foundation models.</p>
              </div>
              <div>
                <h3>Long-term</h3>
                <p>End-to-end AI infrastructure replacing static fashion content production.</p>
              </div>
            </div>
          </article>
        </MotionReveal>
      </section>

      <section id="github-systems" className="section-block">
        <MotionReveal>
          <p className="section-kicker">GitHub Systems</p>
          <h2>Curated research, production, experiments, and infrastructure activity</h2>
        </MotionReveal>

        <div className="github-top-metrics">
          <article className="glass-card">
            <h3>Repository Activity</h3>
            <p>{github.totalRepos} active repositories</p>
          </article>
          <article className="glass-card">
            <h3>Deployment Status</h3>
            <p>{github.deploymentStatus}</p>
          </article>
          <article className="glass-card">
            <h3>Commit Heat Signals</h3>
            <p>{github.recentEvents} public events in the last 7 days</p>
          </article>
        </div>

        <div className="github-columns">
          {(Object.keys(github.curated) as Array<keyof typeof github.curated>).map((category) => (
            <MotionReveal key={category}>
              <article className="glass-card">
                <h3>{category}</h3>
                <ul className="repo-list">
                  {github.curated[category].length > 0 ? (
                    github.curated[category].map((repo) => (
                      <li key={repo.name}>
                        <a href={repo.html_url} target="_blank" rel="noreferrer">
                          {repo.name}
                        </a>
                        <p>{repo.description ?? "Applied AI system repository"}</p>
                      </li>
                    ))
                  ) : (
                    <li>
                      <p>Curating repositories in this track.</p>
                    </li>
                  )}
                </ul>
              </article>
            </MotionReveal>
          ))}
        </div>

        <MotionReveal>
          <article className="glass-card">
            <h3>Language Analytics</h3>
            <ul className="language-list">
              {github.languageMix.map((language) => (
                <li key={language.language}>
                  <span>{language.language}</span>
                  <span>{language.count}</span>
                </li>
              ))}
            </ul>
          </article>
        </MotionReveal>
      </section>

      <section id="publications-experiments" className="section-block">
        <MotionReveal>
          <p className="section-kicker">Publications / Experiments</p>
          <h2>Research artifacts, engineering notes, and active experiments</h2>
        </MotionReveal>
        <div className="publication-grid">
          {publications.map((item, index) => (
            <MotionReveal key={item.title} delay={0.06 * index}>
              <article className="glass-card">
                <p className="publication-type">{item.type}</p>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noreferrer" className="text-link">
                    Open artifact
                  </a>
                ) : null}
              </article>
            </MotionReveal>
          ))}
        </div>
      </section>

      <section id="vision-statement" className="section-block">
        <MotionReveal>
          <p className="section-kicker">Vision Statement</p>
          <h2>
            This is not a web portfolio. It is a live AI systems narrative focused on how fashion, computer vision, and multimodal
            engineering converge in production.
          </h2>
        </MotionReveal>
      </section>

      <section id="contact-collaboration" className="section-block contact-block">
        <MotionReveal>
          <p className="section-kicker">Contact / Collaboration</p>
          <h2>For research collaboration, AI product partnerships, and fashion-tech system design</h2>
        </MotionReveal>
        <MotionReveal delay={0.06}>
          <div className="contact-grid">
            <a href="mailto:ibrahimkhalilmasud@gmail.com">ibrahimkhalilmasud@gmail.com</a>
            <a href="https://github.com/ibrahimkhalilmasud" target="_blank" rel="noreferrer">
              github.com/ibrahimkhalilmasud
            </a>
            <a href="https://linkedin.com/in/ibrahim-khalil-masud" target="_blank" rel="noreferrer">
              linkedin.com/in/ibrahim-khalil-masud
            </a>
          </div>
        </MotionReveal>
      </section>
    </main>
  );
}
