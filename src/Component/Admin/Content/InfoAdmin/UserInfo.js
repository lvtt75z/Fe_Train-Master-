import React, { useEffect, useState } from "react";
import PersonalTrainerInfo from './PersonalTrainerInfo'; 
import FitnessManagerInfo from './FitnessManagerInfo'; 

const UserInfo = () => {
    const [role, setRole] = useState(null); 

    useEffect(() => {
        // Lấy token từ localStorage
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            try {
                // Tách và giải mã phần payload của JWT
                const payload = storedToken.split('.')[1]; // Lấy phần payload
                const decodedPayload = JSON.parse(atob(payload)); // Giải mã Base64 và parse thành JSON

                setRole(decodedPayload.role); // Trích xuất `role` từ payload
            } catch (error) {
                console.error("Lỗi parse token:", error);
                setRole(null); // Đặt role về null nếu token không hợp lệ
            }
        } else {
            console.warn("Không tìm thấy token trong localStorage");
            setRole(null); // Không có token
        }
    }, []);

    if (role === null) {
        return <div>Đang tải...</div>;
    }

    return (
        <div>
            {role === 'Personal_Trainer' ? (
                <PersonalTrainerInfo />
            ) : role === 'Fitness_Manager' ? (
                <FitnessManagerInfo />
            ) : (
                <div>Role không hợp lệ</div> 
            )}
        </div>
    );
};

export default UserInfo;
