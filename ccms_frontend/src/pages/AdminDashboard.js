import React, { useEffect, useState } from "react";

import API from "../services/api";

import ManageDepartments from "../components/ManageDepartments";

import ManageStudents from "../components/ManageStudents";


function AdminDashboard() {
<<<<<<< HEAD

const [activeTab, setActiveTab] = useState("dashboard");

const [selectedComplaint, setSelectedComplaint] = useState(null);

const [departments, setDepartments] = useState([]);


// Filter States

const [searchQuery, setSearchQuery] = useState("");

const [statusFilter, setStatusFilter] = useState("All");

const [deptFilter, setDeptFilter] = useState("All");

const [startDate, setStartDate] = useState("");

const [endDate, setEndDate] = useState("");


useEffect(() => {

loadDepartments();

}, []);


const loadDepartments = async () => {

try {

const res = await API.get("departments/");

setDepartments(res.data);

} catch (err) {

console.error("Error loading departments:", err);

}

};
=======
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [departments, setDepartments] = useState([]);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const res = await API.get("departments/");
      setDepartments(res.data);
    } catch (err) {
      console.error("Error loading departments:", err);
    }
  };

  const handleSwitchRole = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  const closeDescription = () => setSelectedComplaint(null);

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <h2>CCMS</h2>
          <p>Admin Panel</p>
        </div>

        <nav className="sidebar-nav">
          <button
            id="nav-dashboard"
            className={`sidebar-nav-item ${activeTab === "dashboard" ? "active" : ""
              }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
              />
            </svg>
            <span>Dashboard</span>
          </button>

          <button
            id="nav-complaints"
            className={`sidebar-nav-item ${activeTab === "complaints" ? "active" : ""
              }`}
            onClick={() => setActiveTab("complaints")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            <span>Complaints</span>
          </button>

          <button
            id="nav-departments"
            className={`sidebar-nav-item ${activeTab === "departments" ? "active" : ""
              }`}
            onClick={() => setActiveTab("departments")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 21h19.5M3.75 3v18m4.5-18v18m4.5-18v18m4.5-18v18M6 6.75h.75M6 9.75h.75M6 12.75h.75m3.75-6h.75m-.75 3h.75m-.75 3h.75m3.75-6h.75m-.75 3h.75m-.75 3h.75"
              />
            </svg>
            <span>Departments</span>
          </button>

          <button
            id="nav-students"
            className={`sidebar-nav-item ${activeTab === "students" ? "active" : ""
              }`}
            onClick={() => setActiveTab("students")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
            <span>Students</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button
            id="admin-switch-role"
            className="sidebar-nav-item"
            onClick={handleSwitchRole}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
            <span>Switch Role</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === "dashboard" && (
          <DashboardView
            onShowDescription={setSelectedComplaint}
            departments={departments}
          />
        )}
        {activeTab === "complaints" && (
          <ComplaintsFullView
            onShowDescription={setSelectedComplaint}
            departments={departments}
            filters={{ searchQuery, setSearchQuery, statusFilter, setStatusFilter, deptFilter, setDeptFilter, startDate, setStartDate, endDate, setEndDate }}
          />
        )}
        {activeTab === "departments" && (
          <div className="manage-section">
            <div className="page-header">
              <h1>Departments</h1>
              <p>Manage college departments</p>
            </div>
            <ManageDepartments />
          </div>
        )}
        {activeTab === "students" && (
          <div className="manage-section">
            <div className="page-header">
              <h1>Students</h1>
              <p>Manage student accounts</p>
            </div>
            <ManageStudents />
          </div>
        )}
      </main>

      {/* Description Modal */}
      {selectedComplaint && (
        <DescriptionModal
          complaint={selectedComplaint}
          onClose={closeDescription}
        />
      )}
    </div>
  );
}

function DescriptionModal({ complaint, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Complaint Description</h3>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="description-item">
            <strong>Subject:</strong>
            <div className="description-text subject-text">{complaint.subject}</div>
          </div>
          <div className="description-item">
            <strong>Description:</strong>
            <div className="description-text">{complaint.description}</div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="primary-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   DASHBOARD VIEW - Stats + Recent Complaints
   ========================================== */
function DashboardView({ onShowDescription, departments }) {
  const [complaints, setComplaints] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const res = await API.get("complaints/");
      setComplaints(res.data);
    } catch (err) {
      console.error("Error loading complaints:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.patch(`complaints/${id}/`, { status });
      loadComplaints();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const totalComplaints = complaints.length;
  const pendingCount = complaints.filter(
    (c) => !c.status || c.status === "Pending"
  ).length;
  const processCount = complaints.filter(
    (c) => c.status === "In Process"
  ).length;
  const doneCount = complaints.filter((c) => c.status === "Done").length;

  const filteredComplaints = complaints.filter((c) => {
    const sMatch = c.subject.toLowerCase().includes(searchQuery.toLowerCase()) || (c.student_name && c.student_name.toLowerCase().includes(searchQuery.toLowerCase()));
    return sMatch;
  });

  const getStatusClass = (status) => {
    if (!status) return "pending";
    const s = status.toLowerCase();
    if (s === "pending") return "pending";
    if (s === "in process") return "in-process";
    if (s === "done") return "done";
    return "pending";
  };

  return (
    <>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Overview of complaint statistics</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-info">
            <div className="stat-label">Total Complaints</div>
            <div className="stat-number">{totalComplaints}</div>
          </div>
          <div className="stat-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
        </div>

        <div className="stat-card pending">
          <div className="stat-info">
            <div className="stat-label">Pending</div>
            <div className="stat-number">{pendingCount}</div>
          </div>
          <div className="stat-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <div className="stat-card process">
          <div className="stat-info">
            <div className="stat-label">In Process</div>
            <div className="stat-number">{processCount}</div>
          </div>
          <div className="stat-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
              />
            </svg>
          </div>
        </div>

        <div className="stat-card done">
          <div className="stat-info">
            <div className="stat-label">Done</div>
            <div className="stat-number">{doneCount}</div>
          </div>
          <div className="stat-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Recent Complaints Table */}
      <div className="content-card">
        <div className="content-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Recent Complaints</h3>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search..."
              className="filter-control"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '200px', height: '36px', padding: '0 12px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '13px' }}
            />
          </div>
        </div>
        <table className="ccms-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Student</th>
              <th>Department</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.length === 0 ? (
              <tr>
                <td colSpan="6">
                  <div className="empty-state">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9.75m7.5-3H9.75M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                    <p>No complaints found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredComplaints.map((c) => (
                <tr key={c.complaint_id}>
                  <td className="complaint-title">{c.subject}</td>
                  <td className="student-name">{c.student_name || "—"}</td>
                  <td className="student-name">{c.department_name || "—"}</td>
                  <td className="complaint-date">
                    {c.created_at
                      ? new Date(c.created_at).toISOString().split("T")[0]
                      : "—"}
                  </td>
                  <td>
                    <span
                      className={`status-badge ${getStatusClass(c.status)}`}
                    >
                      {c.status || "Pending"}
                    </span>
                  </td>
                  <td>
                    <div className="action-cell">
                      <select
                        className="status-select"
                        value={c.status || "Pending"}
                        onChange={(e) =>
                          updateStatus(c.complaint_id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Process">In Process</option>
                        <option value="Done">Done</option>
                      </select>
                      <button
                        className="view-btn"
                        onClick={() => onShowDescription(c)}
                        title="View Description"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          style={{ width: "18px" }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ==========================================
   FULL COMPLAINTS VIEW (Admin > Complaints tab)
   ========================================== */
function ComplaintsFullView({ onShowDescription, departments, filters }) {
  const { searchQuery, setSearchQuery, statusFilter, setStatusFilter, deptFilter, setDeptFilter, startDate, setStartDate, endDate, setEndDate } = filters;
  const [complaints, setComplaints] = useState([]);
>>>>>>> 599eeff (All work done)


const handleSwitchRole = () => {

localStorage.removeItem("token");

localStorage.removeItem("role");

window.location.href = "/";

};


const closeDescription = () => setSelectedComplaint(null);


return (

<div className="dashboard-layout">

{/* Sidebar */}

<aside className="sidebar">

<div className="sidebar-brand">

<h2>CCMS</h2>

<p>Admin Panel</p>

</div>


<nav className="sidebar-nav">

<button

id="nav-dashboard"

className={`sidebar-nav-item ${activeTab === "dashboard" ? "active" : ""

}`}

onClick={() => setActiveTab("dashboard")}

>

<svg

xmlns="http://www.w3.org/2000/svg"

fill="none"

viewBox="0 0 24 24"

strokeWidth={1.5}

stroke="currentColor"

>

<path

strokeLinecap="round"

strokeLinejoin="round"

d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"

/>

</svg>

<span>Dashboard</span>

</button>


<button

id="nav-complaints"

className={`sidebar-nav-item ${activeTab === "complaints" ? "active" : ""

}`}

onClick={() => setActiveTab("complaints")}

>

<svg

xmlns="http://www.w3.org/2000/svg"

fill="none"

viewBox="0 0 24 24"

strokeWidth={1.5}

stroke="currentColor"

>

<path

strokeLinecap="round"

strokeLinejoin="round"

d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"

/>

</svg>

<span>Complaints</span>

</button>


<button

id="nav-departments"

className={`sidebar-nav-item ${activeTab === "departments" ? "active" : ""

}`}

onClick={() => setActiveTab("departments")}

>

<svg

xmlns="http://www.w3.org/2000/svg"

fill="none"

viewBox="0 0 24 24"

strokeWidth={1.5}

stroke="currentColor"

>

<path

strokeLinecap="round"

strokeLinejoin="round"

d="M2.25 21h19.5M3.75 3v18m4.5-18v18m4.5-18v18m4.5-18v18M6 6.75h.75M6 9.75h.75M6 12.75h.75m3.75-6h.75m-.75 3h.75m-.75 3h.75m3.75-6h.75m-.75 3h.75m-.75 3h.75"

/>

</svg>

<span>Departments</span>

</button>


<button

id="nav-students"

className={`sidebar-nav-item ${activeTab === "students" ? "active" : ""

}`}

onClick={() => setActiveTab("students")}

>

<svg

xmlns="http://www.w3.org/2000/svg"

fill="none"

viewBox="0 0 24 24"

strokeWidth={1.5}

stroke="currentColor"

>

<path

strokeLinecap="round"

strokeLinejoin="round"

d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"

/>

</svg>

<span>Students</span>

</button>

</nav>


<div className="sidebar-footer">

<button

id="admin-switch-role"

className="sidebar-nav-item"

onClick={handleSwitchRole}

>

<svg

xmlns="http://www.w3.org/2000/svg"

fill="none"

viewBox="0 0 24 24"

strokeWidth={1.5}

stroke="currentColor"

>

<path

strokeLinecap="round"

strokeLinejoin="round"

d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"

/>

</svg>

<span>Switch Role</span>

</button>

</div>

</aside>


{/* Main Content */}

<main className="main-content">

{activeTab === "dashboard" && (

<DashboardView

onShowDescription={setSelectedComplaint}

departments={departments}

/>

)}

{activeTab === "complaints" && (

<ComplaintsFullView

onShowDescription={setSelectedComplaint}

departments={departments}

filters={{ searchQuery, setSearchQuery, statusFilter, setStatusFilter, deptFilter, setDeptFilter, startDate, setStartDate, endDate, setEndDate }}

/>

)}

{activeTab === "departments" && (

<div className="manage-section">

<div className="page-header">

<h1>Departments</h1>

<p>Manage college departments</p>

</div>

<ManageDepartments />

</div>

)}

{activeTab === "students" && (

<div className="manage-section">

<div className="page-header">

<h1>Students</h1>

<p>Manage student accounts</p>

</div>

<ManageStudents />

</div>

)}

</main>


{/* Description Modal */}

{selectedComplaint && (

<DescriptionModal

complaint={selectedComplaint}

onClose={closeDescription}

/>

)}

</div>

);

<<<<<<< HEAD
=======
  const getStatusClass = (status) => {
    if (!status) return "pending";
    const s = status.toLowerCase();
    if (s === "pending") return "pending";
    if (s === "in process") return "in-process";
    if (s === "done") return "done";
    return "pending";
  };

  const filteredComplaints = complaints.filter((c) => {
    const matchSearch = c.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.student_name && c.student_name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchStatus = statusFilter === "All" || (c.status || "Pending") === statusFilter;

    const matchDept = deptFilter === "All" || String(c.department) === String(deptFilter);

    const complaintDate = c.created_at ? new Date(c.created_at).toISOString().split('T')[0] : null;
    const matchStartDate = !startDate || (complaintDate && complaintDate >= startDate);
    const matchEndDate = !endDate || (complaintDate && complaintDate <= endDate);

    return matchSearch && matchStatus && matchDept && matchStartDate && matchEndDate;
  });

  return (
    <>
      <div className="page-header">
        <h1>All Complaints</h1>
        <p>View and manage all student complaints</p>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar-card content-card" style={{ marginBottom: '24px', padding: '20px' }}>
        <div className="filter-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          <div className="filter-item">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-secondary)' }}>SEARCH</label>
            <input
              type="text"
              className="filter-control"
              placeholder="Search subject or student..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-main)' }}
            />
          </div>
          <div className="filter-item">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-secondary)' }}>STATUS</label>
            <select
              className="filter-control"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-main)' }}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Process">In Process</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="filter-item">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-secondary)' }}>DEPARTMENT</label>
            <select
              className="filter-control"
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-main)' }}
            >
              <option value="All">All Departments</option>
              {departments.map((d) => (
                <option key={d.dept_id} value={d.dept_id}>{d.dept_name}</option>
              ))}
            </select>
          </div>
          <div className="filter-item">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-secondary)' }}>DATE FROM</label>
            <input
              type="date"
              className="filter-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-main)' }}
            />
          </div>
          <div className="filter-item">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-secondary)' }}>DATE TO</label>
            <input
              type="date"
              className="filter-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-main)' }}
            />
          </div>
        </div>
        {(searchQuery || statusFilter !== "All" || deptFilter !== "All" || startDate || endDate) && (
          <button
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("All");
              setDeptFilter("All");
              setStartDate("");
              setEndDate("");
            }}
            style={{ marginTop: '16px', background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}
          >
            Clear All Filters
          </button>
        )}
      </div>

      <div className="content-card">
        <table className="ccms-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Student</th>
              <th>Department</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.length === 0 ? (
              <tr>
                <td colSpan="6">
                  <div className="empty-state">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9.75m7.5-3H9.75M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                    <p>No complaints found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredComplaints.map((c) => (
                <tr key={c.complaint_id}>
                  <td className="complaint-title">{c.subject}</td>
                  <td className="student-name">{c.student_name || "—"}</td>
                  <td className="student-name">{c.department_name || "—"}</td>
                  <td className="complaint-date">
                    {c.created_at
                      ? new Date(c.created_at).toISOString().split("T")[0]
                      : "—"}
                  </td>
                  <td>
                    <span
                      className={`status-badge ${getStatusClass(c.status)}`}
                    >
                      {c.status || "Pending"}
                    </span>
                  </td>
                  <td>
                    <div className="action-cell">
                      <select
                        className="status-select"
                        value={c.status || "Pending"}
                        onChange={(e) =>
                          updateStatus(c.complaint_id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Process">In Process</option>
                        <option value="Done">Done</option>
                      </select>
                      <button
                        className="view-btn"
                        onClick={() => onShowDescription(c)}
                        title="View Description"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          style={{ width: "18px" }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
>>>>>>> 599eeff (All work done)
}


function DescriptionModal({ complaint, onClose }) {

return (

<div className="modal-overlay" onClick={onClose}>

<div className="modal-content" onClick={(e) => e.stopPropagation()}>

<div className="modal-header">

<h3>Complaint Description</h3>

<button className="close-btn" onClick={onClose}>

&times;

</button>

</div>

<div className="modal-body">

<div className="description-item">

<strong>Subject:</strong>

<div className="description-text subject-text">{complaint.subject}</div>

</div>

<div className="description-item">

<strong>Description:</strong>

<div className="description-text">{complaint.description}</div>

</div>

</div>

<div className="modal-footer">

<button className="primary-btn" onClick={onClose}>

Close

</button>

</div>

</div>

</div>

);

}


/* ==========================================

DASHBOARD VIEW - Stats + Recent Complaints

========================================== */

function DashboardView({ onShowDescription, departments }) {

const [complaints, setComplaints] = useState([]);

const [searchQuery, setSearchQuery] = useState("");


useEffect(() => {

loadComplaints();

}, []);


const loadComplaints = async () => {

try {

const res = await API.get("complaints/");

setComplaints(res.data);

} catch (err) {

console.error("Error loading complaints:", err);

}

};


const updateStatus = async (id, status) => {

try {

await API.patch(`complaints/${id}/`, { status });

loadComplaints();

} catch (err) {

console.error("Error updating status:", err);

}

};


const totalComplaints = complaints.length;

const pendingCount = complaints.filter(

(c) => !c.status || c.status === "Pending"

).length;

const processCount = complaints.filter(

(c) => c.status === "In Process"

).length;

const doneCount = complaints.filter((c) => c.status === "Done").length;


const filteredComplaints = complaints.filter((c) => {

const sMatch = c.subject.toLowerCase().includes(searchQuery.toLowerCase()) || (c.student_name && c.student_name.toLowerCase().includes(searchQuery.toLowerCase()));

return sMatch;

});


const getStatusClass = (status) => {

if (!status) return "pending";

const s = status.toLowerCase();

if (s === "pending") return "pending";

if (s === "in process") return "in-process";

if (s === "done") return "done";

return "pending";

};


return (

<>

<div className="page-header">

<h1>Dashboard</h1>

<p>Overview of complaint statistics</p>

</div>


{/* Stats Cards */}

<div className="stats-grid">

<div className="stat-card total">

<div className="stat-info">

<div className="stat-label">Total Complaints</div>

<div className="stat-number">{totalComplaints}</div>

</div>

<div className="stat-icon">

<svg

xmlns="http://www.w3.org/2000/svg"

fill="none"

viewBox="0 0 24 24"

strokeWidth={1.5}

stroke="currentColor"

>

<path

strokeLinecap="round"

strokeLinejoin="round"

d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"

/>

</svg>

</div>

</div>


<div className="stat-card pending">

<div className="stat-info">

<div className="stat-label">Pending</div>

<div className="stat-number">{pendingCount}</div>

</div>

<div className="stat-icon">

<svg

xmlns="http://www.w3.org/2000/svg"

fill="none"

viewBox="0 0 24 24"

strokeWidth={1.5}

stroke="currentColor"

>

<path

strokeLinecap="round"

strokeLinejoin="round"

d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"

/>

</svg>

</div>

</div>


<div className="stat-card process">

<div className="stat-info">

<div className="stat-label">In Process</div>

<div className="stat-number">{processCount}</div>

</div>

<div className="stat-icon">

<svg

xmlns="http://www.w3.org/2000/svg"

fill="none"

viewBox="0 0 24 24"

strokeWidth={1.5}

stroke="currentColor"

>

<path

strokeLinecap="round"

strokeLinejoin="round"

d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"

/>

</svg>

</div>

</div>


<div className="stat-card done">

<div className="stat-info">

<div className="stat-label">Done</div>

<div className="stat-number">{doneCount}</div>

</div>

<div className="stat-icon">

<svg

xmlns="http://www.w3.org/2000/svg"

fill="none"

viewBox="0 0 24 24"

strokeWidth={1.5}

stroke="currentColor"

>

<path

strokeLinecap="round"

strokeLinejoin="round"

d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"

/>

</svg>

</div>

</div>

</div>


{/* Recent Complaints Table */}

<div className="content-card">

<div className="content-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

<h3>Recent Complaints</h3>

<div className="search-box">

<input

type="text"

placeholder="Search..."

className="filter-control"

value={searchQuery}

onChange={(e) => setSearchQuery(e.target.value)}

style={{ width: '200px', height: '36px', padding: '0 12px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '13px' }}

/>

</div>

</div>

<table className="ccms-table">

<thead>

<tr>

<th>Title</th>

<th>Student</th>

<th>Department</th>

<th>Date</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{filteredComplaints.length === 0 ? (

<tr>

<td colSpan="6">

<div className="empty-state">

<svg

xmlns="http://www.w3.org/2000/svg"

fill="none"

viewBox="0 0 24 24"

strokeWidth={1.5}

stroke="currentColor"

>

<path

strokeLinecap="round"

strokeLinejoin="round"

d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9.75m7.5-3H9.75M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"

/>

</svg>

<p>No complaints found.</p>

</div>

</td>

</tr>

) : (

filteredComplaints.map((c) => (

<tr key={c.complaint_id}>

<td className="complaint-title">{c.subject}</td>

<td className="student-name">{c.student_name || "â€”"}</td>

<td className="student-name">{c.department_name || "â€”"}</td>

<td className="complaint-date">

{c.created_at

? new Date(c.created_at).toISOString().split("T")[0]

: "â€”"}

</td>

<td>

<span

className={`status-badge ${getStatusClass(c.status)}`}

>

{c.status || "Pending"}

</span>

</td>

<td>

<div className="action-cell">

<select

className="status-select"

value={c.status || "Pending"}

onChange={(e) =>

updateStatus(c.complaint_id, e.target.value)

}

>

<option value="Pending">Pending</option>

<option value="In Process">In Process</option>

<option value="Done">Done</option>

</select>

<button

className="view-btn"

onClick={() => onShowDescription(c)}

title="View Description"

>

<svg

xmlns="http://www.w3.org/2000/svg"

fill="none"

viewBox="0 0 24 24"

strokeWidth={1.5}

stroke="currentColor"

style={{ width: "18px" }}

>

<path

strokeLinecap="round"

strokeLinejoin="round"

d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"

/>

<path

strokeLinecap="round"

strokeLinejoin="round"

d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"

/>

</svg>

</button>

</div>

</td>

</tr>

))

)}

</tbody>

</table>

</div>

</>

);

}


/* ==========================================

FULL COMPLAINTS VIEW (Admin > Complaints tab)

========================================== */

function ComplaintsFullView({ onShowDescription, departments, filters }) {

const { searchQuery, setSearchQuery, statusFilter, setStatusFilter, deptFilter, setDeptFilter, startDate, setStartDate, endDate, setEndDate } = filters;

const [complaints, setComplaints] = useState([]);


useEffect(() => {

loadComplaints();

}, []);


const loadComplaints = async () => {

try {

const res = await API.get("complaints/");

setComplaints(res.data);

} catch (err) {

console.error("Error loading complaints:", err);

}

};


const updateStatus = async (id, status) => {

try {

await API.patch(`complaints/${id}/`, { status });

loadComplaints();

} catch (err) {

console.error("Error updating status:", err);

}

};


const getStatusClass = (status) => {

if (!status) return "pending";

const s = status.toLowerCase();

if (s === "pending") return "pending";

if (s === "in process") return "in-process";

if (s === "done") return "done";

return "pending";

};


const filteredComplaints = complaints.filter((c) => {

const matchSearch = c.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||

(c.student_name && c.student_name.toLowerCase().includes(searchQuery.toLowerCase()));


const matchStatus = statusFilter === "All" || (c.status || "Pending") === statusFilter;


const matchDept = deptFilter === "All" || String(c.department) === String(deptFilter);


const complaintDate = c.created_at ? new Date(c.created_at).toISOString().split('T')[0] : null;

const matchStartDate = !startDate || (complaintDate && complaintDate >= startDate);

const matchEndDate = !endDate || (complaintDate && complaintDate <= endDate);


return matchSearch && matchStatus && matchDept && matchStartDate && matchEndDate;

});


return (

<>

<div className="page-header">

<h1>All Complaints</h1>

<p>View and manage all student complaints</p>

</div>


{/* Filter Bar */}

<div className="filter-bar-card content-card" style={{ marginBottom: '24px', padding: '20px' }}>

<div className="filter-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>

<div className="filter-item">

<label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-secondary)' }}>SEARCH</label>

<input

type="text"

className="filter-control"

placeholder="Search subject or student..."

value={searchQuery}

onChange={(e) => setSearchQuery(e.target.value)}

style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-main)' }}

/>

</div>

<div className="filter-item">

<label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-secondary)' }}>STATUS</label>

<select

className="filter-control"

value={statusFilter}

onChange={(e) => setStatusFilter(e.target.value)}

style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-main)' }}

>

<option value="All">All Statuses</option>

<option value="Pending">Pending</option>

<option value="In Process">In Process</option>

<option value="Done">Done</option>

</select>

</div>

<div className="filter-item">

<label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-secondary)' }}>DEPARTMENT</label>

<select

className="filter-control"

value={deptFilter}

onChange={(e) => setDeptFilter(e.target.value)}

style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-main)' }}

>

<option value="All">All Departments</option>

{departments.map((d) => (

<option key={d.dept_id} value={d.dept_id}>{d.dept_name}</option>

))}

</select>

</div>

<div className="filter-item">

<label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-secondary)' }}>DATE FROM</label>

<input

type="date"

className="filter-control"

value={startDate}

onChange={(e) => setStartDate(e.target.value)}

style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-main)' }}

/>

</div>

<div className="filter-item">

<label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-secondary)' }}>DATE TO</label>

<input

type="date"

className="filter-control"

value={endDate}

onChange={(e) => setEndDate(e.target.value)}

style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-main)' }}

/>

</div>

</div>

{(searchQuery || statusFilter !== "All" || deptFilter !== "All" || startDate || endDate) && (

<button

onClick={() => {

setSearchQuery("");

setStatusFilter("All");

setDeptFilter("All");

setStartDate("");

setEndDate("");

}}

style={{ marginTop: '16px', background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}

>

Clear All Filters

</button>

)}

</div>


<div className="content-card">

<table className="ccms-table">

<thead>

<tr>

<th>Title</th>

<th>Student</th>

<th>Department</th>

<th>Date</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{filteredComplaints.length === 0 ? (

<tr>

<td colSpan="6">

<div className="empty-state">

<svg

xmlns="http://www.w3.org/2000/svg"

fill="none"

viewBox="0 0 24 24"

strokeWidth={1.5}

stroke="currentColor"

>

<path

strokeLinecap="round"

strokeLinejoin="round"

d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9.75m7.5-3H9.75M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"

/>

</svg>

<p>No complaints found.</p>

</div>

</td>

</tr>

) : (

filteredComplaints.map((c) => (

<tr key={c.complaint_id}>

<td className="complaint-title">{c.subject}</td>

<td className="student-name">{c.student_name || "â€”"}</td>

<td className="student-name">{c.department_name || "â€”"}</td>

<td className="complaint-date">

{c.created_at

? new Date(c.created_at).toISOString().split("T")[0]

: "â€”"}

</td>

<td>

<span

className={`status-badge ${getStatusClass(c.status)}`}

>

{c.status || "Pending"}

</span>

</td>

<td>

<div className="action-cell">

<select

className="status-select"

value={c.status || "Pending"}

onChange={(e) =>

updateStatus(c.complaint_id, e.target.value)

}

>

<option value="Pending">Pending</option>

<option value="In Process">In Process</option>

<option value="Done">Done</option>

</select>

<button

className="view-btn"

onClick={() => onShowDescription(c)}

title="View Description"

>

<svg

xmlns="http://www.w3.org/2000/svg"

fill="none"

viewBox="0 0 24 24"

strokeWidth={1.5}

stroke="currentColor"

style={{ width: "18px" }}

>

<path

strokeLinecap="round"

strokeLinejoin="round"

d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"

/>

<path

strokeLinecap="round"

strokeLinejoin="round"

d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"

/>

</svg>

</button>

</div>

</td>

</tr>

))

)}

</tbody>

</table>

</div>

</>

);

}


export default AdminDashboard;