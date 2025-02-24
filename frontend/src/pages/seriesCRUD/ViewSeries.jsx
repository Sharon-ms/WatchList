// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Button from 'react-bootstrap/Button';
// import '../../css/viewSeries.css';
// import axios from 'axios';
// import { GeneralContext } from '../../App';

// const ViewSeries = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { API } = useContext(GeneralContext);
//     const { series } = location.state || {};

//     const [selectedSeason, setSelectedSeason] = useState(null);
//     const [episodes, setEpisodes] = useState([]);

//     // const existingSeasons = [...new Set(episodes?.map(episode => episode.seasonNum))];

//     const existingSeasons = episodes
//         ? Object.values(
//             episodes.reduce((acc, episode) => {
//                 if (!acc[episode.seasonNum]) {
//                     acc[episode.seasonNum] = {
//                         seasonNum: episode.seasonNum,
//                         episodesAmount: 0,
//                     };
//                 }
//                 acc[episode.seasonNum].episodesAmount++;
//                 return acc;
//             }, {})
//         )
//         : [];

//     useEffect(() => {
//         const fetchEpisodes = async () => {
//             try {
//                 const response = await axios.get(`${API}/episodes/${series.id}`);
//                 setEpisodes(response.data);
//             } catch (error) {
//                 console.error('Error fetching Episodes:', error);
//             }
//         };

//         fetchEpisodes();
//     }, [API, series.id]);

//     const handleSeasonChange = (e) => {
//         setSelectedSeason(Number(e.target.value));
//     };

//     // שליפת עונות ללא כפילות
//     const uniqueSeasons = [...new Set(episodes.map(e => e.seasonNum))];

//     // סינון פרקים של העונה שנבחרה
//     const filteredEpisodes = episodes.filter(e => e.seasonNum === selectedSeason);

//     return (
//         <div>
//             <Button variant="primary" onClick={() => navigate('/')}>
//                 Back to Home
//             </Button>
//             <div>
//                 <img className="ImgViewSeries" src={series?.image} alt={series?.title} />
//             </div>
//             <h1>{series?.title || "Series not available"}</h1>
//             <h4>{series?.year}</h4>
//             <h4>{series?.genre}</h4>
//             <p>
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, a nemo et, dolorem dicta rem incidunt molestiae tenetur itaque labore magnam nam! Deserunt sequi harum magni! Modi esse vel facere.
//             </p>


//             <div>
//                 <h3>Select a season</h3>
//                 <select onChange={handleSeasonChange}>
//                     <option value="">Select a season</option>
//                     {[...Array(series.seasonsAmount)].map((_, index) => (
//                         <option key={`season-${index + 1}`} value={index + 1}>
//                             Season {index + 1}
//                         </option>
//                     ))}
//                 </select>

//                 <br /><br />
//                 <Button variant="success" onClick={() => navigate('/add_episodes',
//                     { state: { series, selectedSeason } })}
//                     disabled={!selectedSeason} >
//                     Add Episode
//                 </Button>


//                 {selectedSeason && (
//                     <div>
//                         <ul>
//                             {filteredEpisodes.map((episode) => (
//                                 <li key={episode.episodeNum}>
//                                     Episode {episode.episodeNum}
//                                     <br />
//                                     <select>
//                                         <option>Users List</option>
//                                         <option>Add Here Users</option>
//                                     </select>
//                                     <br /><br />
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 )}
//             </div>
//         </div >
//     );
// };

// export default ViewSeries;

import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import axios from 'axios';
import '../../css/viewSeries.css';
import { GeneralContext } from '../../App';

const ViewSeries = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { API } = useContext(GeneralContext);
    const { series, seasonSelected } = location.state || {};

    const [selectedSeason, setSelectedSeason] = useState(seasonSelected || null);
    const [episodes, setEpisodes] = useState([]);
    const [newEpisodes, setNewEpisodes] = useState([]);

    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                const response = await axios.get(`${API}/episodes/${series.id}`);
                setEpisodes(response.data);
            } catch (error) {
                console.error('Error fetching Episodes:', error);
            }
        };

        fetchEpisodes();
    }, [API, series?.id]);

    const handleSeasonChange = (e) => {
        setSelectedSeason(Number(e.target.value));
    };

    // הוספת שדה לפרק חדש
    const handleAddEpisode = () => {
        setNewEpisodes([...newEpisodes, { episodeNum: '', title: '' }]);
    };

    // עדכון נתוני הפרק החדש
    const handleEpisodeChange = (index, field, value) => {
        const updatedEpisodes = newEpisodes.map((ep, i) =>
            i === index ? { ...ep, [field]: value } : ep
        );
        setNewEpisodes(updatedEpisodes);
    };

    // שליחת הפרקים החדשים לשרת
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API}/episodes`, {
                title: episodes.title,
                seriesId: series.id,
                seasonNum: selectedSeason,
                episodesAmount: newEpisodes
            });
            alert("Episodes added successfully!");
            setNewEpisodes([]); // איפוס הטופס לאחר השליחה
        } catch (error) {
            console.error('Error adding episodes:', error);
            alert("Failed to add episodes.");
        }
    };

    return (

        <div>
            <Button variant="primary" onClick={() => navigate('/')}>
                Back to Home
            </Button>
            <div>
                <img className="ImgViewSeries" src={series?.image} alt={series?.title} />
            </div>
            <h1>{series?.title || "Series not available"}</h1>
            <h4>{series?.year}</h4>
            <h4>{series?.genre}</h4>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, a nemo et, dolorem dicta rem incidunt molestiae tenetur itaque labore magnam nam! Deserunt sequi harum magni! Modi esse vel facere.
            </p>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6} lg={4}>
                        <div>
                            <h3>Select a season</h3>
                            <Form.Group>
                                <Form.Select onChange={handleSeasonChange} defaultValue="">
                                    <option value="">Select a season</option>
                                    {[...Array(series?.seasonsAmount)].map((_, index) => (
                                        <option key={`season-${index + 1}`} value={index + 1}>
                                            Season {index + 1}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <br />
                            {/* <Button variant="success" onClick={handleAddEpisode} disabled={!selectedSeason}>
                                Add Episode
                            </Button> */}

                            <Button variant="success" onClick={() => navigate('/create_episode', {state: {seriesId: series.id, seasonNum: selectedSeason}})} disabled={!selectedSeason} >Create episode</Button>



                            {selectedSeason && (
                                            <Container>
                                                <Row>
                                                    {episodes.filter(e => e.seasonNum === selectedSeason).map((episode) => (
                                                        <Col key={episode.id} md={4}>
                                                            <div
                                                                onClick={() => navigate('/view_episode', { state: { episode, series } })}
                                                                style={{ cursor: 'pointer', padding: '20px' }}
                                                            >
                                                                <h2>{episode.title}</h2>
                                                                <h4>{episode.episodeNum}</h4>
                                                            </div>
                                                        </Col>
                                                    ))}
                                                </Row>
                                            </Container>

                            )}
                        </div>
                    </Col >
                </Row >
            </Container >
        </div >

    );
};

export default ViewSeries;
