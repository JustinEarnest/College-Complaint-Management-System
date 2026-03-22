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

        <div className="container-fluid p-0">
            <h3 className="mb-4 fw-bold">Manage Students</h3>

            {error && <div className="alert alert-danger shadow-sm border-0">{error}</div>}

            <div className="card mb-4 border-0 shadow-sm">
                <div className="card-body p-3 p-md-4">
                    <h5 className="card-title mb-3 fw-bold">Add New Student</h5>
                    <form onSubmit={handleAddStudent}>
                        <div className="row g-3 mb-3">
                            <div className="col-12 col-md-6">
                                <label className="form-label small fw-bold">Username</label>
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
                            <div className="col-12 col-md-6">
                                <label className="form-label small fw-bold">Email</label>
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
                        <div className="row g-3 mb-3">
                            <div className="col-12 col-md-6">
                                <label className="form-label small fw-bold">Password</label>
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
                            <div className="col-12 col-md-6">
                                <label className="form-label small fw-bold">Phone</label>
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
                        <div className="row g-3">
                            <div className="col-12 col-md-6">
                                <label className="form-label small fw-bold">Department</label>
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
                            <div className="col-12 col-md-6 d-flex align-items-end">
                                <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
                                    Add Student
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {editingStudent && (
                <div className="card mb-4 border-0 shadow-sm border-start border-4 border-success">
                    <div className="card-body p-3 p-md-4">
                        <h5 className="card-title mb-3 fw-bold">Edit Student</h5>
                        <form onSubmit={handleEditStudent}>
                            <div className="row g-3 mb-3">
                                <div className="col-12 col-md-6">
                                    <label className="form-label small fw-bold">Name</label>
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
                                <div className="col-12 col-md-6">
                                    <label className="form-label small fw-bold">Email</label>
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
                            <div className="row g-3 mb-3">
                                <div className="col-12 col-md-6">
                                    <label className="form-label small fw-bold">Phone</label>
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
                                <div className="col-12 col-md-6">
                                    <label className="form-label small fw-bold">Department</label>
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
                            <div className="d-flex gap-2">
                                <button type="submit" className="btn btn-success px-4 fw-bold">
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary px-4 fw-bold"
                                    onClick={() => setEditingStudent(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="card border-0 shadow-sm overflow-hidden">
                <div className="table-responsive-custom">
                    <table className="table table-hover mb-0 text-nowrap">
                        <thead className="bg-light">
                            <tr>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Phone</th>
                                <th className="px-4 py-3">Department</th>
                                <th className="px-4 py-3 text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.student_id}>
                                    <td className="px-4 py-3">{student.student_id}</td>
                                    <td className="px-4 py-3 fw-medium">{student.name}</td>
                                    <td className="px-4 py-3 text-muted">{student.email}</td>
                                    <td className="px-4 py-3 text-muted">{student.phone}</td>
                                    <td className="px-4 py-3">
                                        <span className="badge bg-light text-dark border fw-normal">
                                            {getDepartmentName(student.department)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-end">
                                        <div className="d-flex justify-content-end gap-2">
                                            <button
                                                className="btn btn-sm btn-outline-warning"
                                                onClick={() => setEditingStudent(student)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleDeleteStudent(student.student_id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {students.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center p-5 opacity-50">
                                        No students found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


    );

}


export default ManageStudents;