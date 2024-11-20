import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './Program.scss';
import { toast } from 'react-toastify';

function CreateProgram({ show, setShow, onAdd }) {
  const [clientName, setClientName] = useState('');
  const [day, setDay] = useState('');
  const [week, setWeek] = useState('');
  const [exercises, setExercises] = useState([
    { selectedExerciseName: '', setsStandard: '', repsStandard: '', set1: '', set2: '', set3: '', set4: '', set5: '', tempo: '', rirRpe: '', load: '' }
  ]);
  const [clients, setClients] = useState([]); // Dữ liệu Clients
  const [availableExercises, setAvailableExercises] = useState([]); // Dữ liệu Exercises

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      { selectedExerciseName: '', setsStandard: '', repsStandard: '', set1: '', set2: '', set3: '', set4: '', set5: '', tempo: '', rirRpe: '', load: '' }
    ]);
  };

  const handleClose = () => {
    setShow(false); // Chỉ đóng modal khi nhấn vào nút "Close"
  };

  const handleRemoveExercise = (index) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
  };

  const handleExerciseChange = (index, event) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][event.target.name] = event.target.value;
    setExercises(updatedExercises);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convert `day` and `week` to integers
    const formattedDay = parseInt(day, 10);
    const formattedWeek = parseInt(week, 10);

    // Format the exercises array to match the desired structure
    const formattedExercises = exercises.map(exercise => ({
      selectedExerciseName: exercise.selectedExerciseName,
      setsStandard: parseInt(exercise.setsStandard, 10),
      repsStandard: parseInt(exercise.repsStandard, 10),
      set1: exercise.set1 ? parseInt(exercise.set1, 10) : null,
      set2: exercise.set2 ? parseInt(exercise.set2, 10) : null,
      set3: exercise.set3 ? parseInt(exercise.set3, 10) : null,
      set4: exercise.set4 ? parseInt(exercise.set4, 10) : null,
      set5: exercise.set5 ? parseInt(exercise.set5, 10) : null,
      tempo: exercise.tempo,
      rirRpe: parseInt(exercise.rirRpe, 10),
      load: parseInt(exercise.load, 10)
    }));

    const programData = {
      clientName,
      day: formattedDay,
      week: formattedWeek,
      exercises: formattedExercises,
    };

    console.log(programData);

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('No token found! Please log in.');
      return;
    }

    // Dùng token trong header để phân quyền
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    try {
      const response = await axios.post('http://localhost:8080/programs/create', programData,config);
      toast.success('Program created successfully!')
      onAdd();
      handleClose();
    } catch (error) {
      console.error(error);
      alert("Error creating Program");
    }
  };


  // Lấy danh sách Clients và Exercises từ API khi modal mở
  useEffect(() => {
    if (show) {
      const token = localStorage.getItem('token');
      if (token) {
        // Dùng token trong header để phân quyền
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        };

        axios.get('http://localhost:8080/client/getAllClient',config)
          .then(response => {
            setClients(response.data); // Cập nhật danh sách clients
          })
          .catch(error => {
            console.error("There was an error fetching clients!", error);
          });

        axios.get('http://localhost:8080/exercise/getAllExercise',config)
          .then(response => {
            setAvailableExercises(response.data); // Cập nhật danh sách exercises
          })
          .catch(error => {
            console.error("There was an error fetching exercises!", error);
          });
      } else {
        toast.error('No token found! Please log in.');
        setShow(false); // Đóng modal nếu không có token
      }
    }
  }, [show]); // Chạy lại mỗi khi modal mở

  return (
    <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Create a New Program</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="clientName">
            <Form.Label>Client Name:</Form.Label>
            <Form.Control
              as="select"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            >
              <option value="">Select a Client</option>
              {clients.map((client, index) => (
                <option key={index} value={client.firstName}>{client.firstName}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="day">
            <Form.Label>Day:</Form.Label>
            <Form.Control
              type="date"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="week">
            <Form.Label>Week:</Form.Label>
            <Form.Control
              type="number"
              value={week}
              onChange={(e) => setWeek(e.target.value)}
              required
            />
          </Form.Group>

          <h5>Exercises</h5>
          {exercises.map((exercise, index) => (
            <div key={index} className="exercise-item">
              <Form.Group controlId={`selectedExerciseName-${index}`}>
                <Form.Label>Exercise Name:</Form.Label>
                <Form.Control
                  as="select"
                  name="selectedExerciseName"
                  value={exercise.selectedExerciseName}
                  onChange={(e) => handleExerciseChange(index, e)}
                  required
                >
                  <option value="">Select an Exercise</option>
                  {availableExercises.map((exerciseItem, i) => (
                    <option key={i} value={exerciseItem.exercisename}>{exerciseItem.exercisename}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId={`setsStandard-${index}`}>
                <Form.Label>Sets:</Form.Label>
                <Form.Control
                  type="number"
                  name="setsStandard"
                  value={exercise.setsStandard}
                  onChange={(e) => handleExerciseChange(index, e)}
                  required
                />
              </Form.Group>

              <Form.Group controlId={`repsStandard-${index}`}>
                <Form.Label>Reps:</Form.Label>
                <Form.Control
                  type="number"
                  name="repsStandard"
                  value={exercise.repsStandard}
                  onChange={(e) => handleExerciseChange(index, e)}
                  required
                />
              </Form.Group>

              <Form.Group controlId={`set1-${index}`}>
                <Form.Label>Set 1:</Form.Label>
                <Form.Control
                  type="number"
                  name="set1"
                  value={exercise.set1}
                  onChange={(e) => handleExerciseChange(index, e)}
                />
              </Form.Group>

              <Form.Group controlId={`set2-${index}`}>
                <Form.Label>Set 2:</Form.Label>
                <Form.Control
                  type="number"
                  name="set2"
                  value={exercise.set2}
                  onChange={(e) => handleExerciseChange(index, e)}
                />
              </Form.Group>

              <Form.Group controlId={`set3-${index}`}>
                <Form.Label>Set 3:</Form.Label>
                <Form.Control
                  type="number"
                  name="set3"
                  value={exercise.set3}
                  onChange={(e) => handleExerciseChange(index, e)}
                />
              </Form.Group>

              <Form.Group controlId={`set4-${index}`}>
                <Form.Label>Set 4:</Form.Label>
                <Form.Control
                  type="number"
                  name="set4"
                  value={exercise.set4}
                  onChange={(e) => handleExerciseChange(index, e)}
                />
              </Form.Group>

              <Form.Group controlId={`set5-${index}`}>
                <Form.Label>Set 5:</Form.Label>
                <Form.Control
                  type="number"
                  name="set5"
                  value={exercise.set5}
                  onChange={(e) => handleExerciseChange(index, e)}
                />
              </Form.Group>

              <Form.Group controlId={`tempo-${index}`}>
                <Form.Label>Tempo:</Form.Label>
                <Form.Control
                  type="text"
                  name="tempo"
                  value={exercise.tempo}
                  onChange={(e) => handleExerciseChange(index, e)}
                />
              </Form.Group>

              <Form.Group controlId={`rirRpe-${index}`}>
                <Form.Label>RIR / RPE:</Form.Label>
                <Form.Control
                  type="text"
                  name="rirRpe"
                  value={exercise.rirRpe}
                  onChange={(e) => handleExerciseChange(index, e)}
                />
              </Form.Group>

              <Form.Group controlId={`load-${index}`}>
                <Form.Label>Load:</Form.Label>
                <Form.Control
                  type="number"
                  name="load"
                  value={exercise.load}
                  onChange={(e) => handleExerciseChange(index, e)}
                />
              </Form.Group>

              <Button variant="danger" type="button" onClick={() => handleRemoveExercise(index)}>
                Remove Exercise
              </Button>
            </div>
          ))}

          <Button variant="secondary" type="button" onClick={handleAddExercise}>
            Add Exercise
          </Button>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Create Program
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateProgram;
