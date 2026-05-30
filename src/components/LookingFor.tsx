import { Users, Target, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function LookingFor() {
  const items = [
    {
      icon: Users,
      title: 'Roles',
      description: 'Software Development Engineer, Full Stack Developer, AI Integration Engineer.',
    },
    {
      icon: Target,
      title: 'Interests',
      description: 'Building scalable systems, exploring GenAI applications, clean architecture.',
    },
    {
      icon: ShieldCheck,
      title: 'What I Bring',
      description: 'Strong analytical skills, adaptable learning mindset, focus on high-quality delivery.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100 },
    },
  };

  return (
    <section className="py-16 sm:py-24 bg-transparent border-b border-gray-100/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-md shadow-gray-100/10"
        >
          <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-950 text-center mb-16 tracking-tight">
            What I'm Looking For
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center md:divide-x md:divide-gray-100/60">
            {items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex flex-col items-center px-4 sm:px-6 first:pl-0 last:pr-0"
                >
                  {/* Circular Icon with light blue backing */}
                  <div className="h-12 w-12 rounded-full bg-blue-50 border border-blue-100/40 flex items-center justify-center mb-6">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>

                  <h4 className="text-xl font-bold text-gray-950 mb-3 tracking-tight">
                    {item.title}
                  </h4>

                  <p className="text-sm sm:text-base text-gray-600 font-semibold leading-relaxed max-w-xs text-pretty">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
