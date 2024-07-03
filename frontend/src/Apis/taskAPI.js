import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const token = localStorage.getItem('token');

export const getTasks = async (frequency) => {
    try {
        const requestUrl = `${backendUrl}/task/getAll?frequency=${frequency}`;
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(requestUrl);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
    }
}

export const createTask = async ({ title, priority, checklist, dueDate }) => {
    try {
        const requestUrl = `${backendUrl}/task/addTask`;
        const requestPayload = { title, priority, checklist, dueDate };
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.post(requestUrl, requestPayload);
        toast.success(response.data.message);
        return response;
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const getTaskById = async (taskId) => {
    try {
        const requestUrl = `${backendUrl}/task/taskDetails/${taskId}`;
        const response = await axios.get(requestUrl);
        toast.success(response.data.message);
        return response;
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const deleteTaskById = async (taskId) => {
    try {
        const requestUrl = `${backendUrl}/task/delete/${taskId}`;
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.delete(requestUrl);
        toast.success(response.data.message);
        return response;
    } catch (error) {
        toast.error(error.response.data.message);
    }
}

export const updateTaskById = async ({ taskId, title, priority, checklist, dueDate, section, itemId, itemChecked }) => {
    try {
        const requestUrl = `${backendUrl}/task/update/${taskId}`;
        const requestPayload = { title, priority, checklist, dueDate, section, itemId, itemChecked };
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.put(requestUrl, requestPayload);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
    }
}