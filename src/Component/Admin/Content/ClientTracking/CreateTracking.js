import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateTracking(props) {
    const { show, setShow, onAdd } = props;
    const handleClose = () => setShow(false);

    const [clientName, setClientName] = useState("");
    const [clientId, setClientId] = useState(""); // store client_id
    const [date, setDate] = useState("");
    const [weight, setWeight] = useState("");
    const [sleepHour, setSleepHour] = useState("");
    const [stepCount, setStepCount] = useState("");
    const [notes, setNotes] = useState("");

    const token = localStorage.getItem("token");
    const axiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    // Hàm tìm client_id dựa trên clientName
    const fetchClientIdByName = async (clientName) => {
        try {
            const response = await axiosInstance.get(`http://localhost:8080/client/clientId/${clientName}`);
            if (response.data && response.data.client_id) {
                setClientId(response.data.client_id); // Lưu client_id
            } else {
                setClientId(null);
                toast.error("Client not found");
            }
        } catch (error) {
            console.error('Error fetching client ID:', error);
            toast.error('Could not fetch client ID');
        }
    };

    // Gọi API khi clientName thay đổi
    useEffect(() => {
        if (clientName) {
            fetchClientIdByName(clientName);
        }
    }, [clientName]);

    const handleSave = async () => {
        if (!clientId || !date || !weight || !sleepHour || !stepCount) {
            toast.error('Please fill all the required fields');
            return;
        }

        const trackingData = {
            client_id: clientId,
            date,
            weight,
            sleep_hour: sleepHour,
            step_count: stepCount,
            notes,
        };

        try {
            await axiosInstance.post('http://localhost:8080/clientstracking', trackingData);
            toast.success('Tracking added successfully!');
            handleClose();
            onAdd(); // Trigger refresh in the parent component
        } catch (error) {
            console.error('Error adding tracking data:', error);
            toast.error('Failed to add tracking');
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Add New Tracking</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-12">
                        <label className="form-label">Client Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={clientName} 
                            onChange={(e) => setClientName(e.target.value)} 
                            placeholder="Enter client name"
                        />
                        {clientId && <small className="form-text text-muted">Client ID: {clientId}</small>}
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Date</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            value={date} 
                            onChange={(e) => setDate(e.target.value)} 
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Weight (kg)</label>
                        <input 
                            type="number" 
                            step="0.1" 
                            className="form-control" 
                            value={weight} 
                            onChange={(e) => setWeight(e.target.value)} 
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Sleep Hours</label>
                        <input 
                            type="number" 
                            step="0.1" 
                            className="form-control" 
                            value={sleepHour} 
                            onChange={(e) => setSleepHour(e.target.value)} 
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Step Count</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            value={stepCount} 
                            onChange={(e) => setStepCount(e.target.value)} 
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Notes</label>
                        <textarea 
                            className="form-control" 
                            value={notes} 
                            onChange={(e) => setNotes(e.target.value)} 
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

export default CreateTracking;
