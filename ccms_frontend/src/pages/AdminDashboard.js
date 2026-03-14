import React, { useEffect, useState } from "react";
import API from "../services/api";
import ManageDepartments from "../components/ManageDepartments";
import ManageStudents from "../components/ManageStudents";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("complaints");

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "complaints" ? "active" : ""}`}
            onClick={() => setActiveTab("complaints")}
          >
            Complaints
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "departments" ? "active" : ""}`}
            onClick={() => setActiveTab("departments")}
          >
            Manage Departments
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "students" ? "active" : ""}`}
            onClick={() => setActiveTab("students")}
          >
            Manage Students
          </button>
        </li>
      </ul>

      {activeTab === "complaints" && <ComplaintsView />}
      {activeTab === "departments" && <ManageDepartments />}
      {activeTab === "students" && <ManageStudents />}
    </div>
  );
}

function ComplaintsView() {
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

  return (
    <div>
      <h3 className="mb-4">Complaints</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Complaint</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((c) => (
            <tr key={c.complaint_id}>
              <td>{c.student}</td>
              <td>{c.subject}</td>
              <td>
                <select
                  className="form-select form-select-sm"
                  value={c.status || "Pending"}
                  onChange={(e) => updateStatus(c.complaint_id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Process">In Process</option>
                  <option value="Done">Done</option>
                </select>
              </td>
            </tr>
          ))}
          {complaints.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center">
                No complaints found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
