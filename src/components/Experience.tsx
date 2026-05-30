import { Briefcase, GraduationCap } from 'lucide-react';
import { EXPERIENCES } from '../data';
import { motion } from 'motion/react';

export default function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-24 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-950 text-center mb-16 tracking-tight">
          Experience & Exposure
        </h3>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gray-200 hidden md:block" />

          <div className="space-y-12 md:space-y-0 relative">
            {EXPERIENCES.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = exp.type === 'work' ? Briefcase : GraduationCap;

              return (
                <div key={exp.id} className="relative md:grid md:grid-cols-2 md:gap-8 items-center">
                  {/* Left Side Content for Even indexes (or spacer) */}
                  <div className={`md:flex ${isEven ? 'md:justify-end' : 'md:order-last'}`}>
                    {!isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="w-full md:max-w-md bg-white border border-gray-100/80 rounded-2xl p-6 shadow-sm shadow-gray-100/10 hover:shadow-md transition-shadow relative"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xl font-bold text-gray-950">{exp.role}</h4>
                          <span className="text-xs sm:text-sm font-semibold text-gray-400">
                            {exp.duration}
                          </span>
                        </div>
                        <span className="inline-block text-sm font-bold text-blue-600 mb-4 h-5">
                          {exp.company}
                        </span>
                        <ul className="space-y-2.5 text-sm sm:text-base text-gray-600 font-medium">
                          {exp.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex gap-2.5 items-start">
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>

                  <div className="absolute left-0 md:left-1/2 top-6 md:top-1/2 transform -translate-y-1/2 md:-translate-x-1/2 flex items-center justify-center z-10">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-white bg-blue-600 text-white flex items-center justify-center shadow-md animate-pulse-slow">
                      <Icon className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                  </div>

                  <div className={`ml-14 md:ml-0 md:flex ${isEven ? 'md:order-last' : 'md:justify-start'}`}>
                    {isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="w-full md:max-w-md bg-white border border-gray-100/80 rounded-2xl p-6 shadow-sm shadow-gray-100/10 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xl font-bold text-gray-950">{exp.role}</h4>
                          <span className="text-xs sm:text-sm font-semibold text-gray-400">
                            {exp.duration}
                          </span>
                        </div>
                        <span className="inline-block text-sm font-bold text-blue-600 mb-4 h-5">
                          {exp.company}
                        </span>
                        <ul className="space-y-2.5 text-sm sm:text-base text-gray-600 font-medium">
                          {exp.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex gap-2.5 items-start">
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
