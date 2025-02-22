// import React, { useState, useContext } from 'react';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// import { GeneralContext } from '../../App';
// import axios from 'axios';
// import { useNavigate, useLocation } from "react-router-dom";


// const AddEpisodes = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { API } = useContext(GeneralContext);
//     const { series } = location.state || {};
//     const seriesId = series?.id;
//     // console.log({ series });


//     const [formData, setFormData] = useState({
//         seasonNum: '',
//         episodesAmount: '',
//     });


//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!formData.seasonNum || !formData.episodesAmount) {
//             alert('Please fill in all fields.');
//             return;
//         }

//         const dataToSubmit = {
//             title: '',
//             seriesId: seriesId,
//             seasonNum: formData.seasonNum,
//             episodesAmount: formData.episodesAmount,
//         };


//         try {
//             console.log('dataToSubmit:', dataToSubmit);

//             const response = await axios.post(`${API}/episodes`, dataToSubmit,
//                 {
//                     headers: { 'Accept': 'application/json' }
//                 }
//             );

//             console.log('Episodes added successfully:', response.data);
//             // navigate(-1);
//         } catch (error) {
//             console.error('Error adding episodes:', error.message);
//             alert('Error adding episodes, please try again.');
//         }

//     };

//     const handleReset = () => {
//         setFormData({
//             seasonNum: '',
//             episodesAmount: ''
//         });
//     };

//     return (
//         <div>
//             <Container className="mt-5">
//                 <Row className="justify-content-center">
//                     <Col xs={12} sm={8} md={6} lg={4}>

//                         <h2>Add Episodes</h2>

//                         <Form onSubmit={handleSubmit}>
//                             <Form.Group className="mb-3" controlId="formSeasons">
//                                 <Form.Label>Seasons number</Form.Label>
//                                 <Form.Control
//                                     type="number"
//                                     placeholder="Enter Season Number"
//                                     name="seasonNum"
//                                     value={formData.seasonNum}
//                                     onChange={handleChange}
//                                 />

//                             </Form.Group>

//                             <Form.Group className="mb-3" controlId="formEpisodes">
//                                 <Form.Label>Episodes Amount</Form.Label>
//                                 <Form.Control
//                                     type="number"
//                                     placeholder="Enter Episode Amount"
//                                     name="episodesAmount"
//                                     value={formData.episodesAmount}
//                                     onChange={handleChange}
//                                 />

//                             </Form.Group>

//                             <br />

//                             <Button variant="primary" type="submit">
//                                 Add Season
//                             </Button>
//                             <br />
//                             <br />
//                             <br />

//                             <Button variant="success" type="submit">
//                                 Submit
//                             </Button>

//                             <Button variant="none" onClick={handleReset}>
//                                 <svg width={'25px'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fb4646" d="M142.9 142.9c-17.5 17.5-30.1 38-37.8 59.8c-5.9 16.7-24.2 25.4-40.8 19.5s-25.4-24.2-19.5-40.8C55.6 150.7 73.2 122 97.6 97.6c87.2-87.2 228.3-87.5 315.8-1L455 55c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2l0 128c0 13.3-10.7 24-24 24l-8.4 0c0 0 0 0 0 0L344 224c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l41.1-41.1c-62.6-61.5-163.1-61.2-225.3 1zM16 312c0-13.3 10.7-24 24-24l7.6 0 .7 0L168 288c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-41.1 41.1c62.6 61.5 163.1 61.2 225.3-1c17.5-17.5 30.1-38 37.8-59.8c5.9-16.7 24.2-25.4 40.8-19.5s25.4 24.2 19.5 40.8c-10.8 30.6-28.4 59.3-52.9 83.8c-87.2 87.2-228.3 87.5-315.8 1L57 457c-6.9 6.9-17.2 8.9-26.2 5.2S16 449.7 16 440l0-119.6 0-.7 0-7.6z" /></svg>
//                             </Button>

//                         </Form>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     )
// }

// export default AddEpisodes


