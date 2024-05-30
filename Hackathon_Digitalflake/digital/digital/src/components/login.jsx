// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import "../style/Login.css";

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await axios.post('http://localhost:5000/user/login', {
                email: values.email,
                password: values.password
            });
            console.log('Login Successful:', response.data);
            // Store user data in sessionStorage
            sessionStorage.setItem('userData', JSON.stringify(response.data.data));
            console.log('Stored userData in sessionStorage:', sessionStorage.getItem('userData'));
            // Handle successful login, e.g., redirect to dashboard
            navigate('/home'); // Navigate to home page
        } catch (error) {
            if (error.response) {
                // Server responded with a status code outside of the range of 2xx
                setErrors({ submit: error.response.data.message });
            } else {
                // Something happened in setting up the request that triggered an Error
                setErrors({ submit: 'An unexpected error occurred' });
            }
        } finally {
            setSubmitting(false);
        }
    };



    return (
        <div className="container  mt-5">
            <div className="row align-items-center">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <h2 className="card-header text-center heading">Digitalflake</h2>
                        <div className="card-body">
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                validationSchema={Yup.object({
                                    email: Yup.string().email('Invalid email address').required('Required'),
                                    password: Yup.string().required('Required')
                                })}
                                onSubmit={handleLogin}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="form-group d-flex flex-column align-items-center">
                                            <label htmlFor="email">Email:</label>
                                            <Field type="email" name="email" id="email" className="form-control" style={{ width: '250px' }} />
                                            <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                                        </div>
                                        <div className="form-group d-flex flex-column align-items-center">
                                            <label htmlFor="password">Password:</label>
                                            <Field type="password" name="password" id="password" className="form-control" style={{ width: '250px' }} />
                                            <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                                        </div>
                                        <div className="form-group d-flex flex-column align-items-center mt-3">
                                            <button type="submit" className="btn btncolor" disabled={isSubmitting}>
                                                Login
                                            </button>
                                        </div>


                                        <ErrorMessage name="submit" component="div" style={{ color: 'red' }} />
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
