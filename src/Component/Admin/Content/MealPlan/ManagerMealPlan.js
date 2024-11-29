import { useState } from "react";
import CreateMealPlan from "./CreateMealPlan";
import TableMealPlan from "./TableMealPlan";
import './style.scss'
import img from "../../../../assets/image/gym.jpg"
import { vietnameseDate } from "../../Util/DateOfTime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const ManagerMealPlan = () => {
    const [showModalCreateMealPlan, setShowModelCreateMealPlan] = useState(false);
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
                        Manager Meal Plan
                    </h1>
                </div>
                <div className="ms-auto">
                    <p className="text-muted fs-4 text-end">{vietnameseDate}</p>
                </div>
                <p className="text-muted fs-5"></p>
            </div>
            <br className="large-spacing" />
            <div className="food-content">
                <div className="btn-food">
                    <button
                        onClick={() => setShowModelCreateMealPlan(true)}
                        className="btn btn-primary"
                    >
                        <FontAwesomeIcon icon={faPlus} /> Add Meal Plan
                    </button>
                </div>
                <div className="spacing-large"></div>
                <div className="table-food-container">
                    <TableMealPlan refresh={refreshTable} />
                </div>
                <CreateMealPlan
                    show={showModalCreateMealPlan}
                    setShow={setShowModelCreateMealPlan}
                    onAdd={handleDataAdded}
                />
            </div>
        </>
    );
};

export default ManagerMealPlan;