// import React, { useState, useContext } from 'react';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// import { GeneralContext } from '../../App';
// import axios from 'axios';
// import { useNavigate, useLocation } from "react-router-dom";

// const AddEpisodes = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { API } = useContext(GeneralContext);
//     const { series } = location.state || {};
//     const seriesId = series?.id;

//     // התחלת המערך עם עונה ראשונה
//     const [seasons, setSeasons] = useState([
//         { seasonNum: 1, episodesAmount: '' }
//     ]);

//     const handleAddSeason = () => {
//         setSeasons(prevSeasons => [
//             ...prevSeasons,
//             { seasonNum: prevSeasons.length + 1, episodesAmount: '' }
//         ]);
//     };

//     const handleChange = (index, e) => {
//         const { value } = e.target;
//         setSeasons(prevSeasons =>
//             prevSeasons.map((season, i) =>
//                 i === index ? { ...season, episodesAmount: value } : season
//             )
//         );
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();


//         if (seasons.some(season => !season.episodesAmount)) {
//             alert('Please fill in all fields.');
//             return;
//         }

//         const dataToSubmit = seasons.map(season => ({
//             title: '',
//             seriesId: seriesId,
//             seasonNum: season.seasonNum,
//             episodesAmount: season.episodesAmount,
//         }));

//         try {
//             console.log('dataToSubmit:', dataToSubmit);
//             await axios.post(`${API}/episodes`, { seasons: dataToSubmit }, {
//                 headers: { 'Accept': 'application/json' }
//             });
//             console.log('Episodes added successfully');
//             navigate(-1);

//         } catch (error) {
//             console.error('Error adding episodes:', error.message);
//             alert('Error adding episodes, please try again.');
//         }
//     };

//     const handleReset = () => {
//         setSeasons([
//             { seasonNum: 1, episodesAmount: '' }
//         ]);
//     };

//     return (
//         <div>
//             <Container className="mt-5">
//                 <Row className="justify-content-center">
//                     <Col xs={12} sm={8} md={6} lg={4}>
//                         <h2>Add Seasons</h2>
//                         <Form onSubmit={handleSubmit}>
//                             {seasons.map((season, index) => (
//                                 <Form.Group className="mb-3" key={index}>
//                                     <Form.Label>Season {season.seasonNum}</Form.Label>
//                                     <Form.Control
//                                         type="number"
//                                         placeholder="Enter Episode Amount"
//                                         value={season.episodesAmount}
//                                         onChange={(e) => handleChange(index, e)}
//                                     />
//                                 </Form.Group>
//                             ))}
//                             <Button variant="primary" type="button" onClick={handleAddSeason}>
//                                 Add Season
//                             </Button>
//                             <br /><br />
//                             <Button variant="success" type="submit">
//                                 Submit
//                             </Button>

//                             <Button variant="none" onClick={handleReset}>
//                                 <svg width={'25px'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fb4646" d="M142.9 142.9c-17.5 17.5-30.1 38-37.8 59.8c-5.9 16.7-24.2 25.4-40.8 19.5s-25.4-24.2-19.5-40.8C55.6 150.7 73.2 122 97.6 97.6c87.2-87.2 228.3-87.5 315.8-1L455 55c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2l0 128c0 13.3-10.7 24-24 24l-8.4 0c0 0 0 0 0 0L344 224c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l41.1-41.1c-62.6-61.5-163.1-61.2-225.3 1zM16 312c0-13.3 10.7-24 24-24l7.6 0 .7 0L168 288c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-41.1 41.1c62.6 61.5 163.1 61.2 225.3-1c17.5-17.5 30.1-38 37.8-59.8c5.9-16.7 24.2-25.4 40.8-19.5s25.4 24.2 19.5 40.8c-10.8 30.6-28.4 59.3-52.9 83.8c-87.2 87.2-228.3 87.5-315.8 1L57 457c-6.9 6.9-17.2 8.9-26.2 5.2S16 449.7 16 440l0-119.6 0-.7 0-7.6z" /></svg>
//                             </Button>
//                         </Form>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     );
// };

