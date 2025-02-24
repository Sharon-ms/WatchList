import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";
import { GeneralContext } from '../../App';
import axios from 'axios';


const CreateEpisode = (season) => {
    const navigate = useNavigate();
    const { API } = useContext(GeneralContext);
    const location = useLocation();
    const { seriesId, seasonNum } = location.state || {};
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        seriesId: seriesId,
        seasonNum: seasonNum,
        episodeNum: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.episodeNum ) {
            alert('Please fill in all fields, including the seasonNum, episodeNum, year, and seasons Amount.');
            return;
        }

        const dataToSubmit = {
            title: formData.title,
            SeriesId: formData.seriesId,
            seasonNum: formData.seasonNum,
            episodeNum: formData.episodeNum,
        };



        try {
            console.log('dataToSubmit:', dataToSubmit);

            const response = await axios.post(`${API}/episodes`, dataToSubmit,
                {
                    headers: { 'Accept': 'application/json' }
                }
            );

            console.log('Episode created successfully:', response.data);
            navigate(-1);
        } catch (error) {
            console.error('Error creating episode:', error.message);
            alert('Error creating episode, please try again.');
        }

    };


    return (
        <div>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6} lg={4}>

                        <h2>New Episode</h2>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formSeasonNum">
                                <Form.Label>seasonNum</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter seasonNum"
                                    name="seasonNum"
                                    onChange={handleChange}
                                    value={formData.seasonNum}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formYear">
                                <Form.Label>Episode number</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter episode number"
                                    name="episodeNum"
                                    onChange={handleChange}
                                    value={formData.episodeNum}
                                />
                            </Form.Group>

                            <Button variant="success" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CreateEpisode
