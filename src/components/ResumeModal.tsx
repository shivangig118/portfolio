import { useCallback, useEffect, useRef, useState } from 'react';
import { X, Download, Mail, MapPin, Globe, FileText, Loader2, AlertCircle } from 'lucide-react';
import { EXPERIENCES, PROJECTS, SKILLS } from '../data';
import { motion } from 'motion/react';
import { downloadResumePdf, generateResumePdfBlob } from '../utils/downloadResumePdf';

interface ResumeModalProps {
  onClose: () => void;
}

type ResumeView = 'document' | 'pdf';

export default function ResumeModal({ onClose }: ResumeModalProps) {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<ResumeView>('document');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const buildPdf = useCallback(async () => {
    if (!resumeRef.current) return;

    setIsGenerating(true);
    setPdfError(null);

    try {
      const blob = await generateResumePdfBlob(resumeRef.current);
      setPdfUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
      setView('pdf');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Could not generate PDF. Please try again.';
      setPdfError(message);
      console.error('Failed to generate resume PDF:', err);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void buildPdf();
    }, 400);

    return () => {
      window.clearTimeout(timer);
    };
  }, [buildPdf]);

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  const handleDownloadPdf = useCallback(async () => {
    if (!resumeRef.current) return;

    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'Shivangi_Goyal_Resume.pdf';
      link.click();
      return;
    }

    setIsGenerating(true);
    setPdfError(null);
    try {
      await downloadResumePdf(resumeRef.current);
      await buildPdf();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Could not download PDF. Please try again.';
      setPdfError(message);
      console.error('Failed to download resume PDF:', err);
    } finally {
      setIsGenerating(false);
    }
  }, [pdfUrl, buildPdf]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 resume-modal-root">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-gray-950/45 backdrop-blur-xs"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
        className="relative bg-white border border-gray-100 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-hidden flex flex-col z-10"
      >
        <div className="flex flex-col gap-3 px-6 py-4 border-b border-gray-100 flex-shrink-0 bg-slate-50/50 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <h4 id="resume-modal-title" className="text-lg font-bold text-gray-950 tracking-tight">
              Curriculum Vitae
            </h4>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-lg border border-gray-200 bg-white p-0.5 text-xs font-bold">
              <button
                type="button"
                onClick={() => setView('document')}
                className={`rounded-md px-3 py-1.5 transition-colors cursor-pointer ${
                  view === 'document'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Document
              </button>
              <button
                type="button"
                onClick={() => setView('pdf')}
                disabled={!pdfUrl && isGenerating}
                className={`rounded-md px-3 py-1.5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                  view === 'pdf' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                PDF Preview
              </button>
            </div>

            <button
              type="button"
              onClick={() => void handleDownloadPdf()}
              disabled={isGenerating && !pdfUrl}
              id="print-resume-btn"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-wait text-sm font-bold rounded-lg text-white shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer"
            >
              {isGenerating && !pdfUrl ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {isGenerating && !pdfUrl ? 'Generating…' : 'Download PDF'}
            </button>

            <button
              type="button"
              onClick={onClose}
              id="close-resume-modal"
              className="p-2 hover:bg-gray-100 border border-transparent hover:border-gray-100 text-gray-500 hover:text-gray-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Close resume"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {pdfError && (
          <div className="mx-6 mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">PDF generation failed</p>
              <p className="mt-0.5 text-red-700">{pdfError}</p>
            </div>
            <button
              type="button"
              onClick={() => void buildPdf()}
              className="shrink-0 font-bold text-red-800 underline cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        <div
          ref={resumeRef}
          className={
            view === 'document'
              ? 'resume-print-area flex-1 overflow-y-auto p-8 sm:p-12 space-y-8 bg-white text-slate-900'
              : 'fixed -left-[9999px] top-0 w-[794px] opacity-0 pointer-events-none overflow-visible'
          }
          aria-hidden={view === 'pdf'}
        >
          <ResumeContent />
        </div>

        {view === 'pdf' && (
          <div className="flex-1 min-h-[60vh] bg-slate-100 p-4">
            {isGenerating && !pdfUrl ? (
              <div className="flex h-full min-h-[50vh] flex-col items-center justify-center gap-3 text-slate-600">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <p className="text-sm font-semibold">Building your PDF preview…</p>
              </div>
            ) : pdfUrl ? (
              <iframe
                title="Resume PDF preview"
                src={`${pdfUrl}#toolbar=1&navpanes=0`}
                className="h-full min-h-[50vh] w-full rounded-lg border border-gray-200 bg-white shadow-inner"
              />
            ) : (
              <div className="flex h-full min-h-[50vh] flex-col items-center justify-center gap-3 text-slate-600">
                <p className="text-sm font-semibold">PDF preview is not ready yet.</p>
                <button
                  type="button"
                  onClick={() => void buildPdf()}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white cursor-pointer"
                >
                  Generate PDF
                </button>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

function ResumeContent() {
  return (
    <>
      <div className="border-b-2 border-slate-100 pb-6 text-center sm:text-left flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">
            Shivangi Goyal
          </h1>
          <p className="text-base sm:text-lg font-bold text-blue-600 tracking-wide mt-2">
            Software Development Engineer | AI-Driven Product Builder
          </p>
        </div>

        <div className="space-y-1.5 text-xs sm:text-sm font-semibold text-gray-500 w-full sm:w-auto text-left sm:text-right">
          <div className="flex items-center sm:justify-end gap-2">
            <Mail className="h-4 w-4 text-gray-400 shrink-0" aria-hidden />
            <span>shivangigoyal1108@gmail.com</span>
          </div>
          <div className="flex items-center sm:justify-end gap-2">
            <MapPin className="h-4 w-4 text-gray-400 shrink-0" aria-hidden />
            <span>Bangalore, Karnataka, India</span>
          </div>
          <div className="flex items-center sm:justify-end gap-2 text-blue-600">
            <Globe className="h-4 w-4 text-blue-400 shrink-0" aria-hidden />
            <span>linkedin.com/in/shivangi-goyal-46817a222</span>
          </div>
        </div>
      </div>

      <section className="space-y-2.5 resume-section">
        <h3 className="text-sm font-bold text-blue-600 tracking-widest uppercase border-b border-gray-100 pb-1.5">
          Professional Summary
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed font-medium">
          Highly motivated and architectural-minded Software Development Engineer with robust skills
          spanning the complete web app compilation, microservices optimization, and AI pipeline
          integration ecosystem. Adept at driving software modularity, clean standards compliance,
          and sub-second analytical latencies.
        </p>
      </section>

      <section className="space-y-4 resume-section">
        <h3 className="text-sm font-bold text-blue-600 tracking-widest uppercase border-b border-gray-100 pb-1.5">
          Professional Experience
        </h3>
        <div className="space-y-4">
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="space-y-1.5">
              <div className="flex flex-wrap justify-between items-baseline gap-2">
                <h4 className="text-base font-bold text-slate-800">
                  {exp.role} — <span className="text-blue-600">{exp.company}</span>
                </h4>
                <span className="text-xs font-bold text-gray-400">{exp.duration}</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600 font-medium">
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 resume-section">
        <h3 className="text-sm font-bold text-blue-600 tracking-widest uppercase border-b border-gray-100 pb-1.5">
          Technical Skill Matrix
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SKILLS.map((grp) => (
            <div key={grp.category} className="text-xs font-semibold">
              <span className="text-slate-500 uppercase tracking-wider block mb-1">
                {grp.category}
              </span>
              <p className="text-slate-800 leading-relaxed font-semibold">
                {grp.skills.join(', ')}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 resume-section">
        <h3 className="text-sm font-bold text-blue-600 tracking-widest uppercase border-b border-gray-100 pb-1.5">
          Key Academic / Personal Engineering Projects
        </h3>
        <div className="space-y-4">
          {PROJECTS.map((p) => (
            <div key={p.id} className="space-y-1">
              <div className="flex flex-wrap justify-between items-baseline gap-2">
                <h4 className="text-base font-bold text-slate-800">{p.title}</h4>
                <span className="text-xs font-bold text-gray-400">{p.tags.join(' | ')}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                {p.longDescription}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-2.5 resume-section">
        <h3 className="text-sm font-bold text-blue-600 tracking-widest uppercase border-b border-gray-100 pb-1.5">
          Education
        </h3>
        <div className="space-y-1">
          <div className="flex flex-wrap justify-between items-baseline gap-2">
            <h4 className="text-sm font-bold text-slate-800">
              Bachelor of Technology (B.Tech) in Computer Science & Engineering
            </h4>
            <span className="text-xs font-bold text-gray-400">Class of 2025</span>
          </div>
          <p className="text-xs text-slate-500 font-semibold">First Class with Distinction</p>
        </div>
      </section>
    </>
  );
}
