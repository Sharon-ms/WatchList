import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/home.css';



const Home = () => {
    const navigate = useNavigate();
    // const [series, setSeries] = useState([]);

    const seriesList = [
        {
            id: 1, title: "Seinfeld", image: "https://via.placeholder.com/150",
            seasons: [
                {
                    seasonNum: 1,
                    episodes: [
                        1, 2, 3, 4, 5, 6
                    ]
                },
                {
                    seasonNum: 2,
                    episodes: [
                        1, 2, 3, 4,
                    ]
                },
            ],
        },
        {
            id: 2, title: "Breaking Bad", image: "https://via.placeholder.com/150",
            seasons: [
                {
                    seasonNum: 1,
                    episodes: [
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14
                    ]
                },
                {
                    seasonNum: 2,
                    episodes: [
                        1, 2, 3,
                    ]
                },
            ],
        },
    ];




    return (
        <div>
            <h1>Welcome to WatchList</h1>
            <Button variant="success" onClick={() => navigate('/create_series')}
            >Add a series</Button>

            <Container>
                <Row>
                    {seriesList.map((series) => (
                        <Col key={series.id} md={4}>
                            <div
                                onClick={() => navigate('/view_series', { state: { series } })}
                                style={{ cursor: 'pointer', padding: '50px' }}
                            >
                                <img src={series?.image} alt={series?.title} className="img-fluid" />
                                <h5>{series.title}</h5>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div >
    )
}

export default Home
