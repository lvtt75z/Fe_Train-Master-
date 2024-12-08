import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import img from "../../assets/image/reset_password.jpg"; // Đảm bảo rằng đường dẫn là đúng
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu có khớp không
    if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp!");
      alert("Passwords do not match!")
      return;
    }

    // Kiểm tra mật khẩu có đủ mạnh không (ví dụ, ít nhất 6 ký tự)
    // if (password.length < 6) {
    //   toast.error("Mật khẩu phải có ít nhất 6 ký tự.");
    //   alert("Password must be at least 6 characters.")
    //   return;
    // }

    try {
      // Gửi yêu cầu reset mật khẩu
      const response = await axios.post("http://localhost:8080/api/auth/reset-password", {
        token: searchParams.get("token"), 
        newPassword: password,
      });

      // Kiểm tra kết quả trả về và thông báo
      if (response.status === 200) {
        toast.success("Password reset successful!");
        alert("Password reset successful");
        navigate("/Login")
      }
    } catch (error) {
      // Xử lý lỗi khi gửi yêu cầu
      if (error.response) {
        // Nếu có lỗi trả về từ server
        toast.error(error.response.data.message || "Đã xảy ra lỗi. Token không hợp lệ hoặc đã hết hạn.");
      } else {
        // Nếu lỗi không phải từ server (ví dụ, lỗi mạng)
        toast.error("Lỗi kết nối. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        background: `url(${img}) no-repeat center center fixed`, 
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div className="container mt-5">
        <h1 className="text-center mb-4 text-white">Đặt lại mật khẩu</h1>
        <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "400px", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "20px", borderRadius: "8px" }}>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label text-white">Mật khẩu mới:</label>
            <input
              type="password"
              id="newPassword"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label text-white">Xác nhận mật khẩu:</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Đặt lại mật khẩu</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
