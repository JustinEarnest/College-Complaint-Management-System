import React, { useEffect, useState } from "react";
import API from "../services/api";

function StudentDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [departments, setDepartments] = useState([]);

  // Form state
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchComplaints();
    fetchDepartments();
  }, []);

  const fetchComplaints = async () => {
    const res = await API.get("complaints/");
    setComplaints(res.data);
  };

  const fetchDepartments = async () => {
    try {
      const res = await API.get("departments/");
      setDepartments(res.data);
    } catch (err) {
      console.error("Failed to fetch departments", err);
    }
  };

  const deleteComplaint = async (id) => {
    await API.delete(`complaints/${id}/`);
    fetchComplaints();
  };

  const submitComplaint = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!subject || !description || !departmentId) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await API.post("complaints/", {
        subject,
        description,
        department: parseInt(departmentId)
      });
      setSuccess("Complaint submitted successfully.");
      setSubject("");
      setDescription("");
      setDepartmentId("");
      fetchComplaints();
    } catch (err) {
      setError("Failed to submit complaint. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>My Complaints</h2>

      {/* Submit Complaint Form */}
      <div className="card mb-4 mt-3">
        <div className="card-header">
          <h5>Submit New Complaint</h5>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={submitComplaint}>
            <div className="mb-3">
              <label className="form-label">Subject</label>
              <input
                type="text"
                className="form-control"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of your issue"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Department</label>
              <select
                className="form-select form-control"
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
              >
                <option value="">Select a Department</option>
                {departments.map((dept) => (
                  <option key={dept.dept_id} value={dept.dept_id}>
                    {dept.dept_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed explanation"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit Complaint
            </button>
          </form>
        </div>
      </div>

      <h4>Existing Complaints</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {complaints.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">No complaints found.</td>
            </tr>
          ) : (
            complaints.map((c) => (
              <tr key={c.complaint_id}>
                <td>{c.subject}</td>
                <td>{c.status}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteComplaint(c.complaint_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentDashboard;
