import { useState, useEffect } from 'react';
import { Table, Button, FormControl, Modal, Form } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import axios from 'axios';
import Sidebar from './Sidebar';
import '../style/Dashboard.css';
import AddRoleForm from './AddRole';
import "../style/role.css";

const RolesTable = () => {
    const [roles, setRoles] = useState([]);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editRole, setEditRole] = useState(null);
    const [roleToDelete, setRoleToDelete] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await axios.get('http://localhost:5000/roles/roles');
            setRoles(response.data.data.roles);
        } catch (error) {
            console.error('Error fetching roles data:', error);
        }
    };

    const handleEditRole = (role) => {
        setEditRole(role);
        setShowModal(true);
    };

    const handleUpdateRole = async () => {
        try {
            await axios.put('http://localhost:5000/roles/updateRole', editRole);
            fetchRoles(); // Refresh roles list
            setShowModal(false);
            setEditRole(null);
        } catch (error) {
            console.error('Error updating role:', error);
        }
    };

    const filteredRoles = roles.filter(role =>
        role.role_name.toLowerCase().includes(search.toLowerCase())
    );

    const handleDeleteRole = async (role_id) => {
        setRoleToDelete(role_id);
        setShowDeleteModal(true);
    };

    const confirmDeleteRole = async () => {
        try {
            await axios.delete(`http://localhost:5000/roles/deleteRole/${roleToDelete}`);
            fetchRoles(); // Refresh roles list
            setRoleToDelete(null);
        } catch (error) {
            console.error('Error deleting role:', error);
        } finally {
            setShowDeleteModal(false);
        }
    };

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="content">
                <h1>Roles Management</h1>
                <div className="d-flex mb-3">
                    <FormControl
                        type="search"
                        placeholder="Search roles"
                        className="me-2"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <AddRoleForm />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Role ID</th>
                            <th>Role Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRoles.map((role) => (
                            <tr key={role.role_id}>
                                <td>{role.role_id}</td>
                                <td>{role.role_name}</td>
                                <td>{role.status}</td>
                                <td>
                                    <Button variant="warning" className="me-2" onClick={() => handleEditRole(role)}>
                                        <PencilSquare />
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDeleteRole(role.role_id)}>
                                        <Trash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Modal for Adding/Editing Role */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{editRole ? 'Edit Role' : 'Add New Role'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formRoleName">
                                <Form.Label>Role Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter role name"
                                    value={editRole ? editRole.role_name : ''}
                                    onChange={(e) => setEditRole({ ...editRole, role_name: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="formRoleStatus" className="mt-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={editRole ? editRole.status : 'active'}
                                    onChange={(e) => setEditRole({ ...editRole, status: e.target.value })}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                        <Button className='delupdate' onClick={editRole ? handleUpdateRole : () => setShowModal(false)}>
                            {editRole ? 'Update Role' : 'Add Role'}
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal for Confirmation */}
                <Modal show={roleToDelete !== null} onHide={() => setRoleToDelete(null)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this role?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setRoleToDelete(null)}>
                            Cancel
                        </Button>
                        <Button className='delupdate' onClick={confirmDeleteRole}>
                            Confirm Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default RolesTable;
