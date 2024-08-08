import axios from "axios";
import { apiBaseUrl, devBaseUrl } from "../constants";

const login = async (username: string, password: string) => {
    const response = await axios.post(`${apiBaseUrl}v1/auth/login/`, {
        username: username,
        password: password
    });
    const token = response.data.response.access;
    localStorage.setItem('jwtToken', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return response.data;
}

const logout = () => {
    localStorage.removeItem('jwtToken');
    delete axios.defaults.headers.common['Authorization'];
}

const getToken = () => localStorage.getItem('jwtToken');

const register = async (username: string, password: string, email: string, occupation: string, bio: string) => {
    try {
        const response = await axios.post(`${apiBaseUrl}v1/auth/register-member/`, {
            username: username,
            password: password,
            email: email,
            occupation: occupation,
            bio: bio
        });
       
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export default {
    login,
    logout,
    getToken,
    register
}