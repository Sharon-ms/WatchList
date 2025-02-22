import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/home.css';
import { GeneralContext } from '../App';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();
    const { API } = useContext(GeneralContext);
    const [series, setSeries] = useState([]);
    const [filteredSeries, setFilteredSeries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [genreFilter, setGenreFilter] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [isSeriesDeleted, setIsSeriesDeleted] = useState(false);

    useEffect(() => {
        fetchSeries();
    }, []);

    const fetchSeries = async (pageNumber = 1, pageSize = 10) => {
        try {
            const response = await axios.get(`${API}/series`, {
                params: { pageNumber, pageSize }
            });

            setSeries(response.data);
            setFilteredSeries(response.data);
        } catch (error) {
            console.error('Error fetching series:', error);
        }
    };

    // פונקציה לסינון הסדרות
    useEffect(() => {
        let filtered = series.filter(s =>
            s.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (genreFilter ? s.genre.toLowerCase().includes(genreFilter.toLowerCase()) : true) &&
            (yearFilter ? s.year.toString() === yearFilter : true)
        );
        setFilteredSeries(filtered);
    }, [searchTerm, genreFilter, yearFilter, series]);



    const handleDeleteSeries = async (e, seriesId) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this series?')) {
            try {
                await axios.delete(`${API}/series/${seriesId}`);
                alert('Series deleted successfully');
                setIsSeriesDeleted(true);
            } catch (e) {
                console.error('Error deleting series:', e);
                alert('Failed to delete series. Please try again later.');
            }
        }
    };

    useEffect(() => {
        if (isSeriesDeleted) {
            fetchSeries();
            setIsSeriesDeleted(false);

        }
    }, [isSeriesDeleted])

    return (
        <div>
            <Button variant="primary" onClick={() => navigate("/view_users")}>
                Users list
            </Button>

            <h1>Welcome to WatchList</h1>
            <Button variant="success" onClick={() => navigate('/create_series')}>Add a series</Button>

            {/* אזור החיפוש */}
            <Container className="mt-4">
                <Row className="mb-3">
                    <Col md={4}>
                        <FormControl
                            type="text"
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Col>
                    <Col md={4}>
                        <Form.Select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
                            <option value="">Choose Genre</option>
                            <option value="Action">Action</option>
                            <option value="Comedy">Comedy</option>
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
                    </Col>
                    <Col md={4}>
                        <FormControl
                            type="number"
                            placeholder="שנת יציאה"
                            value={yearFilter}
                            onChange={(e) => setYearFilter(e.target.value)}
                        />
                    </Col>
                </Row>
            </Container>

            {/* אזור הצגת הסדרות */}
            <Container>
                <Row>
                    {filteredSeries.map((series) => (
                        <Col key={series.id} md={4}>
                            <div
                                onClick={() => navigate('/view_series', { state: { series } })}
                                style={{ cursor: 'pointer', padding: '20px' }}
                            >
                                <img className='seriesImg' src={series?.image} alt={series?.title}
                                    style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '10px' }} />
                                <h5>{series.title}</h5>

                                <Button variant="success" onClick={(e) => {
                                    e.stopPropagation();
                                    navigate('/edit_series', { state: { series } })
                                }
                                }>
                                    Edit Series
                                </Button>
                                <Button variant="danger" onClick={(e) => handleDeleteSeries(e, series.id)}>
                                    Delete Series
                                </Button>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div >
    )
}

export default Home;
