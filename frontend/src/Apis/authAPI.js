import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://promanage-v5fn.onrender.com';

const token = localStorage.getItem('token');

export const userRegister = async ({ name, email, password }) => {
    try {
        const requestUrl = `${backendUrl}/auth/register`;
        const requestPayload = { name, email, password };
        const response = await axios.post(requestUrl, requestPayload);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
    }
}


export const userLogin = async ({ email, password }) => {
    try {
        const requestUrl = `${backendUrl}/auth/login`;
        const requestPayload = { email, password };
        const response = await axios.post(requestUrl, requestPayload);
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
    }
}

export const userUpdate = async ({ name, oldPassword, newPassword }) => {
    try {
        const requestUrl = `${backendUrl}/auth/update`;
        const requestPayload = { name, oldPassword, newPassword };
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.put(requestUrl, requestPayload);
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
    }
}