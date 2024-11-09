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
    const [notes, setNotes] = useState("");
    const [kcal, setKcal] = useState("");
    const [protein, setProtein] = useState("");
    const [carb, setCarb] = useState("");
    const [fat, setFat] = useState("");

    const handleSave = async () => {

        if(!foodName){
            toast.error('no name');
            return;
        }

        const foodData = {
            foodName,
            notes,
            kcal: parseFloat(kcal),
            protein: parseFloat(protein),
            carb: parseFloat(carb),
            fat: parseFloat(fat)
        };

        try {
            await axios.post('http://localhost:8080/food', foodData); 
            console.log(Response);
            toast.success('Food item added successfully!')
            handleClose();
            // onAdd(); 
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
                            <label className="form-label">Notes</label>
                            <input type="text" className="form-control" value={notes} onChange={(e) => setNotes(e.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Kcal</label>
                            <input type="text" className="form-control" value={kcal} onChange={(e) => setKcal(e.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Protein</label>
                            <input type="text" className="form-control" value={protein} onChange={(e) => setProtein(e.target.value)} />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Carb</label>
                            <input type="text" className="form-control" value={carb} onChange={(e) => setCarb(e.target.value)} />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Fat</label>
                            <input type="text" className="form-control" value={fat} onChange={(e) => setFat(e.target.value)} />
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
