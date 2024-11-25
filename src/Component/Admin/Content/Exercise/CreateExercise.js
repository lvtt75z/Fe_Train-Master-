import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { toast } from 'react-toastify';

function CreateExercise(props) {
    const { show, setShow, onAdd } = props;
    const handleClose = () => setShow(false);

    const [exerciseName, setExerciseName] = useState("");

    const token = localStorage.getItem("token");
    const axiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const handleSave = async () => {
        if (!exerciseName) {
            toast.error('Please fill in all fields');
            return;
        }

        const exerciseData = {
            exerciseName: exerciseName
        };

        try {
            await axiosInstance.post('http://localhost:8080/exercise', exerciseData);
            toast.success('Exercise added successfully!');
            handleClose();
            onAdd(); // Trigger refresh in the parent component
        } catch (error) {
            console.error('Error adding exercise:', error);
            toast.error('Failed to add exercise');
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Add New Exercise</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-12">
                        <label className="form-label">Exercise Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={exerciseName}
                            onChange={(e) => setExerciseName(e.target.value)}
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSave}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateExercise;
