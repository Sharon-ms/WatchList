import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { GeneralContext } from '../../App';

const EditEpisode = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { API } = useContext(GeneralContext);
    const { episode } = location.state || {};

    const [formData, setFormData] = useState({
        title: episode?.title || "",
        seasonNum: episode?.seasonNum || "",
        episodeNum: episode?.episodeNum || ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            await axios.patch(`${API}/episodes/${episode.id}`, formData);
            alert('Episode updated successfully');
            navigate(-1);
        } catch (e) {
            console.error('Error updating episode:', e);
            alert('Failed to update episode. Please try again later.');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6} lg={4}>
                    <Button variant="primary" onClick={() => navigate(-1)}>
                        Back
                    </Button>
                    <h1>Edit Episode</h1>
                    <Form>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Season number</Form.Label>
                            <Form.Control type="number" name="seasonNum" value={formData.seasonNum} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Episode number</Form.Label>
                            <Form.Control type="number" name="episodeNum" value={formData.episodeNum} onChange={handleChange} />
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

export default EditEpisode;