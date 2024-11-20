import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './PersonalTrainerInfo.scss'; // Import SCSS module

const PersonalTrainerInfo = () => {
    const [trainer, setTrainer] = useState(null);

    useEffect(() => {
        const fetchTrainerInfo = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8080/api/auth/PersonalTrainer/info", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setTrainer(response.data); 
            } catch (error) {
                console.error("Không thể lấy thông tin Personal Trainer", error);
            }
        };

        fetchTrainerInfo();
    }, []);

    if (!trainer) return <div>Đang tải...</div>; 

    return (
        <div className={styles.container}> {/* Áp dụng class từ SCSS module */}
            <h1 className={styles.title}>Thông tin</h1>
            <p className={styles.info}><strong>Họ và tên:</strong> {trainer.firstName} {trainer.lastName}</p>
            <p className={styles.info}><strong>Giới tính:</strong> {trainer.gender}</p>
            <p className={styles.info}><strong>Ngày sinh:</strong> {trainer.birthDate}</p>
            <p className={styles.info}><strong>Số điện thoại:</strong> {trainer.phone}</p>
            <p className={styles.info}><strong>Địa chỉ:</strong> {trainer.address}</p>
            <p className={styles.info}><strong>Email:</strong> {trainer.email}</p>
            <p className={styles.info}><strong>Bằng cấp:</strong> {trainer.degree}</p>
        </div>
    );
};

export default PersonalTrainerInfo;
