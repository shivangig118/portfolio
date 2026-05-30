export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 sm:py-16 border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        {/* Brand Name */}
        <div className="text-xl sm:text-2xl font-black text-blue-600 tracking-tight">
          Shivangi Goyal
        </div>

        {/* Brand Copyright */}
        <p className="text-xs sm:text-sm text-gray-400 font-semibold tracking-wide">
          © {currentYear} Shivangi Goyal. Built with precision.
        </p>
      </div>
    </footer>
  );
}
