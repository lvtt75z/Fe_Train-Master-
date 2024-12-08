import { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.scss';

function UpdateMealPlan({ show, setShow, mealPlanId, onUpdate }) {
  const handleClose = () => setShow(false);

  const [mealPlan, setMealPlan] = useState({
    clientName: '',
    trainingStatus: false,
    day: '',
    session: '',
    selectedFoodItems: []  // Ensure it's initialized as an empty array
  });

  // Get the token from localStorage
  const token = localStorage.getItem('token');  // Replace 'token' with the key you're using to store the token

  // Set up axios headers with token
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`  // Include the token in the Authorization header
    }
  });

  // Fetch meal plan data when the modal is shown
  useEffect(() => {
    if (mealPlanId) {
      axiosInstance.get(`http://localhost:8080/mealPlans/get/${mealPlanId}`)
        .then((response) => {
          setMealPlan({
            clientName: response.data.clientName,
            trainingStatus: response.data.trainingStatus,
            day: response.data.day,
            session: response.data.session,
            selectedFoodItems: response.data.foodItems || []  // Check if 'foodItems' is the correct key
          });          
        })
        .catch((error) => {
          console.error('Error fetching meal plan data:', error);
          toast.error('Failed to fetch meal plan data');
        });
    }
  }, [mealPlanId]);

  // Handle updating the meal plan
  const handleUpdate = async () => {
    const updatedMealPlan = {
      clientName: mealPlan.clientName,
      trainingStatus: mealPlan.trainingStatus,
      day: mealPlan.day,
      session: mealPlan.session,
      selectedFoodItems: mealPlan.selectedFoodItems
    };

    try {
      await axiosInstance.put(`http://localhost:8080/mealPlans/update/${mealPlanId}`, updatedMealPlan);
      toast.success('Meal plan updated successfully!');
      handleClose();
      onUpdate();  // Refresh the data after updating
    } catch (error) {
      console.error('Error updating meal plan:', error);
      toast.error('Failed to update meal plan');
    }
  };

  // Handle input change for food items
  const handleFoodChange = (index, field, value) => {
    const updatedFoodItems = [...mealPlan.selectedFoodItems];
    updatedFoodItems[index][field] = value;
    setMealPlan({ ...mealPlan, selectedFoodItems: updatedFoodItems });
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Update Meal Plan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label className="form-label">Client Name</label>
            <input type="text" className="form-control" value={mealPlan.clientName} disabled />
          </div>
          <div className="mb-3">
            <label className="form-label">Training Status</label>
            <input
              type="checkbox"
              checked={mealPlan.trainingStatus}
              onChange={(e) => setMealPlan({ ...mealPlan, trainingStatus: e.target.checked })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Day</label>
            <input
              type="text"
              className="form-control"
              value={mealPlan.day}
              onChange={(e) => setMealPlan({ ...mealPlan, day: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Session</label>
            <input
              type="text"
              className="form-control"
              value={mealPlan.session}
              onChange={(e) => setMealPlan({ ...mealPlan, session: e.target.value })}
            />
          </div>

          <h5>Food Items</h5>
          {mealPlan.selectedFoodItems && mealPlan.selectedFoodItems.length > 0 ? (
            mealPlan.selectedFoodItems.map((selectedFoodItems, index) => (
              <div key={index} className="food-item">
                <div>
                  <label className="form-label">Food Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedFoodItems.foodName}
                    onChange={(e) => handleFoodChange(index, 'foodName', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Protein</label>
                  <input
                    type="number"
                    className="form-control"
                    value={selectedFoodItems.protein}
                    onChange={(e) => handleFoodChange(index, 'protein', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Fat</label>
                  <input
                    type="number"
                    className="form-control"
                    value={selectedFoodItems.fat}
                    onChange={(e) => handleFoodChange(index, 'fat', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Carb</label>
                  <input
                    type="number"
                    className="form-control"
                    value={selectedFoodItems.carb}
                    onChange={(e) => handleFoodChange(index, 'carb', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Kcals</label>
                  <input
                    type="number"
                    className="form-control"
                    value={selectedFoodItems.kcals}
                  />
                </div>
                <div>
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    value={selectedFoodItems.amount}
                    onChange={(e) => handleFoodChange(index, 'amount', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Note</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedFoodItems.note}
                    onChange={(e) => handleFoodChange(index, 'note', e.target.value)}
                  />
                </div>

                {/* Add horizontal line between food items */}
                <hr />
              </div>
            ))
          ) : (
            <p>No food items available</p>
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

export default UpdateMealPlan;
