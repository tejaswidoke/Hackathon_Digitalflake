// src/Dashboard.js

import '../style/Dashboard.css';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import EditUserModal from './editUser';
// import EditUserModal from './EditUserModal';

const User = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [userToEdit, setUserToEdit] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/user/users');
                if (response.data.status === 'success') {
                    setUsers(response.data.data);

                } else {
                    setError(response.data.error);
                }
            } catch (error) {
                setError('Error fetching user data');
            }
        };
        fetchUsers();
    }, []);

    const handleDeleteClick = (userId) => {
        setUserIdToDelete(userId);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/user/users/${userIdToDelete}`);
            if (response.data.status === 'success') {
                setUsers(users.filter(user => user.user_id !== userIdToDelete));
                setShowDeleteModal(false);
            } else {
                setError(response.data.error);
            }
        } catch (error) {
            setError('Error deleting user');
        }
    };

    const handleEditClick = (user) => {
        setUserToEdit(user);
        setShowEditModal(true);
    };

    const updateUser = (updatedUser) => {
        setUsers(users.map(user => (user.user_id === updatedUser.user_id ? updatedUser : user)));
    };

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="content">
                <Button
                    variant="secondary"
                    className="mt-3"
                    onClick={() => navigate('/createUser')}
                >
                    Add User
                </Button>
                <div>
                    <h2>User List</h2>
                    {error && <p className="text-danger">{error}</p>}
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Mobile</th>
                                <th>Status</th>

                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.user_id}>
                                    <td>{user.user_id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role_name}</td>
                                    <td>{user.mobile}</td>
                                    <td>{user.status}</td>

                                    <td>
                                        <Button variant="warning" className="me-2" onClick={() => handleEditClick(user)}>
                                            <PencilSquare />
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDeleteClick(user.user_id)}>
                                            <Trash />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={confirmDelete}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    {userToEdit && (
                        <EditUserModal
                            show={showEditModal}
                            handleClose={() => setShowEditModal(false)}
                            user={userToEdit}
                            updateUser={updateUser}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default User;
