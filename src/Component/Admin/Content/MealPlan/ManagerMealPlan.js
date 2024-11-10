import { useState } from "react";
import CreateMealPlan from "./CreateMealPlan";
import TableMealPlan from "./TableMealPlan";
import './style.scss'

const ManagerMealPlan = () => {
    const [showModalCreateMealPlan, setShowModelCreateMealPlan] = useState(false);
    const [refreshTable, setRefreshTable] = useState(false);

    const handleDataAdded = () => {
        setRefreshTable(!refreshTable); // Toggle the state to refresh TableFood
    };

    return (
        <>
            <div className="title">
                Manager Meal Plan
            </div>
            <br className="large-spacing" />
            <div className="food-content">
                <div className="btn-food">
                    <button onClick={() => setShowModelCreateMealPlan(true)}>Add new Meal Plan</button>
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
