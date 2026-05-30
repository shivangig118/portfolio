import { useState } from 'react';
import { ArrowUpRight, Code2, LineChart, Cpu, X, CheckCircle } from 'lucide-react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectsProps {
  onOpenDetails: (project: Project) => void;
}

export default function Projects({ onOpenDetails }: ProjectsProps) {
  return (
    <section id="projects" className="py-16 sm:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight mb-16">
          Featured Projects
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: SummAIze (Code mockup header) */}
          <motion.div
            whileHover={{ y: -6 }}
            className="flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Top custom code mockup */}
            <div className="bg-[#1e1e24] p-6 relative font-mono text-xs sm:text-sm text-gray-300 min-h-[160px] flex flex-col justify-center border-b border-gray-800">
              <div className="absolute top-3.5 left-4 flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="mt-4 leading-relaxed">
                <div>
                  <span className="text-indigo-400">import</span> {'{'} <span className="text-cyan-300">AIService</span> {'}'} <span className="text-indigo-400">from</span> <span className="text-green-300">'@summaize/core'</span>;
                </div>
                <div className="mt-2.5">
                  <span className="text-indigo-400">const</span> <span className="text-amber-300">summary</span> = <span className="text-indigo-300">await</span> <span className="text-cyan-300">AIService</span>.<span className="text-blue-300">process</span>(data);
                </div>
              </div>
            </div>

            {/* Content body */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-2xl font-extrabold text-gray-950 mb-3 tracking-tight">SummAIze</h4>
                <p className="text-gray-600 font-medium text-sm sm:text-base leading-relaxed mb-6">
                  {PROJECTS[0].description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {PROJECTS[0].tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 bg-violet-50/50 border border-violet-100/50 text-violet-600 rounded-lg text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* View details button */}
              <button
                onClick={() => onOpenDetails(PROJECTS[0])}
                id="proj-summaize-details"
                className="w-full inline-flex items-center justify-center py-3 px-4 border border-gray-100/80 hover:border-blue-600 hover:text-blue-600 text-sm font-bold rounded-xl text-gray-700 bg-white transition-all cursor-pointer shadow-sm hover:shadow active:scale-[0.99]"
              >
                View Details
              </button>
            </div>
          </motion.div>

          {/* Card 2: DataDash (Rising trend chart header) */}
          <motion.div
            whileHover={{ y: -6 }}
            className="flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Top visual graphic style index */}
            <div className="bg-violet-50/30 min-h-[160px] flex items-center justify-center border-b border-gray-100/30 relative">
              <div className="absolute top-3.5 left-4 flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-200/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-gray-200/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-gray-200/50" />
              </div>
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                whileInView={{ scale: [0.95, 1.05, 1] }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              >
                <LineChart className="h-16 w-16 text-blue-500 stroke-[1.2] drop-shadow-sm" />
              </motion.div>
            </div>

            {/* Content body */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-2xl font-extrabold text-gray-950 mb-3 tracking-tight">DataDash</h4>
                <p className="text-gray-600 font-medium text-sm sm:text-base leading-relaxed mb-6">
                  {PROJECTS[1].description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {PROJECTS[1].tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 bg-violet-50/50 border border-violet-100/50 text-violet-600 rounded-lg text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* View details button */}
              <button
                onClick={() => onOpenDetails(PROJECTS[1])}
                id="proj-datadash-details"
                className="w-full inline-flex items-center justify-center py-3 px-4 border border-gray-100/80 hover:border-blue-600 hover:text-blue-600 text-sm font-bold rounded-xl text-gray-700 bg-white transition-all cursor-pointer shadow-sm hover:shadow active:scale-[0.99]"
              >
                View Details
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
