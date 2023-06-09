import axios from 'axios';

const fetchAllUser = () => {
    //Ham promise
    return axios.get('https://reqres.in/api/users?page=2');
};
export { fetchAllUser };
