import { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateExercise from './UpdateExercise';
import DeleteExercise from './DeleteExercise';
import ReactPaginate from 'react-paginate';
import './ManagerExercise.scss'; // Đảm bảo có styles riêng
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const TableExercise = ({ refresh }) => {
  const [exercises, setExercises] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedExerciseId, setSelectedExerciseId] = useState(null);

  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fetchExercises = async () => {
    try {
      const response = await axiosInstance.get('http://localhost:8080/exercise/getAllExercise');
      setExercises(response.data);
    } catch (error) {
      console.error('Error fetching exercise data:', error);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, [refresh]);

  const handleDataAdded = () => {
    fetchExercises();
  };

  const handleDataDeleted = (deletedExerciseId) => {
    setExercises(exercises.filter((exercise) => exercise.exercise_id !== deletedExerciseId));
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExercises = exercises.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(exercises.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleEditClick = (exerciseId) => {
    setSelectedExerciseId(exerciseId);
    setShowUpdateModal(true);
  };

  return (
    <div>
      <UpdateExercise
        show={showUpdateModal}
        setShow={setShowUpdateModal}
        exerciseId={selectedExerciseId}
        onUpdate={handleDataAdded}
      />

      <div className="table-container">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Exercise Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentExercises.map((exercise) => (
              <tr key={exercise.exerciseId}>
                <td>{exercise.exerciseId}</td>
                <td>{exercise.exercisename}</td>
                <td>
                  <button type="button" className="btn btn-secondary">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button
                    onClick={() => handleEditClick(exercise.exercise_id)}
                    type="button"
                    className="btn btn-warning mx-3"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <DeleteExercise
                    exerciseId={exercise.exercise_id}
                    onDelete={handleDataDeleted}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </DeleteExercise>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default TableExercise;
