// import axios from file;
import axios from './customize-axios';

const fetchAllUser = () => {
    //Ham promise
    return axios.get('/api/users?page=1');
};
export { fetchAllUser };
