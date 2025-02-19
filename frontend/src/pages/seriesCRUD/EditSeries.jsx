import React from 'react'

const EditSeries = () => {
    return (
        <div>
            EditSeries
        </div>
    )
}

export default EditSeries



// import React, { useState } from "react";
// import { Form, Button, Container, Row, Col } from "react-bootstrap";

// const EditSeries = ({ seriesData }) => {
//     const [formData, setFormData] = useState(seriesData);
//     const [selectedSeason, setSelectedSeason] = useState(
//         series.seasons[0]?.seasonNum || null
//     );

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if (name === "image") {
//             setFormData({ ...formData, [name]: files[0] });
//         } else {
//             setFormData({ ...formData, [name]: value });
//         }
//     };

//     const handleSeasonChange = (e) => {
//         setSelectedSeason(Number(e.target.value));
//     };

//     const handleEpisodeChange = (seasonNum, index, value) => {
//         const updatedSeasons = formData.seasons.map((season) => {
//             if (season.seasonNum === seasonNum) {
//                 const updatedEpisodes = [...season.episodes];
//                 updatedEpisodes[index] = Number(value);
//                 return { ...season, episodes: updatedEpisodes };
//             }
//             return season;
//         });
//         setFormData({ ...formData, seasons: updatedSeasons });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Updated Series Data:", formData);
//     };

//     return (
//         <Container className="mt-5">
//             <Row className="justify-content-center">
//                 <Col xs={12} sm={8} md={6} lg={4}>
//                     <h2>Edit Series</h2>
//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group className="mb-3" controlId="formTitle">
//                             <Form.Label>Title</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="title"
//                                 value={formData.title}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>

//                         <Form.Group className="mb-3" controlId="formImage">
//                             <Form.Label>Image</Form.Label>
//                             <Form.Control type="file" name="image" onChange={handleChange} />
//                         </Form.Group>

//                         <Form.Group className="mb-3">
//                             <Form.Label>Season</Form.Label>
//                             <Form.Select onChange={handleSeasonChange} value={selectedSeason}>
//                                 {formData.seasons.map((season) => (
//                                     <option key={season.seasonNum} value={season.seasonNum}>
//                                         Season {season.seasonNum}
//                                     </option>
//                                 ))}
//                             </Form.Select>
//                         </Form.Group>

//                         {selectedSeason && (
//                             <>
//                                 <h5>Episodes</h5>
//                                 {formData.seasons
//                                     .find((season) => season.seasonNum === selectedSeason)
//                                     ?.episodes.map((episode, index) => (
//                                         <Form.Group className="mb-2" key={index}>
//                                             <Form.Label>Episode {index + 1}</Form.Label>
//                                             <Form.Control
//                                                 type="number"
//                                                 value={episode}
//                                                 onChange={(e) =>
//                                                     handleEpisodeChange(selectedSeason, index, e.target.value)
//                                                 }
//                                             />
//                                         </Form.Group>
//                                     ))}
//                             </>
//                         )}

//                         <Button variant="success" type="submit">
//                             Save Changes
//                         </Button>
//                     </Form>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default EditSeries;
