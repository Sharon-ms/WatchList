import React, { useState, useContext, useEffect } from "react";
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
    const [episodes, setEpisodes] = useState([]);

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
    }, [API, series.id]);

    const handleSeasonChange = (e) => {
        setSelectedSeason(Number(e.target.value));
    };

    // שליפת עונות ללא כפילות
    const uniqueSeasons = [...new Set(episodes.map(e => e.seasonNum))];

    // סינון פרקים של העונה שנבחרה
    const filteredEpisodes = episodes.filter(e => e.seasonNum === selectedSeason);

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
            <Button variant="success" onClick={() => navigate('/add_episodes', { state: { series } })}>
                Add Episodes
            </Button>

            <br /><br />

            <div>
                <h3>Select a season</h3>
                <select onChange={handleSeasonChange}>
                    <option value="">Select a season</option>
                    {uniqueSeasons.map(seasonNum => (
                        <option key={seasonNum} value={seasonNum}>
                            Season {seasonNum}
                        </option>
                    ))}
                </select>

                <br /><br />

                {selectedSeason && (
                    <div>
                        <h3>Episodes:</h3>
                        <ul>
                            {filteredEpisodes.map((episode) => (
                                <li key={episode.episodeNum}>
                                    Episode {episode.episodeNum}
                                    <br />
                                    <select>
                                        <option>Users List</option>
                                        <option>Add Here Users</option>
                                    </select>
                                    <br /><br />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewSeries;
