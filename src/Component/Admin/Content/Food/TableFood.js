// TableFood.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateFood from './UpdateFood';
import DeleteFood from './DeleteFood';

const TableFood = ({ refresh }) => {
    const [foods, setFoods] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedFoodId, setSelectedFoodId] = useState(null);

    const fetchFoods = async () => {
        try {
            const response = await axios.get('http://localhost:8080/food/getAllFood');
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

    // Hàm gọi sau khi xóa để cập nhật danh sách thực phẩm
    const handleDataDeleted = (deletedFoodId) => {
        setFoods(foods.filter((food) => food.foodId !== deletedFoodId));
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentFoods = foods.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(foods.length / itemsPerPage);

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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
                        </tr>
                    </thead>
                    <tbody>
                        {currentFoods.map((food) => (
                            <tr key={food.foodId}>
                                <th scope="row">{food.foodId}</th>
                                <td>{food.foodName}</td>
                                <td>{food.unit}</td>
                                <td>
                                    <button type="button" className="btn btn-secondary">View</button>
                                    <button onClick={() => handleEditClick(food.foodId)} type="button" className="btn btn-warning mx-3">Update</button>
                                    <DeleteFood foodId={food.foodId} onDelete={handleDataDeleted} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination-controls">
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
                <span> Page {currentPage} of {totalPages} </span>
                <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default TableFood;
