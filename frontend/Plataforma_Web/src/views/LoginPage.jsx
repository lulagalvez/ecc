import "./style/LoginPage.css";
import { motion } from "framer-motion";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { AiOutlineUserAdd } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import Logo from "../image/shield-image.png";
import React from "react";
import axios from 'axios';

const LoginPage = () => {
  const [loginForm, setloginForm] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate();

  function logMeIn(event) {
    axios({
      method: "POST",
      url: "http://localhost:5000/user/login",
      data: {
        user_name: loginForm.email,
        password: loginForm.password
      }
    })
      .then((response) => {
        console.log("here");
        localStorage.setItem("access_token", response.data.access_token);
        navigate("/menu", {replace: true});
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })

    setloginForm(({
      email: "",
      password: ""
    }))
    event.preventDefault()
  }

  function handleChange(event) {
    const { value, name } = event.target
    setloginForm(prevNote => ({
      ...prevNote, [name]: value
    })
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} // Ver tema de opacidad en transicion
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Container fluid className="background">


        <Container className="page-container ">
          <Row className="justify-content-center align-items-center flex-column login-row ">
            <Col md={12} className="fila-1">
              <Image
                src={Logo}
                className="logo"
                alt="Logo"
                style={{ maxWidth: "100%" }}
              />
            </Col>

            <Col md={12} className="fila-2">
              <Form>
                <Form.Group className="mb-5 mt-5" controlId="formBasicEmail">
                  <div className="user">
                    <AiOutlineUserAdd className="icono" />
                    <Form.Control
                      className="formulario-control"
                      type="email"
                      placeholder="Numero de bombero"
                      value={loginForm.email} // Bind the value to the state
                      name="email" // Add the name attribute
                      onChange={handleChange} // Add the change handler
                    />
                  </div>
                </Form.Group>

                <Form.Group className="password mb-5" controlId="formBasicPassword">
                  <div className="user">
                    <RiLockPasswordLine className="icono" />
                    <Form.Control
                      className="formulario-control"
                      type="password"
                      placeholder="Contraseña"
                      value={loginForm.password} // Bind the value to the state
                      name="password" // Add the name attribute
                      onChange={handleChange} // Add the change handler
                    />
                  </div>
                </Form.Group>

                <Button variant="dark" type="submit" size="lg" className="mb-2" onClick={logMeIn}>
                  Iniciar Sesión
                </Button>
              </Form>

            </Col>
          </Row>
        </Container>


      </Container>
    </motion.div>
  );
};

export default LoginPage;


/* 
const LoginPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <form className="login">
        <input onChange={handleChange}
          type="email"
          text={loginForm.email}
          name="email"
          placeholder="Email"
          value={loginForm.email} />
        <input onChange={handleChange}
          type="password"
          text={loginForm.password}
          name="password"
          placeholder="Password"
          value={loginForm.password} />

        <button onClick={logMeIn}>Submit</button>
      </form>
    </div>
  );
};

export default LoginPage; */
