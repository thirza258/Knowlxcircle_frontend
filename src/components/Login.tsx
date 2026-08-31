import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../useAuth';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleLogin = async () => {
        if (isSubmitting) {
            return;
        }

        if (username.trim() === '' || password === '') {
            setError('Please enter both a username and a password.');
            return;
        }

        setError(null);
        setIsSubmitting(true);

        try {
            await login(username, password);
            navigate('/');
        } catch (err: unknown) {
            console.error('Login error:', err);
            setError('Login failed. Please check your username and password.');
            setIsSubmitting(false);
        }
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className="flex-col px-10 py-10 items-center justify-center">
            <div className="flex items-center justify-center bg-gray-300">
                <div className="flex-1 mx-10">
                    <h1 className="primary-header title">Login</h1>
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
                            autoComplete="current-password"
                            disabled={isSubmitting}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn-primary text-black bg-white w-full mt-5"
                        disabled={isSubmitting}
                        onClick={() => {
                            void handleLogin();
                        }}
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                    {/* <div className="flex space-x-4 mt-4">
                        <button className="btn-primary flex-1 bg-white w-full">
                            <p className="title">Google</p>
                        </button>
                        <button className="btn-primary flex-1 bg-white w-full">
                            <p className="title">Facebook</p>
                        </button>
                    </div> */}
                    <button
                        type="button"
                        className="btn-primary text-black bg-white w-full mt-2"
                        disabled={isSubmitting}
                        onClick={handleRegister}
                    >
                        Register
                    </button>
                </div>
                <div className="flex-1">
                    <div className="bg-blue-500 w-[80wh] h-[80vh]"></div>
                </div>
            </div>
        </div>
    );
};

export default Login;
