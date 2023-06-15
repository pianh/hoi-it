// import axios from file;
import axios from './customize-axios';

const fetchAllUser = (page) => {
    //Ham promise
    return axios.get(`/api/users?page=${page}`);
};

const postCreateUser = (name, job) => {
    return axios.post('/api/users', { name, job });
};

const loginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
};

const putUpdateUser = (name, job) => {
    return axios.put('api/users/2', { name, job });
};
const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`);
};
export { fetchAllUser, postCreateUser, putUpdateUser, deleteUser, loginApi };
