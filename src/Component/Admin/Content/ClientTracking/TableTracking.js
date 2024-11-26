import { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateTracking from './UpdateTracking';
import DeleteTracking from './DeleteTracking';
import ReactPaginate from 'react-paginate';
import './Tracking.scss';

const TableTracking = ({ refresh }) => {
  const [trackingData, setTrackingData] = useState([]);
  const [clientNames, setClientNames] = useState({}); // Lưu tên client
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTrackingId, setSelectedTrackingId] = useState(null);

  const token = localStorage.getItem('token');
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Lấy dữ liệu tracking từ API
  const fetchTrackingData = async () => {
    try {
      const response = await axiosInstance.get(
        'http://localhost:8080/clientstracking/getAllClientsTracking'
      );
      const trackingData = response.data;
      setTrackingData(trackingData);

      // Lấy danh sách ID client
      const clientIds = trackingData.map((item) => item.client?.clientId).filter(Boolean);
      const uniqueClientIds = [...new Set(clientIds)]; // Loại bỏ ID trùng lặp

      // Gọi API lấy tên client cho từng ID
      const clientNamePromises = uniqueClientIds.map((id) =>
        fetchClientName(id).then((name) => ({ id, name }))
      );

      const resolvedClientNames = await Promise.all(clientNamePromises);
      const clientNameMap = resolvedClientNames.reduce(
        (acc, { id, name }) => ({ ...acc, [id]: name }),
        {}
      );

      setClientNames(clientNameMap);
    } catch (error) {
      console.error('Error fetching tracking data:', error);
    }
  };

  // Lấy tên client từ API
  const fetchClientName = async (clientId) => {
    try {
      const response = await axiosInstance.get(
        `http://localhost:8080/client/firstName/${clientId}`
      );
      return response.data.firstName; // Giả sử API trả về tên client
    } catch (error) {
      console.error(`Error fetching client name for ID ${clientId}:`, error);
      return 'Unknown Client';
    }
  };

  useEffect(() => {
    fetchTrackingData();
  }, [refresh]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTrackingData = trackingData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(trackingData.length / itemsPerPage);

  const handleEditClick = (trackingId) => {
    setSelectedTrackingId(trackingId);
    setShowUpdateModal(true);
  };

  return (
    <div>
      <UpdateTracking
        show={showUpdateModal}
        setShow={setShowUpdateModal}
        trackingId={selectedTrackingId}
        onUpdate={fetchTrackingData}
      />

      <div className="table-container">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client Name</th>
              <th>Date</th>
              <th>Weight</th>
              <th>Sleep Hours</th>
              <th>Step Count</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTrackingData.map((tracking) => (
              <tr key={tracking.trackingId}>
                <td>{tracking.trackingId}</td>
                <td>
                  {clientNames[tracking.client?.clientId] || 'Loading...'}
                </td>
                <td>{tracking.date}</td>
                <td>{tracking.weight}</td>
                <td>{tracking.sleepHour}</td>
                <td>{tracking.stepCount}</td>
                <td>{tracking.notes}</td>
                <td>
                  <button
                    onClick={() => handleEditClick(tracking.trackingId)}
                    className="btn btn-warning mx-3"
                  >
                    Update
                  </button>
                  <DeleteTracking trackingId={tracking.trackingId} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageChange}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default TableTracking;
