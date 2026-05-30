import { ArrowUpRight, Github, LineChart } from 'lucide-react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { motion } from 'motion/react';

interface ProjectsProps {
  onOpenDetails: (project: Project) => void;
}

function CodePreview() {
  return (
    <div className="mt-4 space-y-2.5 font-mono text-xs leading-relaxed sm:text-sm">
      <div>
        <span className="text-indigo-400">import</span> {'{ '}
        <span className="text-cyan-300">AIService</span>
        {' } '}
        <span className="text-indigo-400">from</span>{' '}
        <span className="text-green-300">'@summaize/core'</span>;
      </div>
      <div>
        <span className="text-indigo-400">const</span> <span className="text-amber-300">summary</span> ={' '}
        <span className="text-indigo-300">await</span> <span className="text-cyan-300">AIService</span>.
        <span className="text-blue-300">process</span>(data);
      </div>
    </div>
  );
}

function ChartPreview() {
  const bars = [42, 68, 55, 82, 61, 90, 74];

  return (
    <div className="flex h-24 w-full max-w-[220px] items-end justify-center gap-2 px-4">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.5, ease: 'easeOut' }}
          className="w-3 rounded-t-md bg-gradient-to-t from-blue-600 to-violet-400 opacity-90"
        />
      ))}
    </div>
  );
}

function ProjectCardHeader({ project }: { project: Project }) {
  const dots = (
    <div className="absolute top-3.5 left-4 flex gap-1.5">
      <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
      <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
      <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
    </div>
  );

  if (project.type === 'code') {
    return (
      <div className="relative flex min-h-[168px] flex-col justify-center border-b border-gray-800 bg-[#1e1e24] p-6 font-mono text-gray-300">
        {dots}
        <CodePreview />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[168px] flex-col items-center justify-center border-b border-gray-100/60 bg-gradient-to-br from-violet-50/80 via-white to-blue-50/50">
      <div className="absolute top-3.5 left-4 flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-gray-200/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-gray-200/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-gray-200/80" />
      </div>
      <ChartPreview />
      <LineChart className="absolute right-5 bottom-5 h-8 w-8 text-blue-500/30 stroke-[1.5]" aria-hidden />
    </div>
  );
}

function ProjectCard({
  project,
  index,
  onOpenDetails,
}: {
  project: Project;
  index: number;
  onOpenDetails: (project: Project) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <ProjectCardHeader project={project} />

      <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600">
              {project.category}
            </span>
          </div>

          <h4 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-950">{project.title}</h4>
          <p className="mb-4 text-sm font-medium leading-relaxed text-gray-600 sm:text-base">
            {project.description}
          </p>

          <ul className="mb-5 space-y-1.5">
            {project.highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <span className="h-1 w-1 shrink-0 rounded-full bg-blue-500" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mb-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-lg border border-violet-100/60 bg-violet-50/50 px-3 py-1 text-xs font-semibold text-violet-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => onOpenDetails(project)}
            id={`proj-${project.id}-details`}
            className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-gray-100/80 bg-white px-4 py-3 text-sm font-bold text-gray-700 shadow-sm transition-all hover:border-blue-600 hover:text-blue-600 hover:shadow active:scale-[0.99]"
          >
            View case study
            <ArrowUpRight className="h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              id={`proj-${project.id}-github`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-100 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800 transition-all hover:border-slate-300 hover:bg-slate-100 active:scale-[0.99]"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects({ onOpenDetails }: ProjectsProps) {
  return (
    <section id="projects" className="bg-transparent py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center sm:mb-16"
        >
          <h3 className="text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
            Featured Projects
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-gray-600">
            Production-style builds across AI tooling and observability — focused on clear architecture,
            performance, and shippable UX.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
