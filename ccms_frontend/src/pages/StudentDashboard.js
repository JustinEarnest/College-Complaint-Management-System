import React, { useEffect, useState } from "react";
import API from "../services/api";

/* ─────────────────────────── SVG Icon helpers ─────────────────────────── */
const IconDocument = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125
         1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0
         12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125
         1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0
         1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const IconClock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconLogout = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25
         2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3
         0l3-3m0 0l-3-3m3 3H9" />
  </svg>
);

/* ─────────────────────────── Status badge ─────────────────────────── */
function statusClass(status) {
  if (!status) return "pending";
  const s = status.toLowerCase();
  if (s === "done") return "done";
  if (s === "in process") return "in-process";
  return "pending";
}

/* ═══════════════════════════════════════════════════════════════════════
   STUDENT DASHBOARD
   ═══════════════════════════════════════════════════════════════════════ */
function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("submit");
  const [complaints, setComplaints] = useState([]);
  const [departments, setDepartments] = useState([]);

  /* form state */
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchComplaints();
    fetchDepartments();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await API.get("complaints/");
      setComplaints(res.data);
    } catch (err) {
      console.error("Failed to fetch complaints", err);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await API.get("departments/");
      setDepartments(res.data);
    } catch (err) {
      console.error("Failed to fetch departments", err);
    }
  };

  const submitComplaint = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!subject || !description) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const data = {
        subject,
        description,
      };

      if (editingId) {
        await API.put(`complaints/${editingId}/`, data);
        setSuccess("Complaint updated successfully.");
      } else {
        await API.post("complaints/", data);
        setSuccess("Complaint submitted successfully.");
      }

      setSubject("");
      setDescription("");
      setEditingId(null);
      setDate(new Date().toISOString().split("T")[0]);
      fetchComplaints();
    } catch (err) {
      setError(`Failed to ${editingId ? "update" : "submit"} complaint. Please try again.`);
      console.error(err);
    }
  };

  const editComplaint = (complaint) => {
    setEditingId(complaint.complaint_id);
    setSubject(complaint.subject);
    setDescription(complaint.description);
    setActiveTab("submit");
    setSuccess("");
    setError("");
  };

  const deleteComplaint = async (id) => {
    if (window.confirm("Are you sure you want to delete this complaint?")) {
      await API.delete(`complaints/${id}/`);
      fetchComplaints();
    }
  };

  const handleSwitchRole = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  /* dept name lookup */
  const deptName = (id) =>
    departments.find((d) => d.dept_id === id)?.dept_name || "—";

  return (
    <div className="dashboard-layout container-fluid p-0 d-flex">
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-brand text-center d-none d-md-block">
          <h2>CCMS</h2>
          <p>Student Portal</p>
        </div>
        <div className="sidebar-brand text-center d-md-none py-3">
          <h2 className="fs-4">CCMS</h2>
        </div>

        <nav className="sidebar-nav">
          <button
            id="nav-submit"
            className={`sidebar-nav-item ${activeTab === "submit" ? "active" : ""}`}
            onClick={() => setActiveTab("submit")}
          >
            <IconDocument />
            <span className="d-none d-md-inline ms-2">Submit Complaint</span>
          </button>

          <button
            id="nav-my-complaints"
            className={`sidebar-nav-item ${activeTab === "complaints" ? "active" : ""}`}
            onClick={() => setActiveTab("complaints")}
          >
            <IconClock />
            <span className="d-none d-md-inline ms-2">My Complaints</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button id="switch-role" className="sidebar-nav-item" onClick={handleSwitchRole}>
            <IconLogout />
            <span className="d-none d-md-inline ms-2">Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="main-content flex-grow-1 p-3 p-md-4">

        {/* ─── Submit Complaint View ─── */}
        {activeTab === "submit" && (
          <div className="container-fluid max-width-800">
            <div className="page-header mb-4">
              <h1 className="h3">Submit a Complaint</h1>
              <p className="text-primary small mb-0">Fill in the details below to register your complaint</p>
            </div>

            <div className="form-card card border-0 shadow-sm p-3 p-md-4">
              {error && <div className="alert alert-danger py-2 px-3 mb-3">{error}</div>}
              {success && <div className="alert alert-success py-2 px-3 mb-3">{success}</div>}

              <form onSubmit={submitComplaint}>
                <div className="row">
                  {/* Complaint Title */}
                  <div className="col-12 mb-3">
                    <label className="form-label fw-semibold">Complaint Title</label>
                    <input
                      id="complaint-title"
                      type="text"
                      className="form-control"
                      placeholder="Brief title of your complaint"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>

                  {/* Description */}
                  <div className="col-12 mb-3">
                    <label className="form-label fw-semibold">Description</label>
                    <textarea
                      id="complaint-desc"
                      className="form-control text-area-custom"
                      rows="5"
                      placeholder="Describe your complaint in detail..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  {/* Date */}
                  <div className="col-12 mb-4">
                    <label className="form-label fw-semibold">Date</label>
                    <input
                      id="complaint-date"
                      type="date"
                      className="form-control"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>

                  <div className="col-12">
                    <button id="btn-submit-complaint" type="submit" className="submit-btn btn btn-primary w-100 py-2 fw-semibold">
                      {editingId ? "Update Complaint" : "Submit Complaint"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ─── My Complaints View ─── */}
        {activeTab === "complaints" && (
          <div className="container-fluid">
            <div className="page-header mb-4">
              <h1 className="h3">My Complaints</h1>
              <p className="text-primary small mb-0">Track the status of your submitted complaints</p>
            </div>

            <div className="content-card card border-0 shadow-sm overflow-hidden">
              <div className="table-responsive-custom">
                <table className="ccms-table table table-hover mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="border-0 px-4 py-3">Title</th>
                      <th className="border-0 px-4 py-3">Department</th>
                      <th className="border-0 px-4 py-3">Date</th>
                      <th className="border-0 px-4 py-3">Status</th>
                      <th className="border-0 px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="p-5">
                          <div className="empty-state text-center opacity-50">
                            <IconDocument />
                            <p className="mt-2 mb-0">No complaints found.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      complaints.map((c) => (
                        <tr key={c.complaint_id}>
                          <td className="px-4 py-3 complaint-title fw-medium">{c.subject}</td>
                          <td className="px-4 py-3 student-name text-muted">
                            {deptName(c.department)}
                          </td>
                          <td className="px-4 py-3 complaint-date text-muted">
                            {c.created_at
                              ? new Date(c.created_at).toISOString().split("T")[0]
                              : "—"}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`status-badge px-3 py-1 rounded-pill small fw-bold ${statusClass(c.status)}`}>
                              {c.status || "Pending"}
                            </span>
                          </td>
                          <td className="px-4 py-3 table-actions">
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-indigo text-white px-3"
                                style={{ backgroundColor: "#4f46e5" }}
                                onClick={() => editComplaint(c)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger px-3 btn-delete"
                                onClick={() => deleteComplaint(c.complaint_id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );

}

export default StudentDashboard;