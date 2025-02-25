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


// גירסא ללא עיצוב
// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';

// import axios from 'axios';
// import '../../css/viewSeries.css';
// import { GeneralContext } from '../../App';

// const ViewSeries = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { API } = useContext(GeneralContext);
//     const { series, seasonSelected } = location.state || {};

//     const [selectedSeason, setSelectedSeason] = useState(seasonSelected || null);
//     const [episodes, setEpisodes] = useState([]);
//     const [newEpisodes, setNewEpisodes] = useState([]);

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
//     }, [API, series?.id]);

//     const handleSeasonChange = (e) => {
//         setSelectedSeason(Number(e.target.value));
//     };

//     // הוספת שדה לפרק חדש
//     const handleAddEpisode = () => {
//         setNewEpisodes([...newEpisodes, { episodeNum: '', title: '' }]);
//     };

//     // עדכון נתוני הפרק החדש
//     const handleEpisodeChange = (index, field, value) => {
//         const updatedEpisodes = newEpisodes.map((ep, i) =>
//             i === index ? { ...ep, [field]: value } : ep
//         );
//         setNewEpisodes(updatedEpisodes);
//     };

//     // שליחת הפרקים החדשים לשרת
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post(`${API}/episodes`, {
//                 title: episodes.title,
//                 seriesId: series.id,
//                 seasonNum: selectedSeason,
//                 episodesAmount: newEpisodes
//             });
//             alert("Episodes added successfully!");
//             setNewEpisodes([]); // איפוס הטופס לאחר השליחה
//         } catch (error) {
//             console.error('Error adding episodes:', error);
//             alert("Failed to add episodes.");
//         }
//     };

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
//             <Container className="mt-5">
//                 <Row className="justify-content-center">
//                     <Col xs={12} sm={8} md={6} lg={4}>
//                         <div>
//                             <h3>Select a season</h3>
//                             <Form.Group>
//                                 <Form.Select onChange={handleSeasonChange} defaultValue="">
//                                     <option value="">Select a season</option>
//                                     {[...Array(series?.seasonsAmount)].map((_, index) => (
//                                         <option key={`season-${index + 1}`} value={index + 1}>
//                                             Season {index + 1}
//                                         </option>
//                                     ))}
//                                 </Form.Select>
//                             </Form.Group>

//                             <br />
//                             {/* <Button variant="success" onClick={handleAddEpisode} disabled={!selectedSeason}>
//                                 Add Episode
//                             </Button> */}

//                             <Button variant="success" onClick={() => navigate('/create_episode', { state: { seriesId: series.id, seasonNum: selectedSeason } })} disabled={!selectedSeason} >Create episode</Button>



//                             {selectedSeason && (
//                                 <Container>
//                                     <Row>
//                                         {episodes.filter(e => e.seasonNum === selectedSeason).map((episode) => (
//                                             <Col key={episode.id} md={4}>
//                                                 <div
//                                                     onClick={() => navigate('/view_episode', { state: { episode, series } })}
//                                                     style={{ cursor: 'pointer', padding: '20px' }}
//                                                 >
//                                                     <h2>{episode.title}</h2>
//                                                     <h4>{episode.episodeNum}</h4>
//                                                 </div>
//                                             </Col>
//                                         ))}
//                                     </Row>
//                                 </Container>

//                             )}
//                         </div>
//                     </Col >
//                 </Row >
//             </Container >
//         </div >

//     );
// };

// export default ViewSeries;





// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Form, Button, Container, Row, Col } from "react-bootstrap";
// import axios from "axios";
// import "../../css/viewSeries.css";
// import { GeneralContext } from "../../App";

// const ViewSeries = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { API } = useContext(GeneralContext);
//     const { series, seasonSelected } = location.state || {};

//     const [selectedSeason, setSelectedSeason] = useState(seasonSelected || null);
//     const [episodes, setEpisodes] = useState([]);

//     useEffect(() => {
//         const fetchEpisodes = async () => {
//             try {
//                 const response = await axios.get(`${API}/episodes/${series.id}`);
//                 setEpisodes(response.data);
//             } catch (error) {
//                 console.error("Error fetching Episodes:", error);
//             }
//         };

//         if (series?.id) fetchEpisodes();
//     }, [API, series?.id]);

//     const handleSeasonChange = (e) => {
//         setSelectedSeason(Number(e.target.value));
//     };

//     return (
//         <Container className="mt-4 text-center">
//             <Button variant="primary" onClick={() => navigate("/")}>Back to Home</Button>

//             {series && (
//                 <>
//                     <div className="my-3">
//                         <img className="ImgViewSeries" src={series.image} alt={series.title} />
//                     </div>
//                     <h1>{series.title}</h1>
//                     <h4>{series.year}</h4>
//                     <h4>{series.genre}</h4>
//                     <p className="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
//                 </>
//             )}

//             <Row className="justify-content-center mt-4">
//                 <Col xs={12} sm={8} md={6} lg={4}>
//                     <h3>Select a season</h3>
//                     <Form.Group>
//                         <Form.Select onChange={handleSeasonChange} defaultValue="">
//                             <option value="">Select a season</option>
//                             {[...Array(series?.seasonsAmount)].map((_, index) => (
//                                 <option key={`season-${index + 1}`} value={index + 1}>
//                                     Season {index + 1}
//                                 </option>
//                             ))}
//                         </Form.Select>
//                     </Form.Group>

//                     <Button
//                         variant="success"
//                         className="mt-3"
//                         onClick={() => navigate("/create_episode", { state: { seriesId: series.id, seasonNum: selectedSeason } })}
//                         disabled={!selectedSeason}
//                     >
//                         Create Episode
//                     </Button>
//                 </Col>
//             </Row>

//             {selectedSeason && (
//                 <Container className="mt-4">
//                     <Row>
//                         {episodes.filter(e => e.seasonNum === selectedSeason).map((episode) => (
//                             <Col key={episode.id} md={4} className="mb-3">
//                                 <div
//                                     className="p-3 border rounded shadow-sm text-center"
//                                     onClick={() => navigate("/view_episode", { state: { episode, series } })}
//                                     style={{ cursor: "pointer" }}
//                                 >
//                                     <h2 className="h5">{episode.title}</h2>
//                                     <h4 className="text-muted">Episode {episode.episodeNum}</h4>
//                                 </div>
//                             </Col>
//                         ))}
//                     </Row>
//                 </Container>
//             )}
//         </Container>
//     );
// };

// export default ViewSeries;


import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import "../../css/viewSeries.css";
import { GeneralContext } from "../../App";

const ViewSeries = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { API } = useContext(GeneralContext);
    const { series, seasonSelected } = location.state || {};

    const [selectedSeason, setSelectedSeason] = useState(seasonSelected || null);
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                const response = await axios.get(`${API}/episodes/${series.id}/episodes`);
                setEpisodes(response.data);
            } catch (error) {
                console.error("Error fetching Episodes:", error);
            }
        };

        if (series?.id) fetchEpisodes();
    }, [API, series?.id]);

    const handleSeasonChange = (e) => {
        setSelectedSeason(Number(e.target.value));
    };

    return (
        <Container className="mt-4 text-center pb-5">
            <Button variant="outline-primary" className="mb-3" onClick={() => navigate("/")}>Back to Home</Button>

            {series && (
                <>
                    <div className="d-flex justify-content-center mb-4">
                        <img
                            className="img-fluid rounded shadow-lg"
                            src={series.image}
                            alt={series.title}
                            style={{ maxHeight: "400px", objectFit: "cover" }}
                        />
                    </div>
                    <h1 className="fw-bold">{series.title}</h1>
                    <h4 className="text-secondary">{series.year} | {series.genre}</h4>
                    <p className="text-muted">A thrilling journey through the world of {series.genre}...</p>
                </>
            )}

            <Row className="justify-content-center mt-4">
                <Col xs={12} sm={8} md={6} lg={4}>
                    <h3 className="mb-3">Select a season</h3>
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

                    <Button
                        variant="success"
                        className="mt-3 w-100"
                        onClick={() => navigate("/create_episode", { state: { seriesId: series.id, seasonNum: selectedSeason } })}
                        disabled={!selectedSeason}
                    >
                        Create Episode
                    </Button>
                </Col>
            </Row>

            {selectedSeason && (
                <Container className="mt-5">
                    <Row className="g-4">
                        {episodes?.filter(e => e.seasonNum === selectedSeason).map((episode) => (
                            <Col Col key={episode.id} md={4} >
                                <Card className="shadow-lg border-0" style={{ cursor: "pointer" }} onClick={() => navigate("/view_episode",
                                    { state: { episodeId: episode.id, series } })}>
                                    <Card.Body className="text-center">
                                        <Card.Title className="fw-bold">{episode.title}</Card.Title>
                                        <Card.Subtitle className="text-muted">Episode {episode.episodeNum}</Card.Subtitle>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            )
            }
        </Container >
    );
};

export default ViewSeries;
