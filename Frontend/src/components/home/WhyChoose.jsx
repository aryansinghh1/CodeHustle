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

        <h2 className="text-4xl font-bold">
          Why Choose CodeHustle?
        </h2>

        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
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
              bg-white
              border
              border-gray-200
              p-10
              shadow-lg
              hover:-translate-y-2
              hover:shadow-xl
              duration-300
            "
          >
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-blue-600">
              {item.icon}
            </div>

            <h3 className="text-2xl font-semibold mt-6">
              {item.title}
            </h3>

            <p className="text-gray-500 mt-4 leading-7">
              {item.description}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}

export default WhyChoose;