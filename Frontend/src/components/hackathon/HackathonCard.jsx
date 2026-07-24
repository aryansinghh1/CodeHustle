import { Link } from "react-router-dom";

function HackathonCard({ hackathon }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition">

      <img
        src={
          hackathon.bannerImage ||
          "https://placehold.co/600x300?text=Hackathon"
        }
        alt={hackathon.title}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">

        <h2 className="text-xl font-bold">
          {hackathon.title}
        </h2>

        <p className="text-gray-500 mt-2 line-clamp-2">
          {hackathon.description}
        </p>

        <div className="flex justify-between mt-5 text-sm">

          <span className="bg-gray-100 px-3 py-1 rounded-full">
            {hackathon.mode}
          </span>

          <span className="font-semibold text-blue-600">
            ₹ {hackathon.prizePool}
          </span>

        </div>

        <Link
          to={`/hackathons/${hackathon._id}`}
          className="block text-center mt-6 bg-[#2b2b2b] text-white py-3 rounded-lg hover:bg-black"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default HackathonCard;