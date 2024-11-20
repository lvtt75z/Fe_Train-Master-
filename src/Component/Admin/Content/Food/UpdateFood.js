import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateFood(props) {
    const { show, setShow, foodId, onUpdate } = props;
    const handleClose = () => setShow(false);

    const [foodName, setFoodName] = useState("");
    const [unit, setUnit] = useState("");

    const token = localStorage.getItem("token");
    const axiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    // Fetch food data by ID when modal is shown
    useEffect(() => {
        if (foodId) {
            axiosInstance.get(`http://localhost:8080/food/getFoodById/${foodId}`)
                .then((response) => {
                    const food = response.data;
                    setFoodName(food.foodName);
                    setUnit(food.unit);
                })
                .catch((error) => {
                    console.error('Error fetching food data:', error);
                    toast.error('Failed to fetch food data');
                });
        }
    }, [foodId]);

    const handleUpdate = async () => {
        if (!foodName) {
            toast.error('Food name is required');
            return;
        }

        const foodData = {
            foodName,
            unit
        };

        try {
            await axiosInstance.put(`http://localhost:8080/food/${foodId}`, foodData);
            toast.success('Food item updated successfully!');
            handleClose();
            onUpdate();  // Refresh the table data after updating
        } catch (error) {
            console.error('Error updating food item:', error);
            toast.error('Failed to update food item');
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Update Food</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-12">
                        <label className="form-label">Food Name</label>
                        <input type="text" className="form-control" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Notes</label>
                        <input type="text" className="form-control" value={unit} onChange={(e) => setUnit(e.target.value)} />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateFood;
