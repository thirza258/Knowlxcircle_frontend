import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginService from "../services/LoginService";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validate = (): string | null => {
    if (username.trim() === "") {
      return "Username is required.";
    }
    if (password === "") {
      return "Password is required.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    if (email.trim() === "") {
      return "Email is required.";
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      return "Please enter a valid email address.";
    }
    return null;
  };

  const handleRegister = async () => {
    if (isSubmitting) {
      return;
    }

    const validationError = validate();
    if (validationError !== null) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await LoginService.register(
        username,
        password,
        email,
        occupation,
        bio
      );
      navigate("/login");
    } catch (err: unknown) {
      console.error("Register error:", err);
      setError(
        "Registration failed. Please check your details and try again."
      );
      setIsSubmitting(false);
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
          {error !== null && <p className="text-red-500">{error}</p>}
          <div className="relative mt-2">
            <input
              type="text"
              className="py-2 px-2 text-black w-full bg-white rounded-[6px]"
              placeholder="Username"
              value={username}
              autoComplete="username"
              disabled={isSubmitting}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="relative mt-2">
            <input
              type="password"
              className="py-2 px-2 text-black w-full bg-white rounded-[6px]"
              placeholder="Password"
              value={password}
              autoComplete="new-password"
              disabled={isSubmitting}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="relative mt-2">
            <input
              type="password"
              className="py-2 px-2 text-black w-full bg-white rounded-[6px]"
              placeholder="Confirm Password"
              value={confirmPassword}
              autoComplete="new-password"
              disabled={isSubmitting}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="relatice mt-2">
            <input
              type="email"
              className="py-2 px-2 text-black w-full bg-white rounded-[6px]"
              placeholder="Email"
              value={email}
              autoComplete="email"
              disabled={isSubmitting}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative mt-2">
            <input
              type="text"
              className="py-2 px-2 text-black w-full bg-white rounded-[6px]"
              placeholder="Occupation"
              value={occupation}
              disabled={isSubmitting}
              onChange={(e) => setOccupation(e.target.value)}
            />
          </div>
          <div className="relative mt-2">
            <input
              type="text"
              className="py-2 px-2 text-black w-full bg-white rounded-[6px]"
              placeholder="Bio"
              value={bio}
              disabled={isSubmitting}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn-primary text-black bg-white w-full mt-5"
            disabled={isSubmitting}
            onClick={() => {
              void handleRegister();
            }}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
          <button
            type="button"
            className="btn-primary text-black bg-white w-full mt-2"
            disabled={isSubmitting}
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
