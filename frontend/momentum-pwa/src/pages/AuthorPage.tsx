import { Link } from "react-router-dom"

const skills = [
  "Java",
  "Spring",
  "Node.js",
  "TypeScript",
  "Python",
  "Django",
  "FastApi",
  "SFCC",
  "Fluent Commerce OMS",
  "React",
  "Vue",
  "PostgreSQL",
  "Oracle",
  "Redis",
  "Playwright",
  "..."
]

const highlights = [
  "10+ years building stable backend systems for high-traffic e-commerce",
  "Architected SFCC + OMS + ERP integrations with data consistency safeguards",
  "Specialized in race-condition debugging, pre-production hardening, and performance tuning",
]

const solutions = [
  {
    title: "High-Concurrency Flash Sales",
    detail:
      "Optimized SFCC backend logic for large retail launches to prevent deadlocks and cache bottlenecks.",
  },
  {
    title: "ERP-to-OMS Synchronization",
    detail:
      "Engineered middleware to sync near real-time inventory between legacy ERP and Fluent Commerce OMS.",
  },
  {
    title: "Monolith Performance Recovery",
    detail:
      "Identified expensive script and collection patterns in legacy SFCC code and restored site performance.",
  },
]

const experience = [
  {
    company: "Groove Technology",
    role: "Senior Software Engineer",
    period: "Dec 2016 - Nov 2025",
    points: [
      "Led system reliability for AU/NZ e-commerce ecosystems.",
      "Designed OMS orchestration flows across third-party integrations.",
      "Delivered deep root-cause analysis for high-concurrency failures.",
    ],
  },
  {
    company: "Studio 60",
    role: "Software Engineer",
    period: "Aug 2015 - Nov 2016",
    points: [
      "Delivered Demandware/SFCC solutions for major retail brands.",
      "Built low-latency backend logic for high-traffic storefront requirements.",
    ],
  },
  {
    company: "NTT Data",
    role: "Software Engineer",
    period: "Nov 2013 - Dec 2014",
    points: [
      "Contributed to large-scale ERP ordering systems with Java/Spring/Struts.",
      "Improved Oracle and PostgreSQL query performance for enterprise workflows.",
    ],
  },
]

export default function AuthorPage() {
  return (
    <div className="min-h-full bg-neutral-100 text-neutral-900">
      <div className="mx-auto w-full max-w-6xl px-6 py-8 md:px-10 md:py-12">
        <header className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
                Author Profile
              </p>
              <h1 className="text-3xl font-bold leading-tight md:text-5xl">
                Phung The Dat
              </h1>
              <p className="text-base text-neutral-600 md:text-lg">
                Senior Software Engineer focused on resilient backend architecture, integration safety, and scalable commerce systems.
              </p>
              <div className="grid gap-2 text-sm text-neutral-600 sm:grid-cols-2">
                <p>Ho Chi Minh City, Vietnam</p>
                <p>10+ years experience</p>
                <a className="underline underline-offset-2" href="mailto:thedat230589@gmail.com">thedat230589@gmail.com</a>
                <p>+84 359 747 172</p>
              </div>
            </div>

            <div className="w-full rounded-xl border border-neutral-200 bg-neutral-50 p-5 lg:max-w-sm">
              <p className="text-sm font-semibold text-neutral-700">Looking For</p>
              <p className="mt-2 text-sm text-neutral-600">
                Senior backend or full-stack roles where architecture quality, reliability, and measurable system outcomes matter.
              </p>
              <a
                href="https://www.linkedin.com/in/phung-the-dat-1823b899/"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center rounded-md btn-primary px-4 py-2 text-sm"
              >
                View LinkedIn
              </a>
            </div>
          </div>
        </header>

        <main className="mt-8 grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-xl font-semibold">Why Hire Me</h2>
            <ul className="mt-4 space-y-3 text-sm text-neutral-700 md:text-base">
              {highlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Core Skills</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-xl font-semibold">Selected Architectural Solutions</h2>
            <div className="mt-4 space-y-4">
              {solutions.map((item) => (
                <article key={item.title} className="rounded-lg border border-neutral-200 p-4">
                  <h3 className="text-sm font-semibold md:text-base">{item.title}</h3>
                  <p className="mt-1 text-sm text-neutral-600">{item.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Education</h2>
            <ul className="mt-4 space-y-3 text-sm text-neutral-700">
              <li>Bachelor of Software Engineering, UIT - VNU HCM</li>
              <li>Salesforce Certified B2C Commerce Developer</li>
              <li>TOEIC 820</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-3">
            <h2 className="text-xl font-semibold">Experience</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {experience.map((job) => (
                <article key={job.company} className="rounded-lg border border-neutral-200 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">{job.period}</p>
                  <h3 className="mt-2 text-base font-semibold">{job.role}</h3>
                  <p className="text-sm text-neutral-600">{job.company}</p>
                  <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-3">
              <h2 className="text-xl font-semibold">Fun fact</h2>
              <div className="mt-4 grid gap-4">
                <p className="text-sm text-neutral-600">
                  I enjoy my spare time to craft web tools and offering them for free to anyone. See if you like these...
                </p>
                <div className="rounded-lg border border-neutral-200 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link
                      to="/"
                      className="inline-flex w-fit shrink-0 rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100"
                    >
                      Momentum
                    </Link>
                    <p className="text-sm text-neutral-600">
                      A lightweight habit tracker to help people stay consistent routines
                    </p>
                  </div>
                </div>
                
              </div>
            </section>
        </main>

        <footer className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:flex-row md:items-center">
          <p className="text-sm text-neutral-600">
            Open to high-impact engineering roles. Email: <a className="underline underline-offset-2" href="mailto:thedat230589@gmail.com">thedat230589@gmail.com</a>
          </p>
        </footer>
      </div>
    </div>
  )
}
