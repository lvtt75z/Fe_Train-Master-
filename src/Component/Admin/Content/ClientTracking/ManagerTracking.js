import { useState } from "react";
import './Tracking.scss';
import TableTracking from "./TableTracking";
import CreateTracking from "./CreateTracking";
import { vietnameseDate } from "../../Util/DateOfTime";
import img from "../../../../assets/image/gym.jpg"

const ManagerTracking = () => {
    const [showModalCreateTracking, setShowModalCreateTracking] = useState(false);
    const [refreshTable, setRefreshTable] = useState(false);

    const handleDataAdded = () => {
        setRefreshTable(!refreshTable); // Toggle the state to refresh TableTracking
    };

    return (
        <>
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
            <br className="large-spacing" />
            <div className="tracking-content">
                <div className="btn-tracking">
                    <button onClick={() => setShowModalCreateTracking(true)}>Add New Tracking</button>
                </div>
                <div className="spacing-large"></div>
                <div className="table-tracking-container">
                    <TableTracking refresh={refreshTable} />
                </div>
                <CreateTracking
                    show={showModalCreateTracking}
                    setShow={setShowModalCreateTracking}
                    onAdd={handleDataAdded}
                />
            </div>
        </>
    );
};

export default ManagerTracking;
