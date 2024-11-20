import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  
import  {toast}  from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  
  
    const handleLogin = async (e) => {
      e.preventDefault();
      
      // Kiểm tra nếu các trường rỗng
      if (!username || !password) {
        toast.error('Vui lòng điền đầy đủ thông tin!');
        // alert('Vui lòng điền đầy đủ thông tin!');
        return;
      }
    
      try {
        // Gửi yêu cầu đăng nhập đến backend
        const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
    
        if (response.data.jwt) {
          // Lưu token vào localStorage hoặc sessionStorage để sử dụng cho các request sau
          localStorage.setItem('token', response.data.jwt);
    
          // Giải mã token để lấy role
          const decodedToken = jwtDecode(response.data.jwt);
          const userRole = decodedToken.role; // Lấy role từ payload trong token
    
          console.log(userRole);  // Kiểm tra xem role có đúng không
    
          // Điều hướng dựa trên role
          if (userRole === 'Owner' || userRole === 'Personal_Trainer' || userRole === 'Fitness_Manager') {
            toast.success('Đăng nhập thành công!');
            navigate('/Admins');  // Điều hướng đến trang admin nếu role là admin, personal_trainer, hoặc fitness_manager
          }
    
          // alert('Đăng nhập thành công!');
        }
      } catch (error) {
        toast.error('Đăng nhập thất bại, vui lòng kiểm tra lại tài khoản và mật khẩu!');
      }
    };
  
    return (
      <div className="login-form">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Tài khoản</label>
            <input
              type="text"
              placeholder="Nhập tài khoản"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"  // Autocomplete cho trường tài khoản
            />
          </div>
          <div>
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"  // Autocomplete cho trường mật khẩu
            />
          </div>
          <button type="submit">Đăng nhập</button>
        </form>
      </div>
    );
  };
export default LoginForm  