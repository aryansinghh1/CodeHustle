import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      <div
        className="
          rounded-[40px]
          bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900
          text-white
          px-10
          py-20
          text-center
          relative overflow-hidden
          shadow-[0_30px_80px_rgba(15,23,42,0.22)]
        "
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_36%)]" />

        <h2 className="text-5xl font-bold">
          Ready to Build Something Amazing?
        </h2>

        <p className="mt-6 text-slate-200 max-w-2xl mx-auto text-lg relative z-10">
          Join thousands of developers participating in hackathons,
          collaborating with teams, and building innovative solutions.
        </p>

        <Link
          to="/signup"
          className="
            inline-flex items-center justify-center
            mt-10
            px-8
            py-4
            rounded-2xl
            bg-white
            text-slate-900
            font-semibold
            hover:bg-slate-100
            transition
            relative z-10
          "
        >
          Get Started
        </Link>
      </div>

    </section>
  );
}

export default CTA;