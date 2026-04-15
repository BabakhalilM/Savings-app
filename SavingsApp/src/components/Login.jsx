import '../styles/login.css'
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import api from "./api";
import Cookies from 'js-cookie';
import { AuthContext } from "./AuthApi";
import { useToast } from '@chakra-ui/react';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { setIsAuthenticated, setRole } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/login", { email, password });
      console.log("API response:", response);

      if (response.data && response.data.accessToken) {
        const { accessToken, role } = response.data;
        Cookies.set("accessToken", accessToken);
        Cookies.set("role", role);
        localStorage.setItem("userid", response.data.userid);

        // Update auth context immediately so Nav updates right away
        setIsAuthenticated(true);
        setRole(role);

        toast({
          title: "Login successful.",
          description: "You have been successfully logged in.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Login error:", err);

      toast({
        title: "Login failed.",
        description:
          err.response?.data?.message ||
          err.message ||
          "Please check your credentials.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-page-container'>
        <div className='login-main-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="email" className='label-for-input-login'>Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email or Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='input-field-login'
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="password" className='label-for-input-login '>Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='input-field-login'
            />
          </div>
          <button type="submit">
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
      <br />
      <p>
        <Link to="/register" className='signup-text'>
          Sign up
        </Link>
      </p>
    </div>
    <div className='login-image-container'>
      <img src="https://static.vecteezy.com/system/resources/thumbnails/001/829/844/small_2x/saving-into-a-piggy-bank-depicts-people-putting-money-into-banking-to-copy-save-and-bank-interest-for-return-on-investment-roi-character-concept-illustration-for-web-landing-page-mobile-apps-free-vector.jpg" alt="" />
    </div>
    </div>
  );
};

export default Login;
