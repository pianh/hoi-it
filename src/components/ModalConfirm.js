import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalConfirm = (props) => {
    const { show, handleClose, dataUserDelete } = props;
    const confirmDelete = () => {};
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <h5>This action can't be undone!</h5>
                        Do want to delete this user ? <br />
                        email ={dataUserDelete.email}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => confirmDelete()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalConfirm;
