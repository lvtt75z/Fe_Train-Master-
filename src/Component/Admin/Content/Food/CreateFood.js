import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateFood(props) {
    const { show, setShow, onAdd } = props;
    const handleClose = () => setShow(false);

    const [foodName, setFoodName] = useState("");
    const [unit, setUnit] = useState("");

    const handleSave = async () => {
        if (!foodName) {
            toast.error('No name provided');
            return;
        }

        const foodData = {
            foodName,
            unit
        };

        try {
            await axios.post('http://localhost:8080/food', foodData);
            toast.success('Food item added successfully!');
            handleClose();
            onAdd(); // Trigger refresh in the parent component
        } catch (error) {
            console.error('Error adding food item:', error);
            toast.error('Failed to add food item');
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Add New Food</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-12">
                            <label className="form-label">Food Name</label>
                            <input type="text" className="form-control" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Unit</label>
                            <input type="text" className="form-control" value={unit} onChange={(e) => setUnit(e.target.value)} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateFood;
