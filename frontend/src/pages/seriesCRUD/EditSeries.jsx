import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { GeneralContext } from '../../App';

const EditSeries = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { API } = useContext(GeneralContext);
    const { series } = location.state || {};

    const [formData, setFormData] = useState({
        title: series?.title || "",
        image: series?.image || "",
        genre: series?.genre || "",
        year: series?.year || ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            await axios.patch(`${API}/series/${series.id}`, formData);
            alert('Series updated successfully');
            navigate('/');
        } catch (e) {
            console.error('Error updating series:', e);
            alert('Failed to update series. Please try again later.');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6} lg={4}>
                    <Button variant="primary" onClick={() => navigate(-1)}>
                        Back
                    </Button>
                    <h1>Edit Series</h1>
                    <Form>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control type="text" name="image" value={formData.image} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Genre</Form.Label>
                            <Form.Control type="text" name="genre" value={formData.genre} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Year</Form.Label>
                            <Form.Control type="number" name="year" value={formData.year} onChange={handleChange} />
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

export default EditSeries;