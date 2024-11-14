import { useState } from "react";
import CreateProgram from "./CreateProgram";  // Adjust import as per your file structure
import TableProgram from "./TableProgram";
import './Program.scss';

const ManagerProgram = () => {
    const [showModalCreateProgram, setShowModalCreateProgram] = useState(false);
    const [refreshTable, setRefreshTable] = useState(false);

    const handleDataAdded = () => {
        setRefreshTable(!refreshTable); // Toggle the state to refresh TableProgram
    };

    return (
        <>
            <div className="program-title">
                Manager Program
            </div>
            <br className="program-large-spacing" />
            <div className="program-content">
                <div className="btn-program">
                    <button onClick={() => setShowModalCreateProgram(true)}>Add new Program</button>
                </div>
                <div className="program-spacing-large"></div>
                <div className="table-program-container">
                    <TableProgram refresh={refreshTable} />
                </div>
                <CreateProgram
                    show={showModalCreateProgram}
                    setShow={setShowModalCreateProgram}
                    onAdd={handleDataAdded}
                />
            </div>
        </>
    );
};

export default ManagerProgram;
