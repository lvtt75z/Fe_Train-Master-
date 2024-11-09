import { useEffect, useState } from 'react';
import axios from 'axios';
import CreateFood from './CreateFood';

const TableFood = () => {
    const [foods, setFoods] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Hàm lấy dữ liệu từ backend
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
    }, []);

    // Hàm callback để refresh dữ liệu sau khi thêm
    const handleDataAdded = () => {
        fetchFoods();
        setCurrentPage(1); // Quay lại trang đầu sau khi thêm
    };  

    // Tính toán các chỉ số phân trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentFoods = foods.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(foods.length / itemsPerPage);

    // Điều khiển phân trang
    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div>
            {/* Truyền handleDataAdded vào CreateFood */}
            <CreateFood onAdd={handleDataAdded} />

            <div className="table-container">
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Food Name</th>
                            <th scope="col">Notes</th>
                            <th scope="col">Kcal</th>
                            <th scope="col">Protein</th>
                            <th scope="col">Carb</th>
                            <th scope="col">Fat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentFoods.map((food) => (
                            <tr key={food.foodId}>
                                <th scope="row">{food.foodId}</th>
                                <td>{food.foodName}</td>
                                <td>{food.notes}</td>
                                <td>{food.kcal}</td>
                                <td>{food.protein}</td>
                                <td>{food.carb}</td>
                                <td>{food.fat}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Điều khiển phân trang */}
            <div className="pagination-controls">
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
                <span> Page {currentPage} of {totalPages} </span>
                <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default TableFood;
