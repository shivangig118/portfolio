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
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-gray-950/45 backdrop-blur-xs"
      />

      {/* Card Content body */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative bg-white border border-gray-100 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col z-10"
      >
        {/* Header toolbar */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-gray-100 flex-shrink-0">
          <div>
            <span className="text-xs font-bold text-blue-600 tracking-wider uppercase mb-1 block">Project Case Study</span>
            <h4 className="text-2xl font-extrabold text-gray-950 tracking-tight">{project.title}</h4>
          </div>
          <button
            onClick={onClose}
            id="close-project-modal"
            className="p-1 px-2.5 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-500 hover:text-gray-920 rounded-xl transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable View body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-6">
            {/* Product Long Description */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Overview</span>
              <p className="text-base text-gray-600 font-medium leading-relaxed">{project.longDescription}</p>
            </div>

            {/* Mock code block */}
            {project.codeSnippet && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Core Implementation Module</span>
                <div className="bg-[#1e1e24] p-5 rounded-xl font-mono text-xs sm:text-sm text-gray-300 leading-relaxed overflow-x-auto shadow-inner">
                  <pre>{project.codeSnippet}</pre>
                </div>
              </div>
            )}

            {/* Core Features list */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Key Engineering Deliverables</span>
              <div className="space-y-2.5">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm sm:text-base font-semibold">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3.5 py-1.5 bg-gray-50 text-gray-600 border border-gray-100 rounded-xl text-xs font-bold shadow-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Creatively added GitHub Button area in the sticky modal footer */}
        <div className="px-6 py-4.5 bg-slate-50 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:items-center justify-between flex-shrink-0">
          <div className="text-xs font-medium text-gray-400">
            Explore the codebase and star the repository on GitHub.
          </div>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3 text-sm font-bold text-white bg-slate-900 hover:bg-black rounded-xl transition-all shadow-md shadow-slate-900/10 cursor-pointer active:scale-95"
            >
              <Github className="h-4.5 w-4.5" />
              <span>Explore Source Code</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}
