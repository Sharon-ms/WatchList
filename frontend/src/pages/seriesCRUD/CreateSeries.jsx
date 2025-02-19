import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


const CreateSeries = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({
                ...formData,
                [name]: files[0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('title', formData.title);
        formDataToSubmit.append('image', formData.image);

        console.log('Form submitted:', formDataToSubmit);
        navigate('/')
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
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    placeholder="Password"
                                    name="image"
                                    onChange={handleChange}
                                    accept="image/*" // Accept only images 
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
