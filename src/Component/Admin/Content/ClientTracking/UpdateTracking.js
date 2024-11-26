import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateTracking({ show, setShow, trackingId, onUpdate }) {
  const [trackingData, setTrackingData] = useState({
    clientId: '',
    date: '',
    weight: '',
    sleepHour: '',
    stepCount: '',
    notes: '',
  });
  const [loading, setLoading] = useState(true); // Theo dõi trạng thái tải

  const token = localStorage.getItem('token');
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    if (trackingId) {
      fetchTrackingData();
    }
  }, [trackingId]);

  // Lấy dữ liệu tracking khi component được render hoặc khi trackingId thay đổi
  const fetchTrackingData = async () => {
    try {
      setLoading(true); // Đặt trạng thái loading là true khi đang lấy dữ liệu
      const response = await axiosInstance.get(`http://localhost:8080/clientstracking/${trackingId}`);
      const data = response.data;
      setTrackingData({
        clientId: data.client_id,
        date: data.date,
        weight: data.weight,
        sleepHour: data.sleep_hour,
        stepCount: data.step_count,
        notes: data.notes,
      });
      setLoading(false); // Đặt trạng thái loading là false khi dữ liệu đã được lấy
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu tracking:', error);
      toast.error('Lỗi khi lấy dữ liệu tracking');
      setLoading(false); // Dừng trạng thái loading khi có lỗi
    }
  };

  const handleSaveChanges = async () => {
    const updatedData = {
      client_id: trackingData.clientId,
      date: trackingData.date,
      weight: trackingData.weight,
      sleep_hour: trackingData.sleepHour,
      step_count: trackingData.stepCount,
      notes: trackingData.notes,
    };

    try {
      await axiosInstance.put(`http://localhost:8080/tracking/${trackingId}`, updatedData);
      toast.success('Cập nhật tracking thành công');
      setShow(false); // Đóng modal
      onUpdate(); // Làm mới dữ liệu của component cha
    } catch (error) {
      console.error('Lỗi khi cập nhật dữ liệu tracking:', error);
      toast.error('Cập nhật tracking thất bại');
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Hiển thị khi đang tải dữ liệu
  }

  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Update Tracking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-12">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={trackingData.date}
              onChange={(e) => setTrackingData({ ...trackingData, date: e.target.value })}
            />
          </div>
          <div className="col-md-12">
            <label className="form-label">Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              className="form-control"
              value={trackingData.weight}
              onChange={(e) => setTrackingData({ ...trackingData, weight: e.target.value })}
            />
          </div>
          <div className="col-md-12">
            <label className="form-label">Sleep Hours</label>
            <input
              type="number"
              step="0.1"
              className="form-control"
              value={trackingData.sleepHour}
              onChange={(e) => setTrackingData({ ...trackingData, sleepHour: e.target.value })}
            />
          </div>
          <div className="col-md-12">
            <label className="form-label">Step Count</label>
            <input
              type="number"
              className="form-control"
              value={trackingData.stepCount}
              onChange={(e) => setTrackingData({ ...trackingData, stepCount: e.target.value })}
            />
          </div>
          <div className="col-md-12">
            <label className="form-label">Notes</label>
            <textarea
              className="form-control"
              value={trackingData.notes}
              onChange={(e) => setTrackingData({ ...trackingData, notes: e.target.value })}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateTracking;
