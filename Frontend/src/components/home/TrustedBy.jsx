function TrustedBy() {
  const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "GitHub",
    "OpenAI",
    "Adobe",
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <div className="text-center">

        <p className="text-slate-500 uppercase tracking-[4px] text-sm font-semibold">
          Trusted by students from
        </p>

      </div>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

        {companies.map((company) => (
          <div
            key={company}
            className="
              rounded-2xl
              border border-slate-200/80
              bg-white/80
              backdrop-blur-sm
              shadow-sm
              py-6
              text-center
              font-semibold
              text-slate-600
              hover:shadow-lg hover:shadow-slate-200/70
              hover:-translate-y-1
              duration-300
            "
          >
            {company}
          </div>
        ))}

      </div>

    </section>
  );
}

export default TrustedBy;