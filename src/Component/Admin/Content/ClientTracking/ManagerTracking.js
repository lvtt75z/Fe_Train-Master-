import { useState } from "react";
import './Tracking.scss';
import TableTracking from "./TableTracking";
import CreateTracking from "./CreateTracking";

const ManagerTracking = () => {
    const [showModalCreateTracking, setShowModalCreateTracking] = useState(false);
    const [refreshTable, setRefreshTable] = useState(false);

    const handleDataAdded = () => {
        setRefreshTable(!refreshTable); // Toggle the state to refresh TableTracking
    };

    return (
        <>
            <div className="title">
                Manager Tracking
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
