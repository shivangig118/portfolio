import { Bot, Network } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-md shadow-gray-100/30"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight mb-6">
                Who I Am
              </h3>
              <div className="space-y-4 text-base sm:text-lg text-gray-600 font-medium leading-relaxed">
                <p>
                  I am a dedicated Software Development Engineer with a strong foundation in modern web
                  technologies and a keen interest in artificial intelligence. My approach is rooted in
                  architectural clarity and user-centric design, ensuring that every project I undertake
                  not only functions flawlessly but provides a seamless experience.
                </p>
                <p>
                  I thrive in environments that challenge me to learn and adapt, consistently seeking out
                  new tools and methodologies to improve my craft.
                </p>
              </div>
            </div>

            {}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center">
              {}
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                className="flex-1 p-6 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6">
                    <Bot className="h-5 w-5 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-950 mb-2">AI Apps</h4>
                  <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
                    Integrating intelligent models into practical applications.
                  </p>
                </div>
              </motion.div>

              {}
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                className="flex-1 p-6 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6">
                    <Network className="h-5 w-5 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-950 mb-2">Enterprise Systems</h4>
                  <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
                    Building scalable and robust backend architectures.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
