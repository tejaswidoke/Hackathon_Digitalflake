import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Sidebar from './Sidebar';
import '../style/Dashboard.css'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('mobile', data.mobile);
        formData.append('password', data.password);
        formData.append('role', data.role);
        formData.append('photo', data.photo[0]);

        try {
            const response = await axios.post('http://localhost:5000/user/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.status === 'success') {
                setSuccess('User created successfully');
                reset();
                navigate('/user');

            } else {
                setError(response.data.error);
            }
        } catch (err) {
            setError('Error signing up user');
        }
    };

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/roles/roles');
                if (response.data.status === 'success') {
                    setRoles(response.data.data.roles);
                } else {
                    setError('Error fetching roles');
                }
            } catch (err) {
                setError('Error fetching roles');
            }
        };

        fetchRoles();
    }, []);

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="content">
                <h2 className="text-center mb-4">Add User</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Container className="form-container">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter name"
                                        {...register('name', { required: true })}
                                    />
                                    {errors.name && <small className="text-danger">Name is required</small>}
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        {...register('email', { required: true })}
                                    />
                                    {errors.email && <small className="text-danger">Email is required</small>}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="mobile">
                                    <Form.Label>Mobile</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter mobile number"
                                        {...register('mobile', { required: true })}
                                    />
                                    {errors.mobile && <small className="text-danger">Mobile is required</small>}
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        {...register('password', { required: true })}
                                    />
                                    {errors.password && <small className="text-danger">Password is required</small>}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="role">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control
                                        as="select"
                                        {...register('role', { required: true })}
                                    >
                                        <option value="">Select a role</option>
                                        {roles.map((role) => (
                                            <option key={role.role_id} value={role.role_id}>
                                                {role.role_name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    {errors.role && <small className="text-danger">Role is required</small>}
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="photo">
                                    <Form.Label>Photo</Form.Label>
                                    <Form.Control
                                        type="file"
                                        {...register('photo', { required: true })}
                                    />
                                    {errors.photo && <small className="text-danger">Photo is required</small>}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button variant="primary" type="submit" className="mt-3">
                            Sign Up
                        </Button>
                    </Form>
                </Container>
            </div>
        </div>

    );
};

export default Signup;
