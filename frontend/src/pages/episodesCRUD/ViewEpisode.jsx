
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { GeneralContext } from '../../App';

const ViewEpisode = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { API } = useContext(GeneralContext);
    const { episodeId, series } = location.state || {};
    const [users, setUsers] = useState([]);
    const [watchingUsers, setWatchingUsers] = useState([]);
    const [episode, setEpisode] = useState({});

    const [formData, setFormData] = useState({
        userId: '',
        episodeId: episodeId || '',
    });

    useEffect(() => {
        fetchEpisode();
        fetchUsers();
    }, []);

    useEffect(() => {
        if (episode?.id) {
            setFormData((prev) => ({ ...prev, episodeId: episode.id }));
            fetchWatchingUsers();
        }
    }, [episode]);

    const fetchEpisode = async () => {
        try {
            const response = await axios.get(`${API}/episodes/${episodeId}`);
            setEpisode(response.data);
        } catch (error) {
            console.error('Error fetching episode:', error);
        }
    };

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

    const fetchWatchingUsers = async () => {
        try {
            const response = await axios.get(`${API}/episodes/${episode?.id}/users`);
            setWatchingUsers(response.data);
        } catch (error) {
            console.error('Error fetching watching users:', error);
        }
    };

    const handleDeleteEpisode = async () => {
        if (window.confirm('Are you sure you want to delete this episode?')) {
            try {
                await axios.delete(`${API}/episodes/${episode?.id}`);
                alert('Episode deleted successfully');
                navigate('/view_series', { state: { series, seasonSelected: episode?.seasonNum } });
            } catch (error) {
                console.error('Error deleting episode:', error);
                alert('Failed to delete episode. Please try again later.');
            }
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Sending data:", formData);
        try {
            await axios.post(`${API}/episodes/addWatch`, formData, {
                headers: { 'Accept': 'application/json' },
            });
            fetchWatchingUsers();
        } catch (error) {
            console.error('Error adding watch:', error.response?.data || error.message);
            alert('Error adding watch, please try again.');
        }
    };

    return (
        <Container className="mt-4">
            <Button variant="primary" onClick={() => navigate('/view_series', { state: { series, seasonSelected: episode?.seasonNum } })}>
                Back to Episodes List
            </Button>

            <Card className="mt-3 p-4 shadow-sm">
                <Card.Body>
                    <Card.Title as="h1">{episode?.title || "Episode not available"}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Episode {episode?.episodeNum || "N/A"}</Card.Subtitle>
                    <Card.Text>{episode?.description}</Card.Text>
                    <Button variant="success" className="me-2" onClick={() => navigate('/edit_episode', { state: { episode } })}>
                        Edit Episode
                    </Button>
                    <Button variant="danger" onClick={handleDeleteEpisode}>
                        Delete Episode
                    </Button>
                </Card.Body>
            </Card>

            <h3 className="mt-4">Users who watched this episode:</h3>
            {watchingUsers.length > 0 ? (
                <Row>
                    {watchingUsers.map((user) => (
                        <Col key={user.id} md={4} className="mb-3">
                            <Card className="p-3 shadow-sm" onClick={() => navigate('/view_user', { state: { user } })} style={{ cursor: 'pointer' }}>
                                <Card.Body>
                                    <Card.Title>{user.name}</Card.Title>
                                    <Card.Text>{user.mail}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <Alert variant="warning">No users have watched this episode yet.</Alert>
            )}

            <h3 className="mt-4">Add User</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Select name="userId" onChange={handleChange} defaultValue="">
                        <option value="">Select a user</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Button type="submit" variant="success">Add Watch</Button>
            </Form>
        </Container>
    );
};

export default ViewEpisode;
