import { useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import "../style/addrole.css";

const AddRoleForm = () => {
    const [roleName, setRoleName] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/roles/addRoles', { role_name: roleName });
            setSuccessMessage(response.data.message);
            setRoleName('');
            setShowModal(false);
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div>
            <Button className='addbutton' onClick={() => setShowModal(true)}>
                Add Role
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="roleName">Role Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="roleName"
                                value={roleName}
                                onChange={(e) => setRoleName(e.target.value)}
                            />
                        </div>
                    </form>
                    {error && <p className="text-danger">Error: {error}</p>}
                    {successMessage && <p className="text-success">{successMessage}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button className='buttoncolor' onClick={handleSubmit}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddRoleForm;
