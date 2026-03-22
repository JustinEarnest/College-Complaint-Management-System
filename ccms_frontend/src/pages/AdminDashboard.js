import React, { useEffect, useState } from "react";
import API from "../services/api";
import ManageDepartments from "../components/ManageDepartments";
import ManageStudents from "../components/ManageStudents";

function AdminDashboard() {
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
    <div className="dashboard-layout container-fluid p-0 d-flex">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand text-center d-none d-md-block">
          <h2>CCMS</h2>
          <p>Admin Panel</p>
        </div>
        <div className="sidebar-brand text-center d-md-none py-3">
          <h2 className="fs-4">CCMS</h2>
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
            <span className="d-none d-md-inline ms-2">Dashboard</span>
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
            <span className="d-none d-md-inline ms-2">Complaints</span>
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
            <span className="d-none d-md-inline ms-2">Departments</span>
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
            <span className="d-none d-md-inline ms-2">Students</span>
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
            <span className="d-none d-md-inline ms-2">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content flex-grow-1 p-3 p-md-4">

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
    /* 1. Use 'show' and 'd-block' to make it visible manually if not using Bootstrap's JS */
    <div className="modal show d-block" tabIndex="-1" onClick={onClose} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>

      {/* 2. Add 'modal-dialog-centered' here */}
      <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>

        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Complaint Description</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <strong>Subject:</strong>
              <div className="p-2 bg-light border rounded">{complaint.subject}</div>
            </div>
            <div>
              <strong>Description:</strong>
              <div className="p-2 bg-light border rounded">{complaint.description}</div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

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
      <div className="page-header mb-4">
        <h1 className="h3 fw-bold">Dashboard</h1>
        <p className="text-muted small">Overview of complaint statistics</p>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="stat-card total h-100 card border-0 shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="stat-info">
                <div className="stat-label small fw-bold text-uppercase opacity-75">Total Complaints</div>
                <div className="stat-number h2 fw-bold mb-0">{totalComplaints}</div>
              </div>
              <div className="stat-icon bg-primary bg-opacity-10 p-2 rounded-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  width="24"
                  height="24"
                  className="text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="stat-card pending h-100 card border-0 shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="stat-info">
                <div className="stat-label small fw-bold text-uppercase opacity-75">Pending</div>
                <div className="stat-number h2 fw-bold mb-0">{pendingCount}</div>
              </div>
              <div className="stat-icon bg-warning bg-opacity-10 p-2 rounded-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  width="24"
                  height="24"
                  className="text-warning"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="stat-card process h-100 card border-0 shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="stat-info">
                <div className="stat-label small fw-bold text-uppercase opacity-75">In Process</div>
                <div className="stat-number h2 fw-bold mb-0">{processCount}</div>
              </div>
              <div className="stat-icon bg-info bg-opacity-10 p-2 rounded-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  width="24"
                  height="24"
                  className="text-info"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="stat-card done h-100 card border-0 shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="stat-info">
                <div className="stat-label small fw-bold text-uppercase opacity-75">Done</div>
                <div className="stat-number h2 fw-bold mb-0">{doneCount}</div>
              </div>
              <div className="stat-icon bg-success bg-opacity-10 p-2 rounded-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  width="24"
                  height="24"
                  className="text-success"
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
        </div>
      </div>

      {/* Recent Complaints Table */}
      <div className="content-card card border-0 shadow-sm overflow-hidden">
        <div className="content-card-header p-3 bg-white border-bottom d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <h3 className="h5 mb-0 fw-bold">Recent Complaints</h3>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search..."
              className="form-control form-control-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', maxWidth: '250px' }}
            />
          </div>
        </div>
        <div className="table-responsive-custom">
          <table className="ccms-table table table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-5">
                    <div className="empty-state text-center opacity-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        width="48"
                        height="48"
                        className="mb-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9.75m7.5-3H9.75M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                      <p className="mb-0">No complaints found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredComplaints.map((c) => (
                  <tr key={c.complaint_id}>
                    <td className="px-4 py-3 complaint-title fw-medium">{c.subject}</td>
                    <td className="px-4 py-3 student-name text-muted">{c.student_name || "—"}</td>
                    <td className="px-4 py-3 student-name text-muted">{c.department_name || "—"}</td>
                    <td className="px-4 py-3 complaint-date text-muted">
                      {c.created_at
                        ? new Date(c.created_at).toISOString().split("T")[0]
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`status-badge px-3 py-1 rounded-pill small fw-bold ${getStatusClass(c.status)}`}
                      >
                        {c.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="action-cell d-flex align-items-center gap-2">
                        <select
                          className="status-select form-select form-select-sm"
                          value={c.status || "Pending"}
                          onChange={(e) =>
                            updateStatus(c.complaint_id, e.target.value)
                          }
                          style={{ minWidth: '120px' }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Process">In Process</option>
                          <option value="Done">Done</option>
                        </select>
                        <button
                          className="view-btn btn btn-sm btn-light border p-1"
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
      </div>
    </>

  );
}

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
      <div className="page-header mb-4">
        <h1 className="h3 fw-bold">All Complaints</h1>
        <p className="text-muted small">View and manage all student complaints</p>
      </div>

      <div className="filter-bar-card card border-0 shadow-sm mb-4">
        <div className="card-body p-3 p-md-4">
          <div className="row g-3">
            <div className="col-12 col-md-6 col-lg-4">
              <label className="form-label small fw-bold text-uppercase opacity-75">SEARCH</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search subject or student..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-2">
              <label className="form-label small fw-bold text-uppercase opacity-75">STATUS</label>
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Process">In Process</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-2">
              <label className="form-label small fw-bold text-uppercase opacity-75">DEPARTMENT</label>
              <select
                className="form-select"
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
              >
                <option value="All">All Departments</option>
                {departments.map((d) => (
                  <option key={d.dept_id} value={d.dept_id}>{d.dept_name}</option>
                ))}
              </select>
            </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-2">
              <label className="form-label small fw-bold text-uppercase opacity-75">DATE FROM</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-2">
              <label className="form-label small fw-bold text-uppercase opacity-75">DATE TO</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          {(searchQuery || statusFilter !== "All" || deptFilter !== "All" || startDate || endDate) && (
            <div className="mt-3">
              <button
                className="btn btn-link btn-sm p-0 text-decoration-none fw-bold"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("All");
                  setDeptFilter("All");
                  setStartDate("");
                  setEndDate("");
                }}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="content-card card border-0 shadow-sm overflow-hidden">
        <div className="table-responsive-custom">
          <table className="ccms-table table table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-5 text-center opacity-50">
                    <div className="empty-state">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        width="48"
                        height="48"
                        className="mb-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9.75m7.5-3H9.75M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                      <p className="mb-0">No complaints found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredComplaints.map((c) => (
                  <tr key={c.complaint_id}>
                    <td className="px-4 py-3 complaint-title fw-medium">{c.subject}</td>
                    <td className="px-4 py-3 student-name text-muted">{c.student_name || "—"}</td>
                    <td className="px-4 py-3 student-name text-muted">{c.department_name || "—"}</td>
                    <td className="px-4 py-3 complaint-date text-muted">
                      {c.created_at
                        ? new Date(c.created_at).toISOString().split("T")[0]
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`status-badge px-3 py-1 rounded-pill small fw-bold ${getStatusClass(c.status)}`}
                      >
                        {c.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="action-cell d-flex align-items-center gap-2">
                        <select
                          className="status-select form-select form-select-sm"
                          value={c.status || "Pending"}
                          onChange={(e) =>
                            updateStatus(c.complaint_id, e.target.value)
                          }
                          style={{ minWidth: '120px' }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Process">In Process</option>
                          <option value="Done">Done</option>
                        </select>
                        <button
                          className="view-btn btn btn-sm btn-light border p-1"
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
      </div>
    </>

  );
}

export default AdminDashboard;