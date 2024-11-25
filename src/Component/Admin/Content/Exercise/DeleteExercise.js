import axios from 'axios';
import { toast } from 'react-toastify';

const DeleteExercise = ({ exerciseId, onDelete }) => {
    const token = localStorage.getItem("token");
    const axiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this exercise?")) {
            return;
        }

        try {
            await axiosInstance.delete(`http://localhost:8080/exercise/deleteExercise/${exerciseId}`);
            toast.success("Exercise deleted successfully!");
            onDelete(exerciseId); // Gọi callback để cập nhật danh sách bài tập
        } catch (error) {
            console.error("Error deleting exercise:", error);
            toast.error("Failed to delete exercise");
        }
    };

    return (
        <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
        >
            Delete
        </button>
    );
};

export default DeleteExercise;
