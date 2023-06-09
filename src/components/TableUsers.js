import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from './../services/UserService';

const TableUsers = (props) => {
    const [listUsers, setListUser] = useState([]);

    useEffect(() => {
        //Call apis
        getUsers();
    }, []);

    const getUsers = async () => {
        let res = await fetchAllUser();

        // check data
        if (res && res.data && res.data.data) {
            setListUser(res.data.data);
        }
        // console.log('>>> check res: ', res);
    };
    console.log(listUsers);
    return (
        <>
            <Table striped bordered hover>
                {/* avatar : "https://reqres.in/img/faces/7-image.jpg" email : "michael.lawson@reqres.in" first_name :
                "Michael" id : 7 last_name : "Lawson" */}
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers &&
                        listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`user-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
        </>
    );
};

export default TableUsers;
