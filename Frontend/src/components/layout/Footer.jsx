function Footer() {
  return (
    <footer className="border-t border-slate-200/80 mt-20 bg-white/60 backdrop-blur-sm">

      <div className="max-w-7xl mx-auto py-12 px-6">

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          <div>

            <h2 className="text-xl font-bold text-slate-900">
              CodeHustle
            </h2>

            <p className="text-slate-500 mt-2">
              Build. Compete. Innovate.
            </p>

          </div>

          <div className="text-slate-500 text-sm font-medium">

            © 2026 CodeHustle. All Rights Reserved.

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;