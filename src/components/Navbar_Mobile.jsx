import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Offcanvas, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap"

// assests
import logo from '../assets/icons/logo.png'


const Navbar_Mobile = () => {
    const navigate = useNavigate()

    return (
        <div>
            <Navbar bg="white shadow-none" expand={false}>

                <Container fluid >

                    <Navbar.Brand href="#">
                        <Offcanvas.Title id="offcanvasNavbarLabel">
                        <img
                                    src={logo}
                                    className="d-inline-block align-top"
                                    alt="React Bootstrap logo"
                                    style={{ 
                                        width: 120 
                                    }}
                                /> 
                            {/* <span className="ms-3 fw-bold">Template</span> */}
                        </Offcanvas.Title> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="offcanvasNavbar" />

                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="end"
                    >
                        <Offcanvas.Header closeButton >
                            <Offcanvas.Title id="offcanvasNavbarLabel">
                                <img
                                    src={logo}
                                    className="d-inline-block align-top"
                                    alt="React Bootstrap logo"
                                    style={{ 
                                        width: 120 
                                    }}
                                /> 
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <div className="ms-3">
                            <img
                                // src={`https://wow-app-server-v1.herokuapp.com/${gambar.image}`}
                                // src={`http://localhost:5000/uploads/profile/${gambar.image}`}
                                style={{
                                    // borderRadius: 200,
                                    clipPath: "circle()",
                                    height: 150,
                                    border: 200,
                                }}
                            />
                            <h4 className="fw-bold my-4">
                                <span>null</span>
                            </h4>
                            <h5 className="text-danger fw-bold">
                                {/* {profile.status == "Subscribe" ? (
              <span className="text-success">Subscribe</span>
            ) : (
              <span>Not Subscribe Yet</span>
            )} */}
                            </h5>
                        </div>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3 mb-3">
                                <Button variant="primary" onClick={() => navigate("/dasboard")}>Template </Button>
                                <Button variant="info mt-3" onClick={() => navigate("/account")}>Profile </Button>
                                <Button variant="warning" className="my-3" onClick={() => navigate("/links")}>My Links </Button>
                                <Button variant="danger" >Log Out </Button>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

        </div>
    );
}

export default Navbar_Mobile;
