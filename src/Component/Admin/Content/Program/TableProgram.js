import { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateProgram from './UpdateProgram';
import DeleteProgram from './DeleteProgram';
import ReactPaginate from 'react-paginate'; // Import ReactPaginate
import './Program.scss';

const TableProgram = ({ refresh }) => {
  const [programs, setPrograms] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Zero-indexed
  const itemsPerPage = 4;
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        setError('Token not found');
        return;
      }
      const response = await axios.get('http://localhost:8080/programs/getAll', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPrograms(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching program data:', error);
      setError('Error fetching programs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, [refresh]);

  const handleDataUpdated = () => {
    fetchPrograms();
  };

  const handleDeleteSuccess = () => {
    fetchPrograms();
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPrograms = programs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(programs.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
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

      {loading && <div className="loading-message">Loading programs...</div>}
      {error && <div className="error-message">{error}</div>}

      {programs.length === 0 && !loading && !error ? (
        <div className="no-data-message">No programs available</div>
      ) : (
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Programs</h5>
          </div>
          <div className="card-body">
            <table className="table table-striped table-bordered">
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
                      <button type="button" className="btn btn-outline-primary">View</button>
                      <button onClick={() => handleEditClick(program.program_id)} className="btn btn-warning mx-3">Update</button>
                      <button onClick={() => handleDeleteClick(program.program_id)} className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageChange}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination justify-content-center mt-4"
        activeClassName="active"
      />
    </div>
  );
};

export default TableProgram;
