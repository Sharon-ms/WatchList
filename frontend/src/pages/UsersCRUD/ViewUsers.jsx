import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GeneralContext } from '../../App';
import axios from 'axios';

const ViewUsers = () => {
    const navigate = useNavigate();
    const { API } = useContext(GeneralContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async (pageNumber = 0, pageSize = 10) => {
        try {
            const response = await axios.get(`${API}/users`, {
                params: { pageNumber, pageSize }
            });

            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };


    return (
        <div>
                        <Button variant="primary" onClick={() => navigate('/')}>
                            Back to Home
                        </Button>
            <h1>Users list</h1>
            <Button variant="success" onClick={() => navigate('/create_user')}>Add an user</Button>
            <Container>
                <Row>
                    {users.map((user) => (
                        <Col key={user.id} md={4}>
                            <div
                                onClick={() => navigate('/view_user', { state: { user } })}
                                style={{ cursor: 'pointer', padding: '20px' }}
                            >
                                <h2>{user.name}</h2>
                                <h4>{user.mail}</h4>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default ViewUsers;
