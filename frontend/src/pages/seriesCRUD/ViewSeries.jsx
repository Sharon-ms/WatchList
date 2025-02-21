import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import '../../css/viewSeries.css';
import axios from 'axios';
import { GeneralContext } from '../../App';



const ViewSeries = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { API } = useContext(GeneralContext);
    const { series } = location.state || {};

    const [selectedSeason, setSelectedSeason] = useState(null);


    const handleDeleteSeries = async () => {
        if (window.confirm('Are you sure you want to delete this series?')) {
            try {
                await axios.delete(`${API}/series/${series.id}`);
                alert('Series deleted successfully');
                navigate('/');
            } catch (e) {
                console.error('Error deleting series:', e);
                alert('Failed to delete series. Please try again later.');
            }
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
                <img className="ImgViewSeries"
                    src={series?.image} alt={series?.title} />
            </div>
            <h1>{series?.title || "Series not availble"}</h1>
            <h4>{series.year}</h4>
            <h4>{series.genre}</h4>
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

