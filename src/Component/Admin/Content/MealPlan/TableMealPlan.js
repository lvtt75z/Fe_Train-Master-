import { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateMealPlan from './UpdateMealPlan';
import DeleteMealPlan from './DeleteMealPlan'; // Import DeleteMealPlan component

const TableMealPlan = ({ refresh }) => {
  const [mealPlans, setMealPlans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete modal
  const [selectedMealPlanId, setSelectedMealPlanId] = useState(null);

  const fetchMealPlans = async () => {
    try {
      // Lấy token từ localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
      // Gửi yêu cầu GET tới API với header Authorization chứa token
      const response = await axios.get('http://localhost:8080/mealPlans/getAll', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
      setMealPlans(response.data); // Cập nhật danh sách meal plans 
    } catch (error) {
      console.error('Error fetching meal plan data:', error);
      if (error.response) {
        console.error('Response Error:', error.response.data);
        console.error('Response Status:', error.response.status);
      } else if (error.request) {
        console.error('Request Error:', error.request);
      } else {
        console.error('General Error:', error.message);
      }
    }
  };

  useEffect(() => {
    fetchMealPlans();
  }, [refresh]);

  const handleDataUpdated = () => {
    fetchMealPlans(); // Làm mới dữ liệu khi có cập nhật
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMealPlans = mealPlans.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(mealPlans.length / itemsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleEditClick = (mealPlanId) => {
    setSelectedMealPlanId(mealPlanId);
    setShowUpdateModal(true);
  };

  const handleDeleteClick = (mealPlanId) => {
    setSelectedMealPlanId(mealPlanId);
    setShowDeleteModal(true); // Show delete modal
  };

  const handleDeleteSuccess = () => {
    fetchMealPlans(); // Refresh meal plans after deletion
  };

  return (
    <div className="table-container">
      {/* UpdateMealPlan Modal */}
      <UpdateMealPlan
        show={showUpdateModal}
        setShow={setShowUpdateModal}
        mealPlanId={selectedMealPlanId}
        onUpdate={handleDataUpdated}
      />

      {/* DeleteMealPlan Modal */}
      <DeleteMealPlan
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        mealPlanId={selectedMealPlanId}
        onDelete={handleDeleteSuccess}
      />

      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Client Name</th>
            <th scope="col">Training Status</th>
            <th scope="col">Day</th>
            <th scope="col">Session</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentMealPlans.map((mealPlan) => (
            <tr key={mealPlan.mealplan_id}>
              <th scope="row">{mealPlan.mealplan_id}</th>
              <td>{mealPlan.clientName}</td>
              <td>{mealPlan.trainingStatus ? "Active" : "Inactive"}</td>
              <td>{mealPlan.day}</td>
              <td>{mealPlan.session}</td>
              <td>
                <button type="button" className="btn btn-secondary">View</button>
                <button onClick={() => handleEditClick(mealPlan.mealplan_id)} className="btn btn-warning mx-3">Update</button>
                <button onClick={() => handleDeleteClick(mealPlan.mealplan_id)} className="btn btn-danger">Delete</button>
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

export default TableMealPlan;
