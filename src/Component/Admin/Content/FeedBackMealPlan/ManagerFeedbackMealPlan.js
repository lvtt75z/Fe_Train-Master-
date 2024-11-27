import React, { useState, useEffect } from "react";
import axios from "axios";
import MealPlanTable from "./MealPlanTable";
import MealPlanModal from "./MealPlanModal";
import { toast } from 'react-toastify';
import img from "../../../../assets/image/gym.jpg"
import { vietnameseDate } from "../../Util/DateOfTime";

const ManagerFeedBackMealPlan = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMealPlan, setSelectedMealPlan] = useState(null);
  const [approvalData, setApprovalData] = useState({
    fmName: "",
    feedback: "",
  });

  const token = localStorage.getItem('token');  // Replace 'token' with the key you're using to store the token

  // Set up axios headers with token
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`  // Include the token in the Authorization header
    }
  });

  // Fetch meal plans
  useEffect(() => {
    axiosInstance
      .get("http://localhost:8080/mealPlans/api/mealPlans/pending")
      .then((response) => {
        setMealPlans(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the meal plans!", error);
        setLoading(false);
      });
  }, []);

  // Open modal
  const openModal = (mealPlanID) => {
    setSelectedMealPlan(mealPlanID);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMealPlan(null);
    setApprovalData({ fmName: "", feedback: "" });
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApprovalData({ ...approvalData, [name]: value });
  };


  const handleApprove = () => {
    axiosInstance
      .put(`http://localhost:8080/api/notifications/approve/${selectedMealPlan}`, approvalData)
      .then(() => {
        toast.success('Meal Plan approved successfully!');

        // Xóa meal plan vừa được duyệt khỏi danh sách
        setMealPlans((prevMealPlans) =>
          prevMealPlans.filter((mealPlan) => mealPlan[0] !== selectedMealPlan)
        );

        closeModal();
      })
      .catch((error) => {
        console.error("Error approving the meal plan:", error);
        toast.error('An error occurred while approving the meal plan.');
      });
  };

  const handleReject = (mealPlanID) => {
    axiosInstance
      .delete(`http://localhost:8080/api/notifications/delete/${mealPlanID}`)
      .then(() => {
        toast.success('Meal Plan rejected successfully!');

        // Cập nhật danh sách mealPlans để xóa Meal Plan vừa bị từ chối
        setMealPlans((prevMealPlans) =>
          prevMealPlans.filter((mealPlan) => mealPlan[0] !== mealPlanID)
        );
      })
      .catch((error) => {
        console.error("Error rejecting the meal plan:", error);
        toast.error('An error occurred while rejecting the meal plan.');
      });
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 bg-light p-4 rounded shadow">
        <div className="d-flex align-items-center">
          <img src={img} className="me-3" />
          <h1 className="h4 fw-bold text-primary">
            Manager Feedback MealPlan
          </h1>
        </div>
        <div className="ms-auto">
          <p className="text-muted fs-4 text-end">{vietnameseDate}</p>
        </div>
      </div>
      <MealPlanTable mealPlans={mealPlans} onOpenModal={openModal} onReject={handleReject} />
      <MealPlanModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleApprove}
        approvalData={approvalData}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default ManagerFeedBackMealPlan;
