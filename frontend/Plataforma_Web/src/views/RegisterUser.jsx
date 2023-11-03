import React, { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import "./style/RegisterUser.css";
import NavBar from "../glovalComponent/components/NavBar";
import { motion } from "framer-motion";

function RegisterUser() {
    const [userData, setUserData] = useState({
        user_name: '',
        email: '',
        first_name: '',
        last_name: '',
        role: 'user',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.status === 201) {
                console.log('Usuario registrado exitosamente!');
                // You can redirect or display a success message here
            } else {
                const data = await response.json();
                console.error('Registro fallido:', data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
        >
            <Container fluid>
                <Row className="flex-column page ">
                    <Col className="w-100 col-1" xs={12} md={2}>
                        <NavBar
                            usuario="Joseeeeee"
                        ></NavBar>
                    </Col>

                    <Col className="w-100 col-2" xs={12} md={10}>
                        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                            <h2>Register New User</h2>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="user_name">Username:</label>
                                    <input
                                        type="text"
                                        name="user_name"
                                        value={userData.user_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="first_name">First Name:</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={userData.first_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="last_name">Last Name:</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={userData.last_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="role">Role:</label>
                                    <select name="role" value={userData.role} onChange={handleChange}>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={userData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit">Register</button>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </motion.div>
    );
}

export default RegisterUser;
