import { Mail, Linkedin, Github } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactProps {
  onOpenEmailForm: () => void;
}

export default function Contact({ onOpenEmailForm }: ContactProps) {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-md shadow-gray-100/10 max-w-3xl mx-auto text-center"
        >
          <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mb-4 tracking-tight">
            Let's connect
          </h3>

          <p className="text-base sm:text-lg text-gray-600 font-medium leading-relaxed max-w-xl mx-auto mb-8 text-pretty">
            I'm currently open to new opportunities. Whether you have a question or just want to say
            hi, I'll try my best to get back to you!
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {/* Email button */}
            <button
              onClick={onOpenEmailForm}
              id="contact-email-me-btn"
              className="inline-flex items-center gap-2 px-6 py-3 border border-transparent text-sm sm:text-base font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-md hover:shadow-lg shadow-blue-500/10 cursor-pointer"
            >
              <Mail className="h-4.5 w-4.5" />
              Email Me
            </button>

            {/* LinkedIn button */}
            <a
              href="https://www.linkedin.com/in/shivangi-goyal-46817a222"
              target="_blank"
              rel="noopener noreferrer"
              id="contact-linkedin-btn"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-100/80 hover:border-blue-600 hover:text-blue-600 text-sm sm:text-base font-bold rounded-xl text-gray-700 bg-white hover:bg-slate-50 active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <Linkedin className="h-4.5 w-4.5 text-gray-500 hover:text-blue-600" />
              LinkedIn
            </a>

            {/* GitHub button */}
            <a
              href="https://github.com/shivangig118"
              target="_blank"
              rel="noopener noreferrer"
              id="contact-github-btn"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-100/80 hover:border-blue-600 hover:text-blue-600 text-sm sm:text-base font-bold rounded-xl text-gray-700 bg-white hover:bg-slate-50 active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <Github className="h-4.5 w-4.5 text-gray-500 hover:text-blue-600" />
              GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
