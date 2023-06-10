import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from './../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';

const TableUsers = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const handleClose = () => {
        //Dùng ar function khắc phục render nhiều lần
        setIsShowModalAddNew(false);
    };
    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers]);
    };

    useEffect(() => {
        //Call apis
        getUsers(1); //Mặc định truyền phần tử trang 1
    }, []);

    const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        // console.log('>>> check new res: ', res);
        // check data
        if (res && res.data) {
            // console.log(res);
            setTotalUsers(res.total);
            setTotalPages(res.total_pages);
            setListUsers(res.data);
        }
        // console.log('>>> check res: ', res);
    };

    const handlePageClick = (event) => {
        // console.log('event lib: ', event);
        getUsers(+event.selected + 1);
    };

    // console.log(listUsers);
    return (
        <>
            <div className="my-3 add-new">
                <span>
                    <b>List Users:</b>
                </span>
                <button type="button" className="btn btn-success" onClick={() => setIsShowModalAddNew(true)}>
                    Add new User
                </button>
            </div>
            <Table striped bordered hover>
                {/* avatar : "https://reqres.in/img/faces/7-image.jpg" email : "michael.lawson@reqres.in" first_name :
                "Michael" id : 7 last_name : "Lawson" */}
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
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
                                    <td>
                                        <button type="button" className="btn btn-warning mr-2">
                                            Edit
                                        </button>
                                        <button type="button" className="btn btn-danger">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
            <ModalAddNew show={isShowModalAddNew} handleClose={handleClose} handleUpdateTable={handleUpdateTable} />
        </>
    );
};

export default TableUsers;
