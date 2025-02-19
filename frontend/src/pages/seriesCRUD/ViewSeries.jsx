import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import '../../css/viewSeries.css';


const ViewSeries = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { series } = location.state || {};

    const [selectedSeason, setSelectedSeason] = useState(null);


    const handleDeleteSeries = () => {
        if (window.confirm('Are you sure you want to delete this series?')) {
            console.log('delete');
            // Delete
        }
    };


    const handleSeasonChange = (e) => {
        setSelectedSeason(Number(e.target.value)); // להמיר למספר
    };

    return (
        <div>
            <Button variant="primary" onClick={() => navigate('/')}>
                Back to Home
            </Button>
            <div>
                {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4T4QdwCl2UZOzOWPm6LzwoLLdhcTCK2ewDPHSkzc_dJYFr1WWhCsL3D3IEPplvPDXdk4&usqp=CAU" alt="Seinfeld" />     */}
                <img src={series?.image} alt={series?.title} />
            </div>
            <h1>{series?.title || "Series not availble"}</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, a nemo et, dolorem dicta rem incidunt molestiae tenetur itaque labore magnam nam! Deserunt sequi harum magni! Modi esse vel facere.</p>
            <Button variant="success" onClick={() => navigate('/edit_series', { state: { series } })}>
                Edit Series
            </Button>
            <Button variant="danger" onClick={handleDeleteSeries}>
                Delete Series
            </Button>

            <br />
            <br />


            <div>
                <h3>Select a season</h3>
                <select onChange={handleSeasonChange}>
                    <option>Select a season</option>
                    {series?.seasons?.map((season) => (
                        <option key={season.seasonNum} value={season.seasonNum}>
                            Season {season.seasonNum}
                        </option>
                    ))}
                </select>

                {selectedSeason !== null && (
                    <div>
                        <h3>Episodes:</h3>
                        <ul>
                            {series?.seasons
                                ?.find((season) => season.seasonNum === selectedSeason)
                                ?.episodes.map((episode, index) => (
                                    <li key={index}>
                                        {episode}
                                        <br />
                                        <select>
                                            <option>Users List</option>
                                            <option>Add Here Users</option>
                                        </select>
                                        <br />
                                        <br />
                                    </li>
                                ))}
                        </ul>
                    </div>
                )}
            </div>

        </div >
    )
}

export default ViewSeries




{/* 
                <select>
                    {series?.seasons?.map(season =>
                        <option key={season.seasonNum}>Season {season.seasonNum}</option>
                    )}
                </select>

                {series?.seasons?.map(season =>
                    <div key={season.seasonNum}>
                        <ul>
                            {season.episodes.map(episode =>
                                <li key={episode}> {episode}</li>
                            )}
                        </ul>
                    </div>
                )}

 */}