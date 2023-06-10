// import axios from file;
import axios from './customize-axios';

const fetchAllUser = (page) => {
    //Ham promise
    return axios.get(`/api/users?page=${page}`);
};
export { fetchAllUser };
