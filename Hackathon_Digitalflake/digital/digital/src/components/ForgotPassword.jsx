// src/ForgotPassword.js
import { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

const ForgotPassword = () => {
    const [message, setMessage] = useState('');

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required')
    });

    const handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        // Simulate password reset logic
        setMessage('If an account with that email exists, a reset link has been sent.');
        setSubmitting(false);
    };

    return (
        <Container className="login-container">
            <Row className="justify-content-md-center">
                <Col >
                    <div className="login-box">
                        <h2>Forgot Password</h2>
                        {message && <Alert variant="info">{message}</Alert>}
                        <Formik
                            initialValues={{ email: '' }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting
                            }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.email && !!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="mt-3"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ForgotPassword;
