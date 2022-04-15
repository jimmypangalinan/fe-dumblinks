import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { API } from '../../config/api'

// useContext
import { UserContextModal } from '../../context/Modal';
import { UserContextToken } from "../../context/useContext";

const Login = () => {

    const navigate = useNavigate()

    const [token, setToken] = useContext(UserContextToken);
    const [message, setMessage] = useState(null);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const { email, password } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            // Configuration Content-type
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            // Data body
            const body = JSON.stringify(form);

            // Insert data user to database
            const response = await API.post("/login", body, config);
            console.log(response);

            setToken({
                type: "LOGIN_SUCCESS",
                payload: response.data.data,
            });

            // Notification
            if (response.data.status == 200) {
                navigate("/dasboard")
                const alert = (
                    <Alert variant="success" className="py-1">
                        Success
                    </Alert>
                );
                setMessage(alert);
                
                
            } else {
                const alert = (
                    <Alert variant="danger" className="py-1">
                        Failed
                    </Alert>
                );
                setMessage(alert);
            }
        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    Email or Password Wrong !!!!
                </Alert>
            );
            setMessage(alert);
            console.log(error);
        }
    };

    // handlin show modal
    const [state, dispatch] = useContext(UserContextModal);
    const ShowLogin = () => {
        dispatch({
            type: 'SHOW',
            payload: {
                Login: true,
                Register: false
            }
        })
    }

    const ShowRegister = () => {
        dispatch({
            type: 'SHOW',
            payload: {
                Login: false,
                Register: true
            }
        })
    }

    const CloseLogin = () => {
        dispatch({
            type: 'NOT_SHOW',
            payload: {
                Login: false,
                Register: false
            }
        })
    }

    return (
        <div>
            <Modal
                show={state.show.Login}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={CloseLogin}
            >
                <Form className="p-4"  onSubmit={handleSubmit}>
                    <h3 className="fw-bold py-3" style={{ fontSize: 40 }}>Login</h3>
                    {message && message}
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            onChange={handleChange}
                            value={email}
                        />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            value={password}
                        />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="warning text-white shadow-none" type="submit">
                            Login
                        </Button>
                    </div>
                    <div className="text-center mt-2">
                        <p>
                            Don't have an account ? Klik
                            <span
                                className="text-decoration-none text-black fw-bold "
                                style={{ cursor: "pointer" }}
                                onClick={ShowRegister}
                            >
                                {""} Here
                            </span>
                        </p>
                    </div>
                </Form>
            </Modal>
            <span className='fs-5 mx-3'
                style={{ cursor: 'pointer' }}
                onClick={ShowLogin}
            >Login</span>
            {/* <Button variant="warning px-5 fw-bold text-white">
                Login
            </Button> */}
        </div>
    )
}

export default Login