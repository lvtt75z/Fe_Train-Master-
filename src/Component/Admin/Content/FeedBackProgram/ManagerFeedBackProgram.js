import React, { useState, useEffect } from "react";
import axios from "axios";
import ProgramTable from "./ProgramTable";
import ProgramModal from "./ProgramModal";
import { toast } from "react-toastify";
import { vietnameseDate } from "../../Util/DateOfTime";
import img from "../../../../assets/image/gym.jpg"

const ManagerFeedBackProgram = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [approvalData, setApprovalData] = useState({
    fmName: "",
    feedback: "",
  });

  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Fetch programs
  useEffect(() => {
    axiosInstance
      .get("http://localhost:8080/programs/api/programs/pending")
      .then((response) => {
        setPrograms(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching programs!", error);
        setLoading(false);
      });
  }, []);

  // Open modal
  const openModal = (programID) => {
    setSelectedProgram(programID);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProgram(null);
    setApprovalData({ fmName: "", feedback: "" });
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApprovalData({ ...approvalData, [name]: value });
  };

  // Approve program
  const handleApprove = () => {
    axiosInstance
      .put(`http://localhost:8080/api/notifications/approve/program/${selectedProgram}`, approvalData)
      .then(() => {
        toast.success("Program approved successfully!");
        setPrograms((prevPrograms) =>
          prevPrograms.filter((program) => program[0] !== selectedProgram)
        );
        closeModal();
      })
      .catch((error) => {
        console.error("Error approving the program:", error);
        toast.error("An error occurred while approving the program.");
      });
  };

  // Reject program
  const handleReject = (programID) => {
    axiosInstance
      .delete(`http://localhost:8080/api/notifications/delete/program/${programID}`)
      .then(() => {
        toast.success("Program rejected successfully!");
        setPrograms((prevPrograms) =>
          prevPrograms.filter((program) => program[0] !== programID)
        );
      })
      .catch((error) => {
        console.error("Error rejecting the program:", error);
        toast.error("An error occurred while rejecting the program.");
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
      <ProgramTable
        programs={programs}
        onOpenModal={openModal}
        onReject={handleReject}
      />
      <ProgramModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleApprove}
        approvalData={approvalData}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default ManagerFeedBackProgram;
