import React, { useEffect, useState } from "react";

import API from "../services/api";


function ManageStudents() {

const [students, setStudents] = useState([]);

const [departments, setDepartments] = useState([]);

const [newStudent, setNewStudent] = useState({

username: "",

email: "",

password: "",

phone: "",

department: "",

});

const [editingStudent, setEditingStudent] = useState(null);

const [error, setError] = useState(null);


useEffect(() => {

loadStudents();

loadDepartments();

}, []);


const loadStudents = async () => {

try {

const res = await API.get("students/");

setStudents(res.data);

} catch (err) {

console.error("Error loading students:", err);

}

};


const loadDepartments = async () => {

try {

const res = await API.get("departments/");

setDepartments(res.data);

} catch (err) {

console.error("Error loading departments:", err);

}

};


const handleAddStudent = async (e) => {

e.preventDefault();

setError(null);

try {

// Create user via register endpoint

await API.post("register/", newStudent);

setNewStudent({

username: "",

email: "",

password: "",

phone: "",

department: "",

});

loadStudents();

} catch (err) {

console.error("Error adding student:", err);

setError(err.response?.data?.detail || "Failed to add student. Ensure username/email is unique.");

}

};


const handleDeleteStudent = async (id) => {

if (window.confirm("Are you sure you want to delete this student?")) {

try {

await API.delete(`students/${id}/`);

loadStudents();

} catch (err) {

console.error("Error deleting student:", err);

setError("Failed to delete student.");

}

}

};


const handleEditStudent = async (e) => {

e.preventDefault();

setError(null);

try {

await API.put(`students/${editingStudent.student_id}/`, {

name: editingStudent.name,

email: editingStudent.email,

phone: editingStudent.phone,

department: editingStudent.department,

});

setEditingStudent(null);

loadStudents();

} catch (err) {

console.error("Error editing student:", err);

setError(err.response?.data?.detail || "Failed to update student.");

}

};


const getDepartmentName = (id) => {

const dept = departments.find((d) => d.dept_id === id);

return dept ? dept.dept_name : "Unknown";

};


return (

<div>

<h3 className="mb-4">Manage Students</h3>


{error && <div className="alert alert-danger">{error}</div>}


<div className="card mb-4">

<div className="card-body">

<h5 className="card-title">Add New Student</h5>

<form onSubmit={handleAddStudent}>

<div className="row mb-3">

<div className="col">

<input

type="text"

className="form-control"

placeholder="Username"

value={newStudent.username}

onChange={(e) =>

setNewStudent({ ...newStudent, username: e.target.value })

}

required

/>

</div>

<div className="col">

<input

type="email"

className="form-control"

placeholder="Email"

value={newStudent.email}

onChange={(e) =>

setNewStudent({ ...newStudent, email: e.target.value })

}

required

/>

</div>

</div>

<div className="row mb-3">

<div className="col">

<input

type="password"

className="form-control"

placeholder="Password"

value={newStudent.password}

onChange={(e) =>

setNewStudent({ ...newStudent, password: e.target.value })

}

required

/>

</div>

<div className="col">

<input

type="text"

className="form-control"

placeholder="Phone"

value={newStudent.phone}

onChange={(e) =>

setNewStudent({ ...newStudent, phone: e.target.value })

}

required

/>

</div>

</div>

<div className="row mb-3">

<div className="col">

<select

className="form-select"

value={newStudent.department}

onChange={(e) =>

setNewStudent({ ...newStudent, department: e.target.value })

}

required

>

<option value="">Select Department</option>

{departments.map((dept) => (

<option key={dept.dept_id} value={dept.dept_id}>

{dept.dept_name}

</option>

))}

</select>

</div>

<div className="col d-flex align-items-end">

<button type="submit" className="btn btn-primary w-100">

Add Student

</button>

</div>

</div>

</form>

</div>

</div>


{editingStudent && (

<div className="card mb-4">

<div className="card-body">

<h5 className="card-title">Edit Student</h5>

<form onSubmit={handleEditStudent}>

<div className="row mb-3">

<div className="col">

<input

type="text"

className="form-control"

placeholder="Name"

value={editingStudent.name}

onChange={(e) =>

setEditingStudent({ ...editingStudent, name: e.target.value })

}

required

/>

</div>

<div className="col">

<input

type="email"

className="form-control"

placeholder="Email"

value={editingStudent.email}

onChange={(e) =>

setEditingStudent({ ...editingStudent, email: e.target.value })

}

required

/>

</div>

</div>

<div className="row mb-3">

<div className="col">

<input

type="text"

className="form-control"

placeholder="Phone"

value={editingStudent.phone}

onChange={(e) =>

setEditingStudent({ ...editingStudent, phone: e.target.value })

}

required

/>

</div>

<div className="col">

<select

className="form-select"

value={editingStudent.department}

onChange={(e) =>

setEditingStudent({

...editingStudent,

department: e.target.value,

})

}

required

>

<option value="">Select Department</option>

{departments.map((dept) => (

<option key={dept.dept_id} value={dept.dept_id}>

{dept.dept_name}

</option>

))}

</select>

</div>

</div>

<button type="submit" className="btn btn-success me-2">

Save

</button>

<button

type="button"

className="btn btn-secondary"

onClick={() => setEditingStudent(null)}

>

Cancel

</button>

</form>

</div>

</div>

)}


<table className="table">

<thead>

<tr>

<th>ID</th>

<th>Name</th>

<th>Email</th>

<th>Phone</th>

<th>Department</th>

<th>Actions</th>

</tr>

</thead>

<tbody>

{students.map((student) => (

<tr key={student.student_id}>

<td>{student.student_id}</td>

<td>{student.name}</td>

<td>{student.email}</td>

<td>{student.phone}</td>

<td>{getDepartmentName(student.department)}</td>

<td>

<button

className="btn btn-sm btn-warning me-2"

onClick={() => setEditingStudent(student)}

>

Edit

</button>

<button

className="btn btn-sm btn-danger"

onClick={() => handleDeleteStudent(student.student_id)}

>

Delete

</button>

</td>

</tr>

))}

{students.length === 0 && (

<tr>

<td colSpan="6" className="text-center">

No students found.

</td>

</tr>

)}

</tbody>

</table>

</div>

);

}


export default ManageStudents;