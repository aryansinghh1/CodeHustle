import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 relative">

      <div className="absolute inset-x-6 top-10 -z-10 h-[380px] rounded-[48px] bg-gradient-to-r from-blue-100/70 via-white to-slate-100 blur-3xl" />

      <div className="grid lg:grid-cols-2 gap-14 items-center">

        {/* Left */}

        <div>

          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 text-sm font-semibold border border-slate-200 shadow-sm text-slate-600">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            India's Modern Hackathon Platform
          </span>

          <h1 className="mt-8 text-5xl lg:text-7xl font-extrabold leading-[1.02] tracking-tight text-slate-900">
            Build.
            <br />
            Compete.
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-slate-900 bg-clip-text text-transparent">
              Win.
            </span>
          </h1>

          <p className="mt-8 text-lg text-slate-600 leading-8 max-w-xl">
            CodeHustle helps organizers host hackathons,
            participants build amazing projects,
            and judges evaluate innovations—
            all in one platform.
          </p>

          <div className="flex flex-wrap gap-5 mt-10">

            <Link
              to="/signup"
              className="primary-btn px-8 py-4 rounded-2xl flex items-center gap-3"
            >
              Get Started

              <FaArrowRight />
            </Link>

            <Link
              to="/hackathons"
              className="px-8 py-4 rounded-2xl border border-slate-300 bg-white/80 text-slate-700 hover:bg-white hover:border-slate-400 transition shadow-sm"
            >
              Explore Hackathons
            </Link>

          </div>

          <div className="grid grid-cols-3 gap-4 mt-12 max-w-xl">
            {[
              ["Fast setup", "Launch in minutes"],
              ["Team ready", "Workflows included"],
              ["Judge friendly", "Clear scoring flow"],
            ].map(([title, subtitle]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">{title}</p>
                <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
              </div>
            ))}

          </div>

        </div>

        {/* Right */}

        <div className="flex justify-center">

          <div className="relative w-full max-w-[540px] aspect-square">

            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-blue-200/80 via-white to-slate-200 blur-3xl opacity-80"></div>

            <div
              className="
                relative
                rounded-[40px]
                bg-white/80
                backdrop-blur-xl
                border border-white/70
                shadow-[0_30px_80px_rgba(15,23,42,0.12)]
                h-full
                flex
                items-center
                justify-center
                overflow-hidden
              "
            >

              <div className="absolute inset-6 rounded-[32px] border border-slate-200/80" />

              <img
                src="https://undraw.co/api/illustrations/undraw_programming_re_kg9v.svg"
                alt="Hero"
                className="relative z-10 w-[82%] drop-shadow-2xl"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;