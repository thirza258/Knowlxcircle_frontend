import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginService from "../services/LoginService";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      } else {
        const response = await LoginService.register(
          username,
          password,
          email,
          occupation,
          bio
        );
        navigate("/login");
        alert(response)
      }
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex-col px-10 py-10 items-center justify-center">
      <div className="flex items-center justify-center bg-gray-300">
        <div className="flex-1 mx-10">
          <h1 className="primary-header title">Register</h1>
          <div className="relative mt-2">
            <input
              type="text"
              className="py-2 px-2 text-black w-full bg-white rounded-[6px]"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="relative mt-2">
            <input
              type="password"
              className="py-2 px-2 text-black w-full bg-white rounded-[6px]"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="relative mt-2">
            <input
              type="password"
              className="py-2 px-2 text-black w-full bg-white rounded-[6px]"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="relatice mt-2">
            <input
              type="email"
              className="py-2 px-2 text-black w-full bg-white rounded-[6px]"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative mt-2">
            <input
              type="text"
              className="py-2 px-2 text-black w-full bg-white rounded-[6px]"
              placeholder="Occupation"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            />
          </div>
          <div className="relative mt-2">
            <input
              type="text"
              className="py-2 px-2 text-black w-full bg-white rounded-[6px]"
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <button
            className="btn-primary text-black bg-white w-full mt-5"
            onClick={handleRegister}
          >
            Register
          </button>
          <button
            className="btn-primary text-black bg-white w-full mt-2"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>

        <div className="flex-1">
          <div className="bg-blue-500 w-[80wh] h-[90vh]"></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
