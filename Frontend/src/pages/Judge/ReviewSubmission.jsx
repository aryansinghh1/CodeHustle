import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";
import { createReview } from "../../services/reviewService";

function ReviewSubmission() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    innovation: 0,
    technicalComplexity: 0,
    userInterface: 0,
    functionality: 0,
    scalability: 0,
    documentation: 0,
    presentation: 0,
    feedback: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "feedback"
          ? e.target.value
          : Number(e.target.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await createReview({
        submission: id,
        ...formData,
      });

      toast.success("Review Submitted");

      navigate("/judge/submissions");

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Review Failed"
      );
    }
  };

  return (
    <MainLayout>

      <div className="max-w-3xl mx-auto py-10">

        <h1 className="text-4xl font-bold mb-8">
          Evaluate Project
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {[
            "innovation",
            "technicalComplexity",
            "userInterface",
            "functionality",
            "scalability",
            "documentation",
            "presentation",
          ].map((field) => (

            <div key={field}>

              <label className="capitalize font-semibold">

                {field}

              </label>

              <input
                type="number"
                min="0"
                max="10"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />

            </div>

          ))}

          <textarea
            rows={5}
            name="feedback"
            placeholder="Feedback"
            value={formData.feedback}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <button
            className="w-full bg-[#2b2b2b] text-white py-3 rounded-lg"
          >
            Submit Review
          </button>

        </form>

      </div>

    </MainLayout>
  );
}

export default ReviewSubmission;