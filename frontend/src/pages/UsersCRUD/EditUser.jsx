import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { GeneralContext } from '../../App';

const EditUser = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { API } = useContext(GeneralContext);
    const { user } = location.state || {};

    const [formData, setFormData] = useState({
        name: user?.name || "",
        mail: user?.mail || ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            await axios.patch(`${API}/users/${user.id}`, formData);
            alert('User updated successfully');
            navigate('/view_users');
        } catch (e) {
            console.error('Error updating user:', e);
            alert('Failed to update user. Please try again later.');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6} lg={4}>
                    <Button variant="primary" onClick={() => navigate(-1)}>
                        Back
                    </Button>
                    <h1>Edit User</h1>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Mail</Form.Label>
                            <Form.Control type="text" name="mail" value={formData.mail} onChange={handleChange} />
                        </Form.Group>

                        <Button variant="success" onClick={handleSave} className="mt-3">
                            Save Changes
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default EditUser;