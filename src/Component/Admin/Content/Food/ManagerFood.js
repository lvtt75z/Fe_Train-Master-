import { useState } from "react";
import './ManagerFood.scss'
import TableFood from "./TableFood";
import CreateFood from "./CreateFood";

const ManagerFood = () =>{

    const [showModalCreateFood,setShowModelCreateFood] = useState(false);

    return(
        <>
            <div className="title">
                Manager Food
            </div>
            <br className="large-spacing" />
            <div className="food-content">
                <div className="btn-food">
                    <button onClick={() => setShowModelCreateFood(true)}>Add new Food</button>
                </div>
                <div className="spacing-large"></div>
                <div className="table-food-container">
                    <TableFood />
                </div>
                    <CreateFood 
                        show = {showModalCreateFood}
                        setShow = {setShowModelCreateFood}
                    />
            </div>
        </>
        
    );
}

export default ManagerFood