// DeleteFood.js
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DeleteFood = ({ foodId, onDelete }) => {
    const token = localStorage.getItem("token");
    const axiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`http://localhost:8080/food/${foodId}`);
            toast.success('Food item deleted successfully!');
            onDelete(foodId); // Gọi callback để cập nhật danh sách
        } catch (error) {
            console.error('Error deleting food:', error);
            toast.error('Failed to delete food item');
        }
    };

    return (
        <button onClick={handleDelete} type="button" className="btn btn-danger">
            Delete
        </button>
    );
};

export default DeleteFood;
