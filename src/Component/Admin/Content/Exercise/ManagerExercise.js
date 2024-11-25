import { useState } from "react";
import './ManagerExercise.scss';
import TableExercise from "./TableExercise";
import CreateExercise from "./CreateExercise";

const ManagerExercise = () => {
    const [showModalCreateExercise, setShowModalCreateExercise] = useState(false);
    const [refreshTable, setRefreshTable] = useState(false);

    const handleDataAdded = () => {
        setRefreshTable(!refreshTable); // Làm mới danh sách Exercise
    };

    return (
        <>
            <div className="title">
                Manager Exercise
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
