import { SKILLS } from '../data';
import { motion } from 'motion/react';

export default function TechStack() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring' as const, stiffness: 100 },
    },
  };

  return (
    <section id="skills" className="py-16 sm:py-24 bg-transparent border-t border-b border-gray-100/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-950 text-center mb-16 tracking-tight">
          Tech Stack
        </h3>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="space-y-6 sm:space-y-8"
        >
          {SKILLS.map((group, groupIdx) => (
            <motion.div
              key={groupIdx}
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-12 md:items-center gap-3 sm:gap-6 border-b border-gray-100/30 pb-6 sm:pb-8 last:border-b-0 last:pb-0"
            >
              {/* Left label: Category Name */}
              <div className="md:col-span-3">
                <span className="text-sm sm:text-base font-semibold text-gray-500 tracking-wide uppercase sm:normal-case">
                  {group.category}
                </span>
              </div>

              {/* Right content: Custom Rounded Chips */}
              <div className="md:col-span-9 flex flex-wrap gap-2.5">
                {group.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skillIdx}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-100/50 rounded-xl text-xs sm:text-sm font-semibold text-gray-800 shadow-sm shadow-gray-100/20"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
