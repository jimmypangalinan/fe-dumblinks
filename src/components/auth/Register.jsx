import React, { useContext, useState } from 'react'
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import { API } from "../../config/api";

// usecontext
import { UserContextModal } from '../../context/Modal';
import { UserContextToken } from "../../context/useContext";

const Register = () => {

    const navigate = useNavigate();
    const [message, setMessage] = useState(null)

    const [token, setToken] = useContext(UserContextToken);

    const [form, setForm] = useState({
        email: "",
        password: "",
        fullName: "",
    });

    const { fullName, email, password } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            }

            // Data body
            const body = JSON.stringify(form);

            // Insert data user to database
            const response = await API.post("/register", body, config);

            setToken({
                type: "LOGIN_SUCCESS",
                payload: response.data.data,
            });

            // Notification
            if (response.data.status == "success...") {
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
                    Input field cannot be empty !!
                </Alert>
            );
            setMessage(alert);
            console.log(error);
        }
    }


    // handling show modal
    const [state, dispatch] = useContext(UserContextModal)
    const ShowRegister = () => {
        dispatch({
            type: 'SHOW',
            payload: {
                Login: false,
                Register: true
            }
        })
    }

    const ShowLogin = () => {
        dispatch({
            type: 'SHOW',
            payload: {
                Login: true,
                Register: false
            }
        })
    }

    const CloseRegister = () => {
        dispatch({
            type: 'SHOW',
            payload: {
                Login: false,
                Register: false
            }
        })
    }

    return (
        <div>
            <Modal
                show={state.show.Register}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={CloseRegister}
            >
                <Form className="p-4" onSubmit={handleSubmit}>
                    <h3 className="fw-bold py-3" style={{ fontSize: 40 }}>Register</h3>
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
                    <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Control
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            onChange={handleChange}
                            value={fullName}
                        />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="warning text-white shadow-none" type="submit">
                            Register
                        </Button>
                    </div>
                    <div className="text-center mt-2">
                        <p>
                            Allready have an account ? Klik
                            <span
                                className="text-decoration-none text-black fw-bold "
                                style={{ cursor: "pointer" }}
                                onClick={ShowLogin}
                            >
                                {""} Here
                            </span>
                        </p>
                    </div>
                </Form>
            </Modal>
            <Button variant="warning px-3 fw-bold text-white shadow-none" onClick={ShowRegister}>
                Register
            </Button>
        </div >
    )
}

export default Register