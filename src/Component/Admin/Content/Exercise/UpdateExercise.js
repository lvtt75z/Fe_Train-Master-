import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { toast } from 'react-toastify';

function UpdateExercise({ show, setShow, exerciseId, onUpdate }) {
    const [exerciseName, setExerciseName] = useState("");
    const [muscleGroup, setMuscleGroup] = useState("");

    const token = localStorage.getItem("token");
    const axiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    useEffect(() => {
        if (exerciseId) {
            axiosInstance.get(`http://localhost:8080/exercise/getExerciseById/${exerciseId}`)
                .then((response) => {
                    setExerciseName(response.data.exercisename);
                    setMuscleGroup(response.data.muscle_group);
                })
                .catch((error) => {
                    toast.error('Failed to fetch exercise data');
                });
        }
    }, [exerciseId]);

    const handleUpdate = async () => {
        if (!exerciseName || !muscleGroup) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            await axiosInstance.put(`http://localhost:8080/exercise/updateExercise/${exerciseId}`, {
                exercisename: exerciseName,
                muscle_group: muscleGroup,
            });
            toast.success('Exercise updated successfully');
            setShow(false);
            onUpdate();
        } catch (error) {
            toast.error('Failed to update exercise');
        }
    };

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Update Exercise</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="col-md-12">
                    <label>Exercise Name</label>
                    <br></br>
                    <input
                        type="text"
                        value={exerciseName}
                        onChange={(e) => setExerciseName(e.target.value)}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleUpdate}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateExercise;
