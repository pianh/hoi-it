import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../services/UserService';
import { toast } from 'react-toastify';
const ModalAddNew = (props) => {
    const { show, handleClose, handleUpdateTable } = props;
    const [name, setName] = useState('');
    const [job, setJob] = useState('');
    const handleSaveUsers = async () => {
        let res = await postCreateUser(name, job);

        console.log('>>> check res:', res);
        if (res && res.id) {
            // Success
            handleClose();
            setName('');
            setJob('');
            toast.success('A User is created succeed!');
            handleUpdateTable({ first_name: name, id: res.id });
        } else {
            //error
            toast.error('An error...');
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Job</label>
                            <input
                                type="text"
                                className="form-control"
                                value={job}
                                onChange={(event) => setJob(event.target.value)}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveUsers()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalAddNew;