import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { GeneralContext } from '../../App';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";


const AddEpisodes = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { API } = useContext(GeneralContext);
    const { series } = location.state || {};
    const seriesId = series?.id;
    // console.log({ series });


    const [formData, setFormData] = useState({
        seasonNum: '',
        episodesAmount: '',
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
        if (!formData.seasonNum || !formData.episodesAmount) {
            alert('Please fill in all fields.');
            return;
        }

        const dataToSubmit = {
            title: '',
            seriesId: seriesId,
            seasonNum: formData.seasonNum,
            episodesAmount: formData.episodesAmount,
        };


        try {
            console.log('dataToSubmit:', dataToSubmit);

            const response = await axios.post(`${API}/episodes`, dataToSubmit,
                {
                    headers: { 'Accept': 'application/json' }
                }
            );

            console.log('Episodes added successfully:', response.data);
            // navigate(-1);
        } catch (error) {
            console.error('Error adding episodes:', error.message);
            alert('Error adding episodes, please try again.');
        }


    };


    return (
        <div>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6} lg={4}>

                        <h2>Add Episodes</h2>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formSeasons">
                                <Form.Label>Seasons number</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Season Number"
                                    name="seasonNum"
                                    value={formData.seasonNum}
                                    onChange={handleChange}
                                />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEpisodes">
                                <Form.Label>Episodes Amount</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Episode Amount"
                                    name="episodesAmount"
                                    value={formData.episodesAmount}
                                    onChange={handleChange}
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

export default AddEpisodes
