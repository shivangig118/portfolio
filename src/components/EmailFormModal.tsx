import { useState, FormEvent } from 'react';
import { X, Send, CheckCircle2, ChevronRight, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface EmailFormModalProps {
  onClose: () => void;
}

export default function EmailFormModal({ onClose }: EmailFormModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!name.trim()) tempErrors.name = 'Name is required';
    if (!email.trim()) {
      tempErrors.email = 'Email connection is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Please provide a valid email format';
    }
    if (!message.trim()) tempErrors.message = 'Please write a brief greeting message';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Mimic API post trigger
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-gray-950/45 backdrop-blur-xs"
      />

      {/* Box container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative bg-white border border-gray-100 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col z-10"
      >
        {}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-gray-100 bg-slate-50/50">
          <div className="flex items-center gap-1.5">
            <Send className="h-4.5 w-4.5 text-blue-600" />
            <h4 className="text-lg font-bold text-gray-950 tracking-tight">Direct Connection</h4>
          </div>
          <button
            onClick={onClose}
            id="close-email-form"
            className="p-1 px-2.5 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-500 hover:text-gray-800 rounded-xl transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {}
        <div className="p-6 sm:p-8">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 tracking-wider uppercase block mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rachel Green"
                  className={`w-full px-4 py-3 border rounded-xl text-sm font-semibold text-gray-800 bg-slate-50/30 focus:outline-none focus:border-blue-600 transition-colors ${
                    errors.name ? 'border-red-400 focus:border-red-400' : 'border-gray-100'
                  }`}
                />
                {errors.name && <span className="text-red-500 text-xs font-bold mt-1 block">{errors.name}</span>}
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 tracking-wider uppercase block mb-1.5">
                  Your corporate / personal email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rachel@comp.com"
                  className={`w-full px-4 py-3 border rounded-xl text-sm font-semibold text-gray-800 bg-slate-50/30 focus:outline-none focus:border-blue-600 transition-colors ${
                    errors.email ? 'border-red-400 focus:border-red-400' : 'border-gray-100'
                  }`}
                />
                {errors.email && <span className="text-red-500 text-xs font-bold mt-1 block">{errors.email}</span>}
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 tracking-wider uppercase block mb-1.5">
                  Subject Line
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Opportunistic collaborations / Quick greeting"
                  className="w-full px-4 py-3 border border-gray-100 rounded-xl text-sm font-semibold text-gray-800 bg-slate-50/30 focus:outline-none focus:border-blue-600 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 tracking-wider uppercase block mb-1.5">
                  Message Body
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hi Shivangi! Loved your portfolio. Lets assemble..."
                  className={`w-full h-28 px-4 py-3 border rounded-xl text-sm font-semibold text-gray-800 bg-slate-50/30 focus:outline-none focus:border-blue-600 transition-colors ${
                    errors.message ? 'border-red-400 focus:border-red-400' : 'border-gray-100'
                  }`}
                />
                {errors.message && <span className="text-red-500 text-xs font-bold mt-1 block">{errors.message}</span>}
              </div>

              {}
              <button
                type="submit"
                disabled={isSubmitting}
                id="submit-message-btn"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 border border-transparent shadow-md text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 transition-colors active:scale-[0.99] cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" /> Dispatching...
                  </>
                ) : (
                  <>
                    Send message <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-12 text-center space-y-5"
            >
              <div className="flex justify-center">
                <CheckCircle2 className="h-16 w-16 text-green-500 stroke-[1.5]" />
              </div>
              <div className="space-y-2">
                <h5 className="text-2xl font-black text-slate-800 tracking-tight">Message Dispatched!</h5>
                <p className="text-sm text-gray-500 font-semibold max-w-sm mx-auto leading-relaxed">
                  Your email message has been forwarded to <strong>shivangigoyal1108@gmail.com</strong> successfully. She will get back to you soon!
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200/80 hover:text-gray-800 text-sm font-bold text-gray-600 rounded-xl transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
