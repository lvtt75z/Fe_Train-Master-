import { useState } from "react";
import './ManagerFood.scss'
import TableFood from "./TableFood";
import CreateFood from "./CreateFood";
import img from "../../../../assets/image/gym.jpg"
import { vietnameseDate } from "../../Util/DateOfTime";

const ManagerFood = () => {
    const [showModalCreateFood, setShowModelCreateFood] = useState(false);
    const [refreshTable, setRefreshTable] = useState(false);

    const handleDataAdded = () => {
        setRefreshTable(!refreshTable); // Toggle the state to refresh TableFood
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4 bg-light p-4 rounded shadow">
                <div className="d-flex align-items-center">
                    <img src={img} className="me-3" />
                    <h1 className="h4 fw-bold text-primary">
                        Manager Food
                    </h1>
                </div>
                <div className="ms-auto">
                    <p className="text-muted fs-4 text-end">{vietnameseDate}</p>
                </div>
            </div>
            <br className="large-spacing" />
            <div className="food-content">
                <div className="btn-food">
                    <button onClick={() => setShowModelCreateFood(true)}>Add new Food</button>
                </div>
                <div className="spacing-large"></div>
                <div className="table-food-container">
                    <TableFood refresh={refreshTable} />
                </div>
                <CreateFood
                    show={showModalCreateFood}
                    setShow={setShowModelCreateFood}
                    onAdd={handleDataAdded}
                />
            </div>
        </>
    );
};

export default ManagerFood;
