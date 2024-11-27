import { useState } from "react";
import './ManagerExercise.scss';
import TableExercise from "./TableExercise";
import CreateExercise from "./CreateExercise";
import img from "../../../../assets/image/gym.jpg"
import { vietnameseDate } from "../../Util/DateOfTime";

const ManagerExercise = () => {
    const [showModalCreateExercise, setShowModalCreateExercise] = useState(false);
    const [refreshTable, setRefreshTable] = useState(false);

    const handleDataAdded = () => {
        setRefreshTable(!refreshTable); // Làm mới danh sách Exercise
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4 bg-light p-4 rounded shadow">
                <div className="d-flex align-items-center">
                    <img src={img} className="me-3"/>
                    <h1 className="h4 fw-bold text-primary">
                        Manager Exercise
                    </h1>
                </div>
                <div className="ms-auto">
                    <p className="text-muted fs-4 text-end">{vietnameseDate}</p>
                </div>
            </div>
            <br className="large-spacing" />
            <div className="exercise-content">
                <div className="btn-exercise">
                    <button onClick={() => setShowModalCreateExercise(true)}>Add new Exercise</button>
                </div>
                <div className="spacing-large"></div>
                <div className="table-exercise-container">
                    <TableExercise refresh={refreshTable} />
                </div>
                <CreateExercise
                    show={showModalCreateExercise}
                    setShow={setShowModalCreateExercise}
                    onAdd={handleDataAdded}
                />
            </div>
        </>
    );
};

export default ManagerExercise;
