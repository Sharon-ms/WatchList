import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { GeneralContext } from '../../App';
import axios from 'axios';


const CreateSeries = () => {
    const navigate = useNavigate();
    const { API } = useContext(GeneralContext);
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        image: '',
        genre: '',
        year: '',
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

        if (!formData.title || !formData.image || !formData.genre || !formData.year) {
            alert('Please fill in all fields, including the image, genre, and year.');
            return;
        }

        const dataToSubmit = {
            title: formData.title,
            image: formData.image,
            genre: formData.genre,
            year: formData.year
        };



        try {
            const response = await axios.post(`${API}/series`, dataToSubmit,
                {
                    headers: { 'Accept': 'application/json' }
                }
            );

            console.log('Series created successfully:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Error creating series:', error);
            alert('Error creating series, please try again.');
        }

    };


    return (
        <div>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6} lg={4}>

                        <h2>New Series</h2>

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

                            <Form.Group className="mb-3" controlId="formImage">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter image URL"
                                    name="image"
                                    onChange={handleChange}
                                    value={formData.image}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGenre">
                                <Form.Label>Genre</Form.Label>
                                <Form.Select name="genre" value={formData.genre} onChange={handleChange}>
                                    <option value="">Select genre</option>
                                    <option value="Action">Action</option>
                                    <option value="Drama">Drama</option>
                                    <option value="Comedy">Comedy</option>
                                    <option value="Crime">Crime</option>
                                    <option value="Fantasy">Fantasy</option>
                                    <option value="Horror">Horror</option>
                                    <option value="Mystery">Mystery</option>
                                    <option value="Romance">Romance</option>
                                    <option value="Science Fiction">Science Fiction</option>
                                    <option value="Thriller">Thriller</option>
                                    <option value="Western">Western</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formYear">
                                <Form.Label>Year</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter year"
                                    name="year"
                                    onChange={handleChange}
                                    value={formData.year}
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

export default CreateSeries
