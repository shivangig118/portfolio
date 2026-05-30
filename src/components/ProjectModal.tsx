import { X, CheckCircle, Github, ExternalLink } from 'lucide-react';
import { Project } from '../types';
import { motion } from 'motion/react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-gray-950/45 backdrop-blur-xs"
        aria-hidden
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl"
      >
        <div className="flex flex-shrink-0 items-start justify-between gap-4 border-b border-gray-100 px-6 py-4.5">
          <div>
            <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-blue-600">
              {project.category}
            </span>
            <h4 id="project-modal-title" className="text-2xl font-extrabold tracking-tight text-gray-950">
              {project.title}
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-blue-100 bg-blue-50/60 px-2.5 py-1 text-xs font-semibold text-blue-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            id="close-project-modal"
            aria-label="Close project details"
            className="cursor-pointer rounded-xl border border-gray-100 bg-gray-50 p-2.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          <div className="space-y-2">
            <span className="block text-xs font-bold uppercase tracking-widest text-gray-400">
              Overview
            </span>
            <p className="text-base font-medium leading-relaxed text-gray-600">
              {project.longDescription}
            </p>
          </div>

          {project.codeSnippet && (
            <div className="space-y-2">
              <span className="block text-xs font-bold uppercase tracking-widest text-gray-400">
                Core implementation
              </span>
              <div className="overflow-x-auto rounded-xl bg-[#1e1e24] p-5 font-mono text-xs leading-relaxed text-gray-300 shadow-inner sm:text-sm">
                <pre className="whitespace-pre-wrap">{project.codeSnippet}</pre>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <span className="block text-xs font-bold uppercase tracking-widest text-gray-400">
              Key deliverables
            </span>
            <ul className="space-y-2.5">
              {project.features.map((feat) => (
                <li key={feat} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700 sm:text-base">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-1.5 text-xs font-bold text-gray-600 shadow-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-shrink-0 flex-col justify-between gap-3 border-t border-gray-100 bg-slate-50 px-6 py-4.5 sm:flex-row sm:items-center">
          <p className="text-xs font-medium text-gray-500">
            View the repository for setup instructions and source code.
          </p>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-md shadow-slate-900/10 transition-all hover:bg-black active:scale-95"
            >
              <Github className="h-4 w-4" />
              <span>View on GitHub</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}
