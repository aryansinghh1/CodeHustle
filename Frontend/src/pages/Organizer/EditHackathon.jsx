import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import { getHackathonById, updateHackathon } from "../../services/hackathonService";
import { getJudges } from "../../services/userService";

function EditHackathon() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [availableJudges, setAvailableJudges] = useState([]);
  const [selectedJudges, setSelectedJudges] = useState([]);

  const [formData, setFormData] = useState({
    title: "", description: "", theme: "", mode: "Online", venue: "",
    startDate: "", endDate: "", registrationDeadline: "", bannerImage: "",
    prizePool: "", maxTeamSize: "", rules: "", judgingCriteria: "",
  });

  useEffect(() => {
    fetchHackathonAndJudges();
  }, [id]);

  const fetchHackathonAndJudges = async () => {
    try {
      const [hRes, jRes] = await Promise.all([
        getHackathonById(id),
        getJudges(),
      ]);
      const h = hRes.data.hackathon;
      setAvailableJudges(jRes.data.judges || []);
      setSelectedJudges(h.judges?.map((j) => (typeof j === "object" ? j._id : j)) || []);
      setFormData({
        title: h.title, description: h.description, theme: h.theme, mode: h.mode,
        venue: h.venue, startDate: h.startDate ? h.startDate.slice(0, 10) : "", endDate: h.endDate ? h.endDate.slice(0, 10) : "",
        registrationDeadline: h.registrationDeadline ? h.registrationDeadline.slice(0, 10) : "", bannerImage: h.bannerImage,
        prizePool: h.prizePool, maxTeamSize: h.maxTeamSize, rules: h.rules ? h.rules.join(", ") : "",
        judgingCriteria: h.judgingCriteria ? h.judgingCriteria.join(", ") : "",
      });
    } catch (err) { toast.error("Unable to load hackathon"); } finally { setLoading(false); }
  };

  const toggleJudge = (judgeId) => {
    if (selectedJudges.includes(judgeId)) {
      setSelectedJudges(selectedJudges.filter((jId) => jId !== judgeId));
    } else {
      setSelectedJudges([...selectedJudges, judgeId]);
    }
  };

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateHackathon(id, {
        ...formData, maxTeamSize: Number(formData.maxTeamSize),
        rules: formData.rules.split(",").map((i) => i.trim()),
        judgingCriteria: formData.judgingCriteria.split(",").map((i) => i.trim()),
        judges: selectedJudges,
      });
      toast.success("Hackathon Updated");
      navigate("/organizer/my-hackathons");
    } catch (err) { toast.error(err.response?.data?.message || "Update Failed"); }
  };

  if (loading) return <MainLayout><Loader text="Loading hackathon..." /></MainLayout>;

  return (
    <MainLayout>
      <div className="container section-spacing" style={{ maxWidth: 880 }}>
        <div className="page-header">
          <h1>Edit Hackathon</h1>
          <div className="accent-bar" />
        </div>

        <div className="form-card">
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label className="form-label">Title</label>
              <input name="title" value={formData.title} onChange={handleChange} className="input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Theme</label>
              <input name="theme" value={formData.theme} onChange={handleChange} className="input" required />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Description</label>
              <textarea rows={4} name="description" value={formData.description} onChange={handleChange} className="input" />
            </div>
            <div className="form-group">
              <label className="form-label">Mode</label>
              <select name="mode" value={formData.mode} onChange={handleChange} className="input">
                <option>Online</option>
                <option>Offline</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Venue</label>
              <input name="venue" value={formData.venue} onChange={handleChange} className="input" />
            </div>
            <div className="form-group">
              <label className="form-label">Registration Deadline</label>
              <input type="date" name="registrationDeadline" value={formData.registrationDeadline} onChange={handleChange} className="input" />
            </div>
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="input" />
            </div>
            <div className="form-group">
              <label className="form-label">End Date</label>
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="input" />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Banner Image URL</label>
              <input name="bannerImage" value={formData.bannerImage} onChange={handleChange} className="input" />
            </div>
            <div className="form-group">
              <label className="form-label">Prize Pool</label>
              <input name="prizePool" value={formData.prizePool} onChange={handleChange} className="input" />
            </div>
            <div className="form-group">
              <label className="form-label">Max Team Size</label>
              <input type="number" name="maxTeamSize" value={formData.maxTeamSize} onChange={handleChange} className="input" />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Rules (comma separated)</label>
              <textarea rows={3} name="rules" value={formData.rules} onChange={handleChange} className="input" />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Judging Criteria (comma separated)</label>
              <textarea rows={3} name="judgingCriteria" value={formData.judgingCriteria} onChange={handleChange} className="input" />
            </div>

            {/* Select Judges Section */}
            <div className="form-group full-width">
              <label className="form-label">Assign Judges to Hackathon</label>
              {availableJudges.length === 0 ? (
                <p className="text-xs text-muted">No judge accounts available yet. Admin can create judge accounts.</p>
              ) : (
                <div className="flex flex-wrap gap-3" style={{ marginTop: 6 }}>
                  {availableJudges.map((j) => (
                    <label key={j._id} className="flex items-center gap-2 text-sm font-semibold" style={{ background: "var(--slate-50)", padding: "8px 14px", borderRadius: 8, border: "1px solid var(--slate-200)", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={selectedJudges.includes(j._id)}
                        onChange={() => toggleJudge(j._id)}
                      />
                      <span>{j.name} ({j.email})</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="full-width">
              <button className="primary-btn" style={{ width: "100%", marginTop: 12 }}>Update Hackathon</button>
            </div>
          </form>
        </div>
      </div>
      
    </MainLayout>
  );
}

export default EditHackathon;