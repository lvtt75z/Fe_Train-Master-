import { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Program.scss';

function UpdateProgram({ show, setShow, programId, onUpdate }) {
    const handleClose = () => setShow(false);

    const [program, setProgram] = useState({
        clientName: '',
        day: '',
        week: '',
        exercises: []
    });

    const token = localStorage.getItem('token');  // Replace 'token' with the key you're using to store the token

    // Set up axios headers with token
    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${token}`  // Include the token in the Authorization header
      }
    });

    // Fetch program data when the modal is shown
    useEffect(() => {
        if (programId) {
            axiosInstance.get(`http://localhost:8080/programs/get/${programId}`)
                .then((response) => {
                    setProgram({
                        clientName: response.data.clientName,
                        day: response.data.day,
                        week: response.data.week,
                        exercises: response.data.exercises || []  // Ensure exercises is an array
                    });
                })
                .catch((error) => {
                    console.error('Error fetching program data:', error);
                    toast.error('Failed to fetch program data');
                });
        }
    }, [programId]);

    // Handle input change for exercises
    const handleExerciseChange = (index, field, value) => {
        const updatedExercises = [...program.exercises];
        updatedExercises[index][field] = value;
        setProgram({ ...program, exercises: updatedExercises });
    };

    // Handle program update submission
    const handleUpdate = async () => {
        const updatedProgram = {
            clientName: program.clientName,
            day: program.day,
            week: program.week,
            exercises: program.exercises.map(exercise => ({
                selectedExerciseName: exercise.exerciseName,
                setsStandard: exercise.setsStandard.toString(),
                repsStandard: exercise.repsStandard.toString()
            }))
        };

        try {
            await axiosInstance.put(`http://localhost:8080/programs/update/program/${programId}`, updatedProgram);
            toast.success('Program updated successfully!');
            handleClose();
            onUpdate();
        } catch (error) {
            console.error('Error updating program:', error);
            toast.error('Failed to update program');
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Update Program</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Client Name</label>
                        <input type="text" className="form-control" value={program.clientName} disabled />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Day</label>
                        <input
                            type="text"
                            className="form-control"
                            value={program.day}
                            onChange={(e) => setProgram({ ...program, day: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Week</label>
                        <input
                            type="text"
                            className="form-control"
                            value={program.week}
                            onChange={(e) => setProgram({ ...program, week: e.target.value })}
                        />
                    </div>

                    <h5>Exercises</h5>
                    {program.exercises && program.exercises.length > 0 ? (
                        program.exercises.map((exercise, index) => (
                            <div key={index} className="exercise-item">
                                <div>
                                    <label className="form-label">Exercise Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={exercise.exerciseName || ''}
                                        onChange={(e) => handleExerciseChange(index, 'exerciseName', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Sets</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={exercise.setsStandard || ''}
                                        onChange={(e) => handleExerciseChange(index, 'setsStandard', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Reps</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={exercise.repsStandard || ''}
                                        onChange={(e) => handleExerciseChange(index, 'repsStandard', e.target.value)}
                                    />
                                </div>

                                {/* Individual set inputs */}
                                <div>
                                    <label className="form-label">Set 1</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={exercise.set1 || ''}
                                        onChange={(e) => handleExerciseChange(index, 'set1', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Set 2</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={exercise.set2 || ''}
                                        onChange={(e) => handleExerciseChange(index, 'set2', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Set 3</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={exercise.set3 || ''}
                                        onChange={(e) => handleExerciseChange(index, 'set3', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Set 4</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={exercise.set4 || ''}
                                        onChange={(e) => handleExerciseChange(index, 'set4', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Set 5</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={exercise.set5 || ''}
                                        onChange={(e) => handleExerciseChange(index, 'set5', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="form-label">Tempo</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={exercise.tempo || ''}
                                        onChange={(e) => handleExerciseChange(index, 'tempo', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="form-label">RIR/RPE</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={exercise.rirRpe || ''}
                                        onChange={(e) => handleExerciseChange(index, 'rirRpe', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Load</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={exercise.loadOfExercise || ''}
                                        onChange={(e) => handleExerciseChange(index, 'loadOfExercise', e.target.value)}
                                    />
                                </div>

                                <hr />
                            </div>
                        ))
                    ) : (
                        <p>No exercises available</p>
                    )}
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateProgram;
