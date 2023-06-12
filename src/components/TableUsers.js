import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from './../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm';
import _ from 'lodash';
import { debounce } from 'lodash';
import './TableUser.scss';
import { CSVLink, CSVDownload } from 'react-csv';
const TableUsers = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({}); //Fill

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUserDelete, setDataUserDelete] = useState({});

    const [sortBy, setSortBy] = useState('asc');
    const [sortField, setSortField] = useState('id');

    const [keyword, setKeyword] = useState('');
    const [dataExport, setDataExport] = useState([]);

    const handleClose = () => {
        //Dùng ar function khắc phục render nhiều lần
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    };
    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers]);
    };
    //Thực tế nếu gọi API thành công thì gọi lại api lấy ds của người dùng
    const handleEditUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        let index = listUsers.findIndex((item) => item.id === user.id);
        cloneListUsers[index].first_name = user.first_name;
        setListUsers(cloneListUsers);
    };
    //Thực tế nếu gọi API thành công thì gọi lại api lấy ds của người dùng
    const handleDeleteUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);
        setListUsers(cloneListUsers);
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
    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEdit(true);
    };
    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true);
        setDataUserDelete(user);
        // console.log(user);
    };
    // console.log(listUsers);

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);

        // console.log(cloneListUsers);
        setListUsers(cloneListUsers);
    };
    // console.log('>>> check sort: ', sortBy, sortField);
    const handleSearch = debounce((event) => {
        let term = event.target.value;
        // console.log('>>> run search term...', term);
        if (term) {
            let cloneListUsers = _.cloneDeep(listUsers);
            cloneListUsers = cloneListUsers.filter((item) => item.email.includes(term)); //email bao gồm phần tử mà chúng ta search
            // console.log(cloneListUsers);
            setListUsers(cloneListUsers);
        } else {
            getUsers(1);
        }
    }, 300);
    const csvData = [
        ['firstname', 'lastname', 'email'],
        ['Ahmed', 'Tomi', 'ah@smthing.co.com'],
        ['Raed', 'Labes', 'rl@smthing.co.com'],
        ['Yezzi', 'Min l3b', 'ymin@cocococo.com'],
    ];
    const getUsersExport = () => {};
    return (
        <>
            <div className="my-3 add-new">
                <span>
                    <b>List Users:</b>
                </span>
                <div className="group-btns">
                    <label htmlFor="test" className="btn btn-info">
                        <i className="fa-solid fa-file-import"></i> Import
                    </label>
                    <input id="test" type="file" hidden />

                    <CSVLink
                        data={dataExport}
                        filename={'my-file.csv'}
                        className="btn btn-primary"
                        asyncOnClick={true}
                        onClick={this.getUsersExport}
                    >
                        <i className="fa-solid fa-file-arrow-down"></i> Export
                    </CSVLink>

                    <button type="button" className="btn btn-success" onClick={() => setIsShowModalAddNew(true)}>
                        <i className="fa-solid fa-circle-plus"></i> Add new
                    </button>
                </div>
            </div>
            <div className="col-4 my-3">
                <input
                    className="form-control"
                    placeholder="Search user by email..."
                    // value={keyword}
                    onChange={(event) => handleSearch(event)}
                />
            </div>
            <Table striped bordered hover>
                {/* avatar : "https://reqres.in/img/faces/7-image.jpg" email : "michael.lawson@reqres.in" first_name :
                "Michael" id : 7 last_name : "Lawson" */}
                <thead>
                    <tr>
                        <th>
                            <div className="sort-header">
                                <span>ID</span>
                                <span>
                                    <i
                                        className="fa-solid fa-arrow-down-long"
                                        onClick={() => handleSort('desc', 'id')}
                                    ></i>
                                    <i
                                        className="fa-solid fa-arrow-up-long"
                                        onClick={() => handleSort('asc', 'id')}
                                    ></i>
                                </span>
                            </div>
                        </th>
                        <th>Email</th>
                        <th>
                            <span>First Name</span>
                            <div className="sort-header">
                                <span>
                                    <i
                                        className="fa-solid fa-arrow-down-long"
                                        onClick={() => handleSort('desc', 'first_name')}
                                    ></i>
                                    <i
                                        className="fa-solid fa-arrow-up-long"
                                        onClick={() => handleSort('asc', 'first_name')}
                                    ></i>
                                </span>
                            </div>
                        </th>
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
                                        <button
                                            type="button"
                                            className="btn btn-warning mx-3"
                                            onClick={() => handleEditUser(item)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(item)}
                                            type="button"
                                            className="btn btn-danger"
                                        >
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
            <ModalEditUser
                show={isShowModalEdit}
                dataUserEdit={dataUserEdit}
                handleClose={handleClose}
                handleEditUserFromModal={handleEditUserFromModal}
            />
            <ModalConfirm
                show={isShowModalDelete}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
            />
        </>
    );
};

export default TableUsers;
