import axios from "axios";
import { apiBaseUrl, devBaseUrl } from "../constants";

const login = async (username: string, password: string) => {
    const response = await axios.post(`${devBaseUrl}v1/auth/login/`, {
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

export default {
    login,
    logout,
    getToken
}