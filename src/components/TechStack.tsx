import {
  Bot,
  Braces,
  Database,
  LayoutTemplate,
  Server,
  type LucideIcon,
} from 'lucide-react';
import { SKILLS } from '../data';
import { SkillGroup } from '../types';
import { motion } from 'motion/react';

const CATEGORY_META: Record<
  string,
  { icon: LucideIcon; chip: string; iconBg: string; ring: string }
> = {
  languages: {
    icon: Braces,
    chip: 'border-amber-100/80 bg-amber-50/70 text-amber-900 hover:border-amber-200',
    iconBg: 'bg-amber-100 text-amber-700',
    ring: 'ring-amber-100/80',
  },
  frontend: {
    icon: LayoutTemplate,
    chip: 'border-blue-100/80 bg-blue-50/70 text-blue-900 hover:border-blue-200',
    iconBg: 'bg-blue-100 text-blue-700',
    ring: 'ring-blue-100/80',
  },
  backend: {
    icon: Server,
    chip: 'border-violet-100/80 bg-violet-50/70 text-violet-900 hover:border-violet-200',
    iconBg: 'bg-violet-100 text-violet-700',
    ring: 'ring-violet-100/80',
  },
  databases: {
    icon: Database,
    chip: 'border-emerald-100/80 bg-emerald-50/70 text-emerald-900 hover:border-emerald-200',
    iconBg: 'bg-emerald-100 text-emerald-700',
    ring: 'ring-emerald-100/80',
  },
  'ai-tools': {
    icon: Bot,
    chip: 'border-rose-100/80 bg-rose-50/70 text-rose-900 hover:border-rose-200',
    iconBg: 'bg-rose-100 text-rose-700',
    ring: 'ring-rose-100/80',
  },
};

function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const meta = CATEGORY_META[group.id] ?? CATEGORY_META.frontend;
  const Icon = meta.icon;
  const spansTwo = group.id === 'ai-tools';

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className={`group flex flex-col rounded-2xl border border-gray-100/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7 ${
        spansTwo ? 'lg:col-span-2' : ''
      }`}
    >
      <div className="mb-5 flex items-start gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-4 ${meta.iconBg} ${meta.ring}`}
        >
          <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
        </div>
        <div className="min-w-0">
          <h4 className="text-lg font-extrabold tracking-tight text-gray-950">{group.category}</h4>
          <p className="mt-1 text-sm font-medium leading-snug text-gray-500">{group.description}</p>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className={`inline-flex items-center rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${meta.chip}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export default function TechStack() {
  const totalSkills = SKILLS.reduce((n, g) => n + g.skills.length, 0);

  return (
    <section
      id="skills"
      className="border-y border-gray-100/50 bg-gradient-to-b from-slate-50/40 via-white to-transparent py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center sm:mb-14"
        >
          <h3 className="text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
            Tech Stack
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-gray-600">
            Tools and technologies I use to build reliable products — from UI and APIs to data and
            AI workflows.
          </p>
          <p className="mt-3 text-sm font-semibold text-gray-400">
            {SKILLS.length} areas · {totalSkills} technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {SKILLS.map((group, index) => (
            <SkillCard key={group.id} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
