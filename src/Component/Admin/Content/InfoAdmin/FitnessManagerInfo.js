import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Container, Row, Col } from "react-bootstrap"; // Using Bootstrap for styling
import { toast } from 'react-toastify';

const FitnessManagerInfo = () => {
    const [fitnessManager, setFitnessManager] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        birthDate: "",
        phone: "",
        address: "",
        email: ""
    });

    useEffect(() => {
        const fetchFitnessManagerInfo = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8080/api/auth/FitnessManager/info", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setFitnessManager(response.data);
                setFormData(response.data); // Initialize formData with fetched data
            } catch (error) {
                console.error("Không thể lấy thông tin Fitness Manager", error);
            }
        };

        fetchFitnessManagerInfo();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.put("http://localhost:8080/api/auth/FitnessManager/update", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setFitnessManager(formData);
            setIsEditing(false);
            toast.success('Cập nhật thông tin thành công!');
        } catch (error) {
            console.error("Không thể cập nhật thông tin Fitness Manager", error);
            toast.error('Cập nhật thông tin thất bại!');
        }
    };

    if (!fitnessManager) return <div>Đang tải...</div>;

    return (
        <div className="">
            <h1 className="">Thông tin Fitness Manager</h1>
            {isEditing ? (
                <Container>
                    <Row className="mb-3">
                        <Col xs={12} sm={3}>
                            <label>Họ:</label>
                        </Col>
                        <Col xs={12} sm={9}>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={12} sm={3}>
                            <label>Tên:</label>
                        </Col>
                        <Col xs={12} sm={9}>
                            <Form.Control
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={12} sm={3}>
                            <label>Giới tính:</label>
                        </Col>
                        <Col xs={12} sm={9}>
                            <Form.Select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </Form.Select>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={12} sm={3}>
                            <label>Ngày sinh:</label>
                        </Col>
                        <Col xs={12} sm={9}>
                            <Form.Control
                                type="date"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={12} sm={3}>
                            <label>Số điện thoại:</label>
                        </Col>
                        <Col xs={12} sm={9}>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={12} sm={3}>
                            <label>Địa chỉ:</label>
                        </Col>
                        <Col xs={12} sm={9}>
                            <Form.Control
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={12} sm={3}>
                            <label>Email:</label>
                        </Col>
                        <Col xs={12} sm={9}>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="success" onClick={handleSave}>Lưu</Button>
                            <Button variant="danger" className="ms-2" onClick={() => setIsEditing(false)}>Hủy</Button>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <div>
                    <p><strong>Họ và tên:</strong> {fitnessManager.firstName} {fitnessManager.lastName}</p>
                    <p><strong>Giới tính:</strong> {fitnessManager.gender}</p>
                    <p><strong>Ngày sinh:</strong> {fitnessManager.birthDate}</p>
                    <p><strong>Số điện thoại:</strong> {fitnessManager.phone}</p>
                    <p><strong>Địa chỉ:</strong> {fitnessManager.address}</p>
                    <p><strong>Email:</strong> {fitnessManager.email}</p>
                    <Button variant="primary" onClick={() => setIsEditing(true)}>Chỉnh sửa</Button>
                </div>
            )}
        </div>
    );
};

export default FitnessManagerInfo;
