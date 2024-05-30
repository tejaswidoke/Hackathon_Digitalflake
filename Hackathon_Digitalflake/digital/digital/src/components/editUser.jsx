// src/EditUserModal.js

import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditUserModal = ({ show, handleClose, user, updateUser }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [mobile, setMobile] = useState(user.mobile);
    const [status, setStatus] = useState(user.status);
    const [role_id, setRoleId] = useState(user.role_id);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/roles/roles');
                if (response.data.status === 'success') {
                    setRoles(response.data.data.roles);
                }
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchRoles();
    }, []);

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
        setMobile(user.mobile);
        setStatus(user.status);
        setRoleId(user.role_id);
    }, [user]);

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/user/users/${user.user_id}`, {
                name,
                email,
                mobile,
                status,
                role_id,
                photo: user.photo,
            });
            if (response.data.status === 'success') {
                updateUser({
                    ...user,
                    name,
                    email,
                    mobile,
                    status,
                    role_id,
                });
                handleClose();
            } else {
                console.error('Error updating user:', response.data.error);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formMobile">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control
                            type="text"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            type="text"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formRole">
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                            as="select"
                            value={role_id}
                            onChange={(e) => setRoleId(e.target.value)}
                        >
                            {roles.map(role => (
                                <option key={role.role_id} value={role.role_id}>
                                    {role.role_name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditUserModal;
