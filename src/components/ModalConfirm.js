import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalConfirm = (props) => {
    const { show, handleClose } = props;
    const confirmDelete = () => {};
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <h3>This action can't be undone!</h3>
                        <br />
                        <h4>Do want to delete this user ? email ="abcxyz"</h4>
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
