import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';  // Adjust the import path
import { useNavigate } from 'react-router-dom';

// Remove the unused import of useHistory
// const history = useHistory();

const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const authContext = useContext(AuthContext);

    if (!authContext) {
        return null;
    }

    const navigate = useNavigate();

    const { login } = authContext;

    const handleLogin = async () => {
        try {
            await login(username, password);
            navigate('/');  // Replace with useHistory.push('/'
            // Redirect or handle successful login
        } catch (error) {
            setError('Login failed. Please check your username and password.');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="flex-col px-10 py-10 items-center justify-center">
            <div className="flex items-center justify-center bg-gray-300">
                <div className="flex-1 mx-10">
                    <h1 className="primary-header title">Login</h1>
                    {error && <p className="text-red-500">{error}</p>}
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
                    <button
                        className="btn-primary text-black bg-white w-full mt-5"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                    <div className="flex space-x-4 mt-4">
                        <button className="btn-primary flex-1 bg-white w-full">
                            <p className="title">Google</p>
                        </button>
                        <button className="btn-primary flex-1 bg-white w-full">
                            <p className="title">Facebook</p>
                        </button>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="bg-blue-500 w-[80wh] h-[80vh]"></div>
                </div>
            </div>
        </div>
    );
};

export default Login;
