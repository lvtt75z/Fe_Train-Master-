import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Spinner, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import './ProgramComponent.scss';

const ApprovedPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApprovedPrograms = async () => {
      try {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username"); // assuming username is stored in localStorage
        const response = await axios.get(
          "http://localhost:8080/programs/approved",
          {
            params: { username },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Process the response data into a structured format
        const groupedPrograms = groupExercisesByProgram(response.data);
        setPrograms(groupedPrograms);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("Failed to load approved programs");
        toast.error("Error loading approved programs");
      }
    };

    fetchApprovedPrograms();
  }, []);

  // Group exercises by programId
  const groupExercisesByProgram = (data) => {
    const grouped = {};

    data.forEach((item) => {
      const [
        programId,
        day,
        week,
        exerciseName,
        setsStandard,
        totalVolume,
        repsStandard,
        set1,
        set2,
        set3,
        set4,
        set5,
        tempo,
        rirRpe,
        loadOfExercise,
        volume,
      ] = item;

      // Check if program exists in the grouped object
      if (!grouped[programId]) {
        grouped[programId] = {
          day,
          week,
          exercises: [],
          totalVolume: 0,
        };
      }

      // Push exercise data
      grouped[programId].exercises.push({
        exerciseName,
        setsStandard,
        volume,
        repsStandard,
        set1,
        set2,
        set3,
        set4,
        set5,
        tempo,
        rirRpe,
        loadOfExercise,
        volume,
      });

      // Sum total volume for the program
      grouped[programId].totalVolume += volume;
    });

    return Object.values(grouped); // Return grouped programs as an array
  };

  if (loading) {
    return (
      <Container>
        <Spinner animation="border" variant="primary" />
        <span>Loading approved programs...</span>
      </Container>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        {error}
      </Alert>
    );
  }

  return (
    <Container>
      <h2>Approved Programs</h2>
      {programs.map((program, index) => (
        <div key={index} className="program-section">
          <h3>
            Day: {program.day}, Week: {program.week}
          </h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Exercise Name</th>
                <th>Sets Standard</th>
                <th>Set 1</th>
                <th>Set 2</th>
                <th>Set 3</th>
                <th>Set 4</th>
                <th>Set 5</th>
                <th>Volume</th>
                <th>Load (kg)</th>
                <th>Tempo</th>
                <th>RIR/RPE</th>
              </tr>
            </thead>
            <tbody>
              {program.exercises.map((exercise, index) => (
                <tr key={index}>
                  <td>{exercise.exerciseName}</td>
                  <td>{exercise.setsStandard}</td>
                  <td>{exercise.set1}</td>
                  <td>{exercise.set2}</td>
                  <td>{exercise.set3}</td>
                  <td>{exercise.set4}</td>
                  <td>{exercise.set5}</td>
                  <td>{exercise.volume}</td>
                  <td>{exercise.loadOfExercise}</td>
                  <td>{exercise.tempo}</td>
                  <td>{exercise.rirRpe}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="7"><strong>Total Volume</strong></td>
                <td>{program.totalVolume}</td>
                <td colSpan="3"></td>
              </tr>
            </tbody>
          </Table>
        </div>
      ))}
    </Container>
  );
};

export default ApprovedPrograms;
