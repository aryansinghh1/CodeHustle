import {
  FaUsers,
  FaTrophy,
  FaLaptopCode,
} from "react-icons/fa";

const features = [
  {
    icon: <FaLaptopCode size={28} />,
    title: "Build Amazing Projects",
    description:
      "Transform innovative ideas into real-world applications with your team.",
  },
  {
    icon: <FaUsers size={28} />,
    title: "Collaborate Easily",
    description:
      "Create teams, invite members, and manage everything from one place.",
  },
  {
    icon: <FaTrophy size={28} />,
    title: "Compete & Win",
    description:
      "Showcase your skills and climb the leaderboard to win exciting prizes.",
  },
];

function WhyChoose() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      <div className="text-center">

        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Why Choose CodeHustle?
        </h2>

        <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg leading-8">
          Everything you need to organize, participate, and evaluate hackathons
          in one modern platform.
        </p>

      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16">

        {features.map((item, index) => (
          <div
            key={index}
            className="
              rounded-3xl
              bg-white/85
              border border-slate-200/80
              backdrop-blur-sm
              p-10
              shadow-[0_18px_50px_rgba(15,23,42,0.07)]
              hover:-translate-y-2
              hover:shadow-[0_24px_60px_rgba(37,99,235,0.10)]
              duration-300
            "
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center text-blue-600 shadow-inner">
              {item.icon}
            </div>

            <h3 className="text-2xl font-bold mt-6 text-slate-900">
              {item.title}
            </h3>

            <p className="text-slate-500 mt-4 leading-7">
              {item.description}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}

export default WhyChoose;