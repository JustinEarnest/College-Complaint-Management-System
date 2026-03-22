import React, { useEffect, useState } from "react";

import API from "../services/api";


function ManageDepartments() {

    const [departments, setDepartments] = useState([]);

    const [newDeptName, setNewDeptName] = useState("");

    const [editingDept, setEditingDept] = useState(null);


    useEffect(() => {

        loadDepartments();

    }, []);


    const loadDepartments = async () => {

        try {

            const res = await API.get("departments/");

            setDepartments(res.data);

        } catch (error) {

            console.error("Error loading departments:", error);

        }

    };


    const handleAddDepartment = async (e) => {

        e.preventDefault();

        if (!newDeptName.trim()) return;

        try {

            await API.post("departments/", { dept_name: newDeptName });

            setNewDeptName("");

            loadDepartments();

        } catch (error) {

            console.error("Error adding department:", error);

        }

    };


    const handleDeleteDepartment = async (id) => {

        if (window.confirm("Are you sure you want to delete this department?")) {

            try {

                await API.delete(`departments/${id}/`);

                loadDepartments();

            } catch (error) {

                console.error("Error deleting department:", error);

            }

        }

    };


    const handleEditDepartment = async (e) => {

        e.preventDefault();

        try {

            await API.put(`departments/${editingDept.dept_id}/`, editingDept);

            setEditingDept(null);

            loadDepartments();

        } catch (error) {

            console.error("Error editing department:", error);

        }

    };


    return (

        <div className="container-fluid p-0">
            <h3 className="mb-4 fw-bold">Manage Departments</h3>

            <div className="card mb-4 border-0 shadow-sm">
                <div className="card-body p-3 p-md-4">
                    <h5 className="card-title mb-3 fw-bold">Add New Department</h5>
                    <form onSubmit={handleAddDepartment}>
                        <div className="row g-2">
                            <div className="col-12 col-md-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Department Name"
                                    value={newDeptName}
                                    onChange={(e) => setNewDeptName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-12 col-md-3">
                                <button type="submit" className="btn btn-primary w-100">
                                    Add Department
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {editingDept && (
                <div className="card mb-4 border-0 shadow-sm border-start border-4 border-success">
                    <div className="card-body p-3 p-md-4">
                        <h5 className="card-title mb-3 fw-bold">Edit Department</h5>
                        <form onSubmit={handleEditDepartment}>
                            <div className="row g-2">
                                <div className="col-12 col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editingDept.dept_name}
                                        onChange={(e) =>
                                            setEditingDept({ ...editingDept, dept_name: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div className="col-6 col-md-3">
                                    <button type="submit" className="btn btn-success w-100">
                                        Save
                                    </button>
                                </div>
                                <div className="col-6 col-md-3">
                                    <button
                                        type="button"
                                        className="btn btn-secondary w-100"
                                        onClick={() => setEditingDept(null)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="card border-0 shadow-sm overflow-hidden">
                <div className="table-responsive-custom">
                    <table className="table table-hover mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Department Name</th>
                                <th className="px-4 py-3 text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map((dept) => (
                                <tr key={dept.dept_id}>
                                    <td className="px-4 py-3">{dept.dept_id}</td>
                                    <td className="px-4 py-3 fw-medium">{dept.dept_name}</td>
                                    <td className="px-4 py-3 text-end">
                                        <div className="d-flex justify-content-end gap-2">
                                            <button
                                                className="btn btn-sm btn-outline-warning"
                                                onClick={() => setEditingDept(dept)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleDeleteDepartment(dept.dept_id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {departments.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="text-center p-5 opacity-50">
                                        No departments found.
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


export default ManageDepartments;