import { useRef } from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, Globe, Award, FileText } from 'lucide-react';
import { EXPERIENCES, PROJECTS, SKILLS } from '../data';
import { motion } from 'motion/react';

interface ResumeModalProps {
  onClose: () => void;
}

export default function ResumeModal({ onClose }: ResumeModalProps) {
  const printRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = () => {
    if (!printRef.current) return;

    const contentDiv = printRef.current.querySelector('.flex-1.overflow-y-auto');
    if (!contentDiv) return;

    // Clone and clean the content - remove all Tailwind classes
    const cleanClone = contentDiv.cloneNode(true) as HTMLElement;
    
    // Remove all class attributes to strip Tailwind
    const allElements = cleanClone.querySelectorAll('*');
    allElements.forEach((el) => {
      el.removeAttribute('class');
    });

    const printContent = cleanClone.innerHTML;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to print the resume');
      return;
    }

    const styles = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        @page {
          size: A4 portrait;
          margin: 15mm;
        }
        
        html, body {
          background: white;
          color: #1a202c;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.5;
          width: 100%;
        }
        
        body {
          padding: 0;
          margin: 0;
          overflow: visible;
        }
        
        /* Prevent content from splitting across pages unnecessarily */
        div {
          page-break-inside: avoid;
        }
        
        h1 {
          font-size: 2rem;
          font-weight: 900;
          color: #0f172a;
          margin-bottom: 0.5rem;
          page-break-after: avoid;
        }
        
        h3 {
          font-size: 0.875rem;
          font-weight: 700;
          color: #2563eb;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-bottom: 1px solid #d1d5db;
          padding-bottom: 0.5rem;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          page-break-after: avoid;
        }
        
        h4 {
          font-size: 1rem;
          font-weight: 700;
          color: #1a202c;
          page-break-after: avoid;
        }
        
        p {
          font-size: 0.875rem;
          color: #4b5563;
          margin: 0.25rem 0;
          line-height: 1.5;
        }
        
        li {
          font-size: 0.75rem;
          color: #4b5563;
          margin: 0.25rem 0 0.25rem 1.25rem;
          line-height: 1.5;
        }
        
        ul {
          margin: 0.5rem 0;
          padding: 0;
          list-style: disc;
        }
        
        /* Contact info styling */
        span {
          color: inherit;
          display: inline;
        }
        
        /* Prevent SVGs from appearing */
        svg {
          display: none !important;
        }
        
        /* Ensure proper section breaks */
        @media print {
          body {
            background: white;
          }
          div[class*="space"] {
            margin: 0 !important;
          }
          h3 {
            margin-top: 1.25rem;
            margin-bottom: 0.75rem;
          }
        }
      </style>
    `;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Resume - Shivangi Goyal</title>
          ${styles}
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      setTimeout(() => printWindow.close(), 500);
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-gray-950/45 backdrop-blur-xs no-print"
      />

      {/* Modal core */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative bg-white border border-gray-100 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-hidden flex flex-col z-10 print-modal-full"
        ref={printRef}
      >
        {/* Top Control Bar (Hidden on print) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0 no-print bg-slate-50/50">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <h4 className="text-lg font-bold text-gray-950 tracking-tight">Curriculum Vitae</h4>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              id="print-resume-btn"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-sm font-bold rounded-lg text-white shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              Download / Print PDF
            </button>
            <button
              onClick={onClose}
              id="close-resume-modal"
              className="p-2 hover:bg-gray-100 border border-transparent hover:border-gray-100 text-gray-500 hover:text-gray-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Curriculum Vitae Document */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-12 space-y-8 print:p-0 bg-white">
          {/* Resume Header */}
          <div className="border-b-2 border-slate-100 pb-6 text-center sm:text-left flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl sm:text-4.5xl font-black text-slate-900 tracking-tight leading-none">
                Shivangi Goyal
              </h1>
              <p className="text-base sm:text-lg font-bold text-blue-600 tracking-wide mt-2">
                Software Development Engineer | AI-Driven Product Builder
              </p>
            </div>

            <div className="space-y-1.5 text-xs sm:text-sm font-semibold text-gray-500 w-full sm:w-auto text-left sm:text-right">
              <div className="flex items-center sm:justify-end gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>shivangigoyal1108@gmail.com</span>
              </div>
              <div className="flex items-center sm:justify-end gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>Bangalore, Karnataka, India</span>
              </div>
              <div className="flex items-center sm:justify-end gap-2 text-blue-600">
                <Globe className="h-4 w-4 text-blue-400" />
                <span>linkedin.com/in/shivangi-goyal-46817a222</span>
              </div>
            </div>
          </div>

          {/* Section: Professional Summary */}
          <div className="space-y-2.5">
            <h3 className="text-sm font-bold text-blue-600 tracking-widest uppercase border-b border-gray-100 pb-1.5">
              Professional Summary
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed font-medium">
              Highly motivated and architectural-minded Software Development Engineer with robust
              skills spanning the complete web app compilation, microservices optimization, and AI
              pipeline integration ecosystem. Adept at driving software modularity, clean standards compliance, and sub-second analytical latencies.
            </p>
          </div>

          {/* Section: Experience */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-blue-600 tracking-widest uppercase border-b border-gray-100 pb-1.5">
              Professional Experience
            </h3>
            <div className="space-y-4">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <h4 className="text-base font-bold text-slate-800">
                      {exp.role} — <span className="text-blue-600">{exp.company}</span>
                    </h4>
                    <span className="text-xs font-bold text-gray-400">{exp.duration}</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600 font-medium">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Core Skills */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-blue-600 tracking-widest uppercase border-b border-gray-100 pb-1.5">
              Technical Skill Matrix
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SKILLS.map((grp, idx) => (
                <div key={idx} className="text-xs font-semibold">
                  <span className="text-slate-500 uppercase tracking-wider block mb-1">
                    {grp.category}
                  </span>
                  <p className="text-slate-800 leading-relaxed font-semibold">
                    {grp.skills.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Featured Projects */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-blue-600 tracking-widest uppercase border-b border-gray-100 pb-1.5">
              Key Academic / Personal Engineering Projects
            </h3>
            <div className="space-y-4">
              {PROJECTS.map((p) => (
                <div key={p.id} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <h4 className="text-base font-bold text-slate-800">{p.title}</h4>
                    <span className="text-xs font-bold text-gray-400">{p.tags.join(' | ')}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    {p.longDescription}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Education */}
          <div className="space-y-2.5">
            <h3 className="text-sm font-bold text-blue-600 tracking-widest uppercase border-b border-gray-100 pb-1.5">
              Education
            </h3>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-slate-800">
                  Bachelor of Technology (B.Tech) in Computer Science & Engineering
                </h4>
                <span className="text-xs font-bold text-gray-400">Class of 2025</span>
              </div>
              <p className="text-xs text-slate-500 font-semibold">First Class with Distinction</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Embedded CSS rules for clean custom printing & hide site wrappers */}
      <style>{`
        @media print {
          body, html {
            background: white !important;
            color: black !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          .print-modal-full {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            max-height: none !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            overflow: visible !important;
          }
          #root {
            display: none !important;
          }
          body > div:last-child {
            z-index: 999999 !important;
            position: absolute !important;
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
}
