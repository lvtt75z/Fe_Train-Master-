import { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateFood from './UpdateFood';
import DeleteFood from './DeleteFood';
import ReactPaginate from 'react-paginate'; // Import ReactPaginate
import './ManagerFood.scss'; // Ensure styles for ReactPaginate are consistent
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

const TableFood = ({ refresh }) => {
  const [foods, setFoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Zero-indexed for ReactPaginate
  const itemsPerPage = 4;
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState(null);

  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fetchFoods = async () => {
    try {
      const response = await axiosInstance.get('http://localhost:8080/food/getAllFood');
      setFoods(response.data);
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [refresh]);

  const handleDataAdded = () => {
    fetchFoods();
  };

  const handleDataDeleted = (deletedFoodId) => {
    setFoods(foods.filter((food) => food.foodId !== deletedFoodId));
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFoods = foods.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(foods.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected); // Update current page
  };

  const handleEditClick = (foodId) => {
    setSelectedFoodId(foodId);
    setShowUpdateModal(true);
  };

  return (
    <div>
      <UpdateFood
        show={showUpdateModal}
        setShow={setShowUpdateModal}
        foodId={selectedFoodId}
        onUpdate={handleDataAdded}
      />

      <div className="table-container">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Food Name</th>
              <th scope="col">Unit</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentFoods.map((food) => (
              <tr key={food.foodId}>
                <th scope="row">{food.foodId}</th>
                <td>{food.foodName}</td>
                <td>{food.unit}</td>
                <td>
                  <button type="button" className="btn btn-secondary">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button
                    onClick={() => handleEditClick(food.foodId)}
                    type="button"
                    className="btn btn-warning mx-3"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <DeleteFood foodId={food.foodId} onDelete={handleDataDeleted}>
                    <button type="button" className="btn btn-danger">
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </DeleteFood>

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

export default TableFood;
