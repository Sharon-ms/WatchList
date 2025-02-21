import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { GeneralContext } from '../../App';
import axios from 'axios';


const CreateUser = () => {
    const navigate = useNavigate();
    const { API } = useContext(GeneralContext);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        mail: '',
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

        if (!formData.name || !formData.mail) {
            alert('Please fill in all fields, including the name and mail.');
            return;
        }

        const dataToSubmit = {
            name: formData.name,
            mail: formData.mail,
        };



        try {
            const response = await axios.post(`${API}/users`, dataToSubmit,
                {
                    headers: { 'Accept': 'application/json' }
                }
            );

            console.log('User created successfully:', response.data);
            navigate('/view_users');
        } catch (error) {
            console.error('Error creating user:', error.message);
            alert('Error creating user, please try again.');
        }

    };


    return (
        <div>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6} lg={4}>

                        <h2>New User</h2>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formMail">
                                <Form.Label>Mail</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter mail"
                                    name="mail"
                                    onChange={handleChange}
                                    value={formData.mail}
                                />
                            </Form.Group>

                            <Button variant="success" type="submit">
                                Submit
                            </Button>
                            <Button variant="primary" onClick={() => navigate('/view_users')}>
                                cancel
                            </Button>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CreateUser
