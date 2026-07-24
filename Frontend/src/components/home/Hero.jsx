import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      <div className="grid lg:grid-cols-2 gap-14 items-center">

        {/* Left */}

        <div>

          <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-sm font-medium border border-gray-200">
            🚀 India's Modern Hackathon Platform
          </span>

          <h1 className="mt-8 text-5xl lg:text-7xl font-bold leading-tight text-[#2b2b2b]">
            Build.
            <br />
            Compete.
            <br />
            <span className="text-blue-600">
              Win.
            </span>
          </h1>

          <p className="mt-8 text-lg text-gray-600 leading-8 max-w-xl">
            CodeHustle helps organizers host hackathons,
            participants build amazing projects,
            and judges evaluate innovations—
            all in one platform.
          </p>

          <div className="flex flex-wrap gap-5 mt-10">

            <Link
              to="/signup"
              className="px-8 py-4 rounded-2xl bg-[#2b2b2b] text-white hover:bg-black transition flex items-center gap-3"
            >
              Get Started

              <FaArrowRight />
            </Link>

            <Link
              to="/hackathons"
              className="px-8 py-4 rounded-2xl border border-gray-300 hover:bg-gray-100 transition"
            >
              Explore Hackathons
            </Link>

          </div>

        </div>

        {/* Right */}

        <div className="flex justify-center">

          <div className="relative w-[520px] h-[520px]">

            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-blue-100 to-gray-100 blur-3xl opacity-70"></div>

            <div
              className="
                relative
                rounded-[40px]
                bg-white/70
                backdrop-blur-xl
                border
                border-gray-200
                shadow-xl
                h-full
                flex
                items-center
                justify-center
              "
            >

              <img
                src="https://undraw.co/api/illustrations/undraw_programming_re_kg9v.svg"
                alt="Hero"
                className="w-[80%]"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;