import React, { useEffect, useState } from "react";

import API from "../services/api";


/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ SVG Icon helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

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


/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ Status badge â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

function statusClass(status) {

if (!status) return "pending";

const s = status.toLowerCase();

if (s === "done") return "done";

if (s === "in process") return "in-process";

return "pending";

}


/* â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�

STUDENT DASHBOARD

â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•� */

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

departments.find((d) => d.dept_id === id)?.dept_name || "â€”";


return (

<div className="dashboard-layout">

{/* â”€â”€ Sidebar â”€â”€ */}

<aside className="sidebar">

<div className="sidebar-brand">

<h2>CCMS</h2>

<p>Student Portal</p>

</div>


<nav className="sidebar-nav">

<button

id="nav-submit"

className={`sidebar-nav-item ${activeTab === "submit" ? "active" : ""}`}

onClick={() => setActiveTab("submit")}

>

<IconDocument />

<span>Submit Complaint</span>

</button>


<button

id="nav-my-complaints"

className={`sidebar-nav-item ${activeTab === "complaints" ? "active" : ""}`}

onClick={() => setActiveTab("complaints")}

>

<IconClock />

<span>My Complaints</span>

</button>

</nav>


<div className="sidebar-footer">

<button id="switch-role" className="sidebar-nav-item" onClick={handleSwitchRole}>

<IconLogout />

<span>Switch Role</span>

</button>

</div>

</aside>


{/* â”€â”€ Main Content â”€â”€ */}

<main className="main-content">


{/* â”€â”€â”€ Submit Complaint View â”€â”€â”€ */}

{activeTab === "submit" && (

<>

<div className="page-header">

<h1>Submit a Complaint</h1>

<p>Fill in the details below to register your complaint</p>

</div>


<div className="form-card">

{error && <div className="alert-danger-custom">{error}</div>}

{success && <div className="alert-success-custom">{success}</div>}


<form onSubmit={submitComplaint}>

{/* Complaint Title */}

<div className="mb-3">

<label className="form-label">Complaint Title</label>

<input

id="complaint-title"

type="text"

className="form-control"

placeholder="Brief title of your complaint"

value={subject}

onChange={(e) => setSubject(e.target.value)}

/>

</div>


{/* Department - REMOVED per user request, automatically assigned on backend */}



{/* Description */}

<div className="mb-3">

<label className="form-label">Description</label>

<textarea

id="complaint-desc"

className="form-control"

rows="5"

placeholder="Describe your complaint in detail..."

value={description}

onChange={(e) => setDescription(e.target.value)}

/>

</div>


{/* Date */}

<div className="mb-4">

<label className="form-label">Date</label>

<input

id="complaint-date"

type="date"

className="form-control"

value={date}

onChange={(e) => setDate(e.target.value)}

/>

</div>


<button id="btn-submit-complaint" type="submit" className="submit-btn">

{editingId ? "Update Complaint" : "Submit Complaint"}

</button>

</form>

</div>

</>

)}


{/* â”€â”€â”€ My Complaints View â”€â”€â”€ */}

{activeTab === "complaints" && (

<>

<div className="page-header">

<h1>My Complaints</h1>

<p>Track the status of your submitted complaints</p>

</div>


<div className="content-card">

<table className="ccms-table">

<thead>

<tr>

<th>Title</th>

<th>Department</th>

<th>Date</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{complaints.length === 0 ? (

<tr>

<td colSpan="5">

<div className="empty-state">

<IconDocument />

<p>No complaints found.</p>

</div>

</td>

</tr>

) : (

complaints.map((c) => (

<tr key={c.complaint_id}>

<td className="complaint-title">{c.subject}</td>

<td className="student-name">

{deptName(c.department)}

</td>

<td className="complaint-date">

{c.created_at

? new Date(c.created_at).toISOString().split("T")[0]

: "â€”"}

</td>

<td>

<span className={`status-badge ${statusClass(c.status)}`}>

{c.status || "Pending"}

</span>

</td>

<td className="table-actions">

<button

className="btn-edit"

style={{

backgroundColor: "#4f46e5",

color: "white",

padding: "4px 12px",

borderRadius: "4px",

border: "none",

marginRight: "8px",

cursor: "pointer"

}}

onClick={() => editComplaint(c)}

>

Edit

</button>

<button

className="btn-delete"

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

</>

)}

</main>

</div>

);

}


export default StudentDashboard;