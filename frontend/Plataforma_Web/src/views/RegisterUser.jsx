import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "../globalComponent/components/NavBar";

function RegisterUser() {
  const token = localStorage.getItem("access_token");

  const [userData, setUserData] = useState({
    user_name: "",
    email: "",
    first_name: "",
    last_name: "",
    role: "user",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await fetch(
        "http://perrera.inf.udec.cl:1522/user/register",
        {
          method: "POST",
          headers,
          body: JSON.stringify(userData),
        }
      );

      if (response.status === 201) {
        console.log("Usuario registrado exitosamente!");
        // You can redirect or display a success message here
      } else {
        const data = await response.json();
        console.error("Registro fallido:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
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
  );
}

export default RegisterUser;