// export default AddEpisodes;



// import React, { useState, useContext } from 'react';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// import { GeneralContext } from '../../App';
// import axios from 'axios';
// import { useNavigate, useLocation } from "react-router-dom";

// const AddEpisodes = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { API } = useContext(GeneralContext);
//     const { series, selectedSeason } = location.state || {};
//     const seriesId = series?.id;

//     const initialSeasons = selectedSeason && selectedSeason.length > 0
//         ? selectedSeason.map(seasonNum => ({ seasonNum, episodesAmount: '' }))
//         : [{ seasonNum: 1, episodesAmount: '' }];

//     const [seasons, setSeasons] = useState(initialSeasons);

//     const handleAddSeason = () => {
//         const nextSeasonNum = seasons.length > 0 ? Math.max(...seasons.map(s => s.seasonNum)) + 1 : 1;
//         if (!seasons.some(season => season.seasonNum === nextSeasonNum)) {
//             setSeasons(prevSeasons => [
//                 ...prevSeasons,
//                 { seasonNum: nextSeasonNum, episodesAmount: '' }
//             ]);
//         }
//     };

//     const handleChange = (index, e) => {
//         const { value } = e.target;
//         setSeasons(prevSeasons =>
//             prevSeasons.map((season, i) =>
//                 i === index ? { ...season, episodesAmount: value } : season
//             )
//         );
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (seasons.some(season => !season.episodesAmount)) {
//             alert('Please fill in all fields.');
//             return;
//         }

//         const dataToSubmit = seasons.map(season => ({
//             title: '',
//             seriesId: seriesId,
//             seasonNum: season.seasonNum,
//             episodesAmount: season.episodesAmount,
//         }));

//         try {
//             console.log('dataToSubmit:', dataToSubmit);
//             await axios.post(`${API}/episodes`, { seasons: dataToSubmit }, {
//                 headers: { 'Accept': 'application/json' }
//             });
//             console.log('Episodes added successfully');
//             navigate(-1);

//         } catch (error) {
//             console.error('Error adding episodes:', error.message);
//             alert('Error adding episodes, please try again.');
//         }
//     };

//     const handleReset = () => {
//         setSeasons(initialSeasons);
//     };

//     return (
//         <div>
//             <Container className="mt-5">
//                 <Row className="justify-content-center">
//                     <Col xs={12} sm={8} md={6} lg={4}>
//                         <h2>Add Seasons</h2>
//                         <Form onSubmit={handleSubmit}>
//                             {seasons.map((season, index) => (
//                                 <Form.Group className="mb-3" key={index}>
//                                     <Form.Label>Season {season.seasonNum}</Form.Label>
//                                     <Form.Control
//                                         type="number"
//                                         placeholder="Enter Episode Amount"
//                                         value={season.episodesAmount}
//                                         onChange={(e) => handleChange(index, e)}
//                                     />
//                                 </Form.Group>
//                             ))}
//                             <Button variant="primary" type="button" onClick={handleAddSeason}>
//                                 Add Season
//                             </Button>
//                             <br /><br />
//                             <Button variant="success" type="submit">
//                                 Submit
//                             </Button>

//                             <Button variant="none" onClick={handleReset}>
//                                 <svg width={'25px'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fb4646" d="M142.9 142.9c-17.5 17.5-30.1 38-37.8 59.8c-5.9 16.7-24.2 25.4-40.8 19.5s-25.4-24.2-19.5-40.8C55.6 150.7 73.2 122 97.6 97.6c87.2-87.2 228.3-87.5 315.8-1L455 55c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2l0 128c0 13.3-10.7 24-24 24l-8.4 0c0 0 0 0 0 0L344 224c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l41.1-41.1c-62.6-61.5-163.1-61.2-225.3 1zM16 312c0-13.3 10.7-24 24-24l7.6 0 .7 0L168 288c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-41.1 41.1c62.6 61.5 163.1 61.2 225.3-1c17.5-17.5 30.1-38 37.8-59.8c5.9-16.7 24.2-25.4 40.8-19.5s25.4 24.2 19.5 40.8c-10.8 30.6-28.4 59.3-52.9 83.8c-87.2 87.2-228.3 87.5-315.8 1L57 457c-6.9 6.9-17.2 8.9-26.2 5.2S16 449.7 16 440l0-119.6 0-.7 0-7.6z" /></svg>
//                             </Button>
//                         </Form>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     );
// };

// export default AddEpisodes;

import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { GeneralContext } from '../../App';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";

const AddEpisodes = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { API } = useContext(GeneralContext);
    const { series, selectedSeason } = location.state || {};
    const seriesId = series?.id;

    // קביעת מספר העונה הבא על פי העונות הקיימות
    const getNextSeasonNum = () => {
        if (selectedSeason && selectedSeason.length > 0) {
            const maxSeasonNum = Math.max(...selectedSeason.map(s => s.seasonNum));
            return maxSeasonNum + 1;
        }
        return 1; // אם אין עונות קיימות, מתחילים מעונה 1
    };

    // רשימה של העונות החדשות (אלו שאנחנו מוסיפים)
    const [newSeasons, setNewSeasons] = useState([]);

    // פונקציה להוסיף עונה חדשה
    const handleAddSeason = () => {
        const nextSeasonNum = getNextSeasonNum();
        setNewSeasons(prevSeasons => [
            ...prevSeasons,
            { seasonNum: nextSeasonNum, episodesAmount: '' }
        ]);
    };

    // עדכון שדה כמות הפרקים בעונה חדשה
    const handleChange = (index, e) => {
        const { value } = e.target;
        setNewSeasons(prevSeasons =>
            prevSeasons.map((season, i) =>
                i === index ? { ...season, episodesAmount: value } : season
            )
        );
    };

    // שליחה של העונות החדשות בלבד
    const handleSubmit = async (e) => {
        e.preventDefault();

        // אם יש עונות חדשות שאין בהן כמות פרקים
        if (newSeasons.some(season => !season.episodesAmount)) {
            alert('Please fill in all fields.');
            return;
        }

        const dataToSubmit = newSeasons.map(season => ({
            title: '',
            seriesId: seriesId,
            seasonNum: season.seasonNum,
            episodesAmount: season.episodesAmount,
        }));

        try {
            console.log('dataToSubmit:', dataToSubmit);
            await axios.post(`${API}/episodes`, { seasons: dataToSubmit }, {
                headers: { 'Accept': 'application/json' }
            });
            console.log('Episodes added successfully');
            navigate(-1);
        } catch (error) {
            console.error('Error adding episodes:', error.message);
            alert('Error adding episodes, please try again.');
        }
    };

    return (
        <div>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6} lg={4}>
                        <h2>Add Episodes</h2>
                        <Form onSubmit={handleSubmit}>
                            {selectedSeason && selectedSeason.length > 0 && (
                                <>
                                    <h4>Existing Seasons</h4>
                                    {selectedSeason.map((season, index) => (
                                        <Form.Group className="mb-3" key={index}>
                                            <Form.Label>Season {season.seasonNum}</Form.Label>
                                            <Form.Text className="text-muted" style={{ fontSize: '1rem' }}>
                                                Existing episodes: {season.episodesAmount}
                                            </Form.Text>
                                        </Form.Group>
                                    ))}
                                </>
                            )}

                            <h4>New Seasons</h4>
                            {newSeasons.map((season, index) => (
                                <Form.Group className="mb-3" key={index}>
                                    <Form.Label>Season {season.seasonNum}</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={season.episodesAmount}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="Enter Episode Amount"
                                    />
                                </Form.Group>
                            ))}

                            <Button variant="primary" type="button" onClick={handleAddSeason}>
                                Add Season
                            </Button>
                            <br /><br />
                            <Button variant="success" type="submit">
                                Submit
                            </Button>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AddEpisodes;



