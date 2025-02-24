import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Form, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import { GeneralContext } from '../../App';



const ViewEpisode = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { API } = useContext(GeneralContext);
    const { episode, series } = location.state || {};
    const [users, setUsers] = useState([]);
    const [watchingUsers, setWatchingUsers] = useState([]);

    const [formData, setFormData] = useState({
        userId: '',
        episodeId: episode?.id || '',
    });

    useEffect(() => {
        fetchUsers();
        fetchWatchingUsers();
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

    const fetchWatchingUsers = async () => {
        try {
            const response = await axios.get(`${API}/episodes/${episode.id}/users`);
            setWatchingUsers(response.data);
        } catch (error) {
            console.error('Error fetching watching users:', error);
        }
    };

    const handleDeleteEpisode = async () => {
        if (window.confirm('Are you sure you want to delete this episode?')) {
            try {
                await axios.delete(`${API}/episodes/${episode.id}`);
                alert('episode deleted successfully');
                navigate('/view_series', { state: { series, seasonSelected: episode.seasonNum } });
            } catch (e) {
                console.error('Error deleting episode:', e);
                alert('Failed to delete episode. Please try again later.');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSubmit = {
            userId: formData.userId,
            episodeId: formData.episodeId,
        };

        try {

            const response = await axios.post(`${API}/episodes/addWatch`, dataToSubmit,
                {
                    headers: { 'Accept': 'application/json' }
                }
            );

            console.log('User add watch successfully:', response.data);
            fetchWatchingUsers();
        } catch (error) {
            console.error('Error user add watch:', error.message);
            alert('Error user add watch, please try again.');
        }
    };


    return (
        <div>
            <Button variant="primary" onClick={() => navigate('/view_series', { state: { series, seasonSelected: episode.seasonNum } })}>
                Back to episodes List
            </Button>
            <h1>{episode?.title || "episode not availble"}</h1>
            <h4>{episode?.episodeNum || "Mail not availble"}</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, a nemo et, dolorem dicta rem incidunt molestiae tenetur itaque labore magnam nam! Deserunt sequi harum magni! Modi esse vel facere.</p>
            <Button variant="success" onClick={() => navigate('/edit_episode', { state: { episode } })}>
                Edit episode
            </Button>
            <Button variant="danger" onClick={handleDeleteEpisode}>
                Delete episode
            </Button>

            <br />
            <br />

            <h3>Users who watched this episode:</h3>
            {watchingUsers.length > 0 ? (
            <Container>
                <Row>
                    {watchingUsers.map((user) => (
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
            ) : (
                <p>No users have watched this episode yet.</p>
            )}

            <br />

            <h3>Add user</h3>

            <Form.Group>
                <Form.Select name="userId" onChange={handleChange} defaultValue="">
                    <option value="">Select an user</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <br />
            <br />
            <Button variant="success" onClick={handleSubmit}>
                ADD WATCH
            </Button>





        </div >
    )
}

export default ViewEpisode

