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
        <div>
            <h3 className="mb-4">Manage Departments</h3>

            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Add New Department</h5>
                    <form className="d-flex" onSubmit={handleAddDepartment}>
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Department Name"
                            value={newDeptName}
                            onChange={(e) => setNewDeptName(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn btn-primary">
                            Add
                        </button>
                    </form>
                </div>
            </div>

            {editingDept && (
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title">Edit Department</h5>
                        <form className="d-flex" onSubmit={handleEditDepartment}>
                            <input
                                type="text"
                                className="form-control me-2"
                                value={editingDept.dept_name}
                                onChange={(e) =>
                                    setEditingDept({ ...editingDept, dept_name: e.target.value })
                                }
                                required
                            />
                            <button type="submit" className="btn btn-success me-2">
                                Save
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setEditingDept(null)}
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
                        <th>Department Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((dept) => (
                        <tr key={dept.dept_id}>
                            <td>{dept.dept_id}</td>
                            <td>{dept.dept_name}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => setEditingDept(dept)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDeleteDepartment(dept.dept_id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {departments.length === 0 && (
                        <tr>
                            <td colSpan="3" className="text-center">
                                No departments found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ManageDepartments;
