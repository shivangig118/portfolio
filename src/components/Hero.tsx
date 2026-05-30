import { Download, ArrowRight, MapPin, Sparkles, Terminal, Code } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenResume: () => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
  const badges = [
    { text: 'Fresher SDE', icon: Terminal },
    { text: 'Full Stack', icon: Code },
    { text: 'AI Enthusiast', icon: Sparkles },
    { text: 'Based in Bangalore', icon: MapPin },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-grid">
      {/* Background radial highlight for elite feel */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-100/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Badge Row */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2.5 mb-6 sm:mb-8">
            {badges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 border border-violet-100/50 text-violet-600 rounded-full text-xs font-semibold tracking-wide shadow-sm"
                >
                  <Icon className="h-3.5 w-3.5 text-violet-500" />
                  {badge.text}
                </div>
              );
            })}
          </motion.div>

          {/* Core Headings */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7.5xl font-black text-gray-900 tracking-tight leading-none mb-4 sm:mb-6"
          >
            Shivangi Goyal
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight leading-relaxed max-w-2xl mb-6"
          >
            Software Development Engineer |{' '}
            <span className="text-blue-600">AI-Driven Product Builder</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-gray-600 font-medium leading-relaxed max-w-3xl mb-8 sm:mb-10 text-pretty"
          >
            I build robust, scalable applications bridging full-stack development with innovative AI
            integrations. Passionate about clean code, elegant architecture, and solving complex
            problems.
          </motion.p>

          {/* CTA Button Group */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <a
              href="#projects"
              id="hero-view-projects-btn"
              className="group inline-flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-lg hover:shadow-xl shadow-blue-600/15 cursor-pointer text-center"
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

            <button
              onClick={onOpenResume}
              id="hero-download-resume-btn"
              className="inline-flex items-center justify-center px-6 py-3.5 border-2 border-blue-600 text-base font-bold rounded-xl text-blue-600 bg-white hover:bg-blue-50 active:scale-95 transition-all shadow-sm hover:shadow cursor-pointer text-center"
            >
              Download Resume
              <Download className="ml-2 h-4 w-4" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
