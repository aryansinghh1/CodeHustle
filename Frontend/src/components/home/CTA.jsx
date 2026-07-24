import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      <div
        className="
          rounded-[40px]
          bg-[#2b2b2b]
          text-white
          px-10
          py-20
          text-center
        "
      >
        <h2 className="text-5xl font-bold">
          Ready to Build Something Amazing?
        </h2>

        <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg">
          Join thousands of developers participating in hackathons,
          collaborating with teams, and building innovative solutions.
        </p>

        <Link
          to="/signup"
          className="
            inline-block
            mt-10
            px-8
            py-4
            rounded-2xl
            bg-white
            text-black
            font-semibold
            hover:bg-gray-200
            transition
          "
        >
          Get Started
        </Link>
      </div>

    </section>
  );
}

export default CTA;