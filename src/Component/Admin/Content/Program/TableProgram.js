import { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateProgram from './UpdateProgram';
import DeleteProgram from './DeleteProgram';

const TableProgram = ({ refresh }) => {
    const [programs, setPrograms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProgramId, setSelectedProgramId] = useState(null);

    const fetchPrograms = async () => {
        try {
            // Lấy token từ localStorage
            const token = localStorage.getItem('token');
            if (!token) {
              console.error('Token not found');
              return;
            }
            // Gửi yêu cầu GET tới API với header Authorization chứa token
            const response = await axios.get('http://localhost:8080/programs/getAll', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
            setPrograms(response.data); // Cập nhật danh sách meal plans 
          } catch (error) {
            console.error('Error fetching program data:', error);
        }
    };

    useEffect(() => {
        fetchPrograms();
    }, [refresh]);

    const handleDataUpdated = () => {
        fetchPrograms(); // Reload programs when updated
    };

    const handleDeleteSuccess = () => {
        fetchPrograms(); // Refresh programs after deletion
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPrograms = programs.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(programs.length / itemsPerPage);

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleEditClick = (programId) => {
        setSelectedProgramId(programId);
        setShowUpdateModal(true);
    };

    const handleDeleteClick = (programId) => {
        setSelectedProgramId(programId);
        setShowDeleteModal(true);
    };

    return (
        <div className="table-container">
            <UpdateProgram
                show={showUpdateModal}
                setShow={setShowUpdateModal}
                programId={selectedProgramId}
                onUpdate={handleDataUpdated}
            />

            <DeleteProgram
                show={showDeleteModal}
                setShow={setShowDeleteModal}
                programId={selectedProgramId}
                onDelete={handleDeleteSuccess}
            />

            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Client Name</th>
                        <th scope="col">Day</th>
                        <th scope="col">Week</th>
                        <th scope="col">Exercises</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPrograms.map((program) => (
                        <tr key={program.program_id}>
                            <th scope="row">{program.program_id}</th>
                            <td>{program.clientName}</td>
                            <td>{program.day}</td>
                            <td>{program.week}</td>
                            <td>
                                <ul>
                                    {program.exercises.map((exercise, index) => {
                                        // Check if exercise_id exists and create a unique key
                                        const exerciseKey = exercise.exercise_id
                                            ? `${program.program_id}-${exercise.exercise_id}-${exercise.exerciseName}`
                                            : `${program.program_id}-${index}-${exercise.exerciseName}`;

                                        return (
                                            <li key={exerciseKey}>
                                                {exercise.exerciseName} - Sets: {exercise.setsStandard}, Reps: {exercise.repsStandard}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </td>
                            <td>
                                <button type="button" className="btn btn-secondary">View</button>
                                <button onClick={() => handleEditClick(program.program_id)} className="btn btn-warning mx-3">Update</button>
                                <button onClick={() => handleDeleteClick(program.program_id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination-controls">
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
                <span> Page {currentPage} of {totalPages} </span>
                <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default TableProgram;
