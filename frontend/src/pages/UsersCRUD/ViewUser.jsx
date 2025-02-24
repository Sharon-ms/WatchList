import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { GeneralContext } from '../../App';



const ViewUser = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { API } = useContext(GeneralContext);
    const { user } = location.state || {};
    const [watchedEpisodes, setWatchedEpisodes] = useState([]);

    useEffect(() => {
        if (user?.id) {
            fetchWatchedEpisodes();
        }
    }, [user]);
    
    const fetchWatchedEpisodes = async () => {
        try {
            const response = await axios.get(`${API}/users/${user.id}/watched`);
            console.log("Response from API:", response.data);
            setWatchedEpisodes(response.data|| []);
            console.log("Fetching watched episodes...");
        } catch (error) {
            console.error("Error fetching watched episodes:", error);
            setWatchedEpisodes([]);
        }
    };

    const handleDeleteUser = async () => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`${API}/users/${user.id}`);
                alert('User deleted successfully');
                navigate('/view_users');
            } catch (e) {
                console.error('Error deleting user:', e);
                alert('Failed to delete user. Please try again later.');
            }
        }
    };

    // const handleRemoveWatch = async (episodeId) => {
    //     if (window.confirm("Are you sure you want to remove this episode from the user's watchlist?")) {
    //         try {
    //             await axios.delete(`${API}/users/${user.id}/watched/${episodeId}`);
    //             alert("Episode removed successfully!");
    //             fetchWatchedEpisodes(); // רענון הרשימה לאחר המחיקה
    //         } catch (error) {
    //             console.error("Error removing watch:", error);
    //             alert("Failed to remove episode. Please try again.");
    //         }
    //     }
    // };

    const handleDeleteWatch = async (episodeId) => {
        if (!window.confirm("Are you sure you want to remove this watch record?")) return;
    
        try {
            await axios.delete(`${API}/users/${user.id}/watched/${episodeId}`);
            alert("Watch record deleted successfully");
            
            // עדכון הסטייט אחרי מחיקה
            setWatchedEpisodes((prev) => prev.filter((ep) => ep.id !== episodeId));
        } catch (error) {
            console.error("Error deleting watch record:", error);
            alert("Failed to delete watch record. Please try again.");
        }
    };
    

    // const groupedEpisodes = Array.isArray(watchedEpisodes)
    //     ? watchedEpisodes.reduce((acc, episode) => {
    //         const { seriesTitle, seasonNum } = episode;
    //         if (!acc[seriesTitle]) acc[seriesTitle] = {};
    //         if (!acc[seriesTitle][seasonNum]) acc[seriesTitle][seasonNum] = [];
    //         acc[seriesTitle][seasonNum].push(episode);
    //         return acc;
    //     }, {}) : {};

    const groupedEpisodes = watchedEpisodes.reduce((acc, episode) => {
        const seriesTitle = episode.seriesTitle; //|| "Unknown Series";  שימוש בשם הסדרה
        const seasonNumber = episode.seasonNumber;
    
        if (!acc[seriesTitle]) {
            acc[seriesTitle] = {}; // אם הסדרה לא קיימת עדיין באובייקט, נוסיף אותה
        }
        if (!acc[seriesTitle][seasonNumber]) {
            acc[seriesTitle][seasonNumber] = []; // אם העונה לא קיימת, ניצור אותה
        }
        
        acc[seriesTitle][seasonNumber].push(episode); // נוסיף את הפרק לעונה הרלוונטית
    
        return acc;
    }, {});
    

    return (
        <div>
            <Button variant="primary" onClick={() => navigate('/view_users')}>
                Back to Users List
            </Button>
            <h1>{user?.name || "User not availble"}</h1>
            <h4>{user?.mail || "Mail not availble"}</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, a nemo et, dolorem dicta rem incidunt molestiae tenetur itaque labore magnam nam! Deserunt sequi harum magni! Modi esse vel facere.</p>
            <Button variant="success" onClick={() => navigate('/edit_User', { state: { user } })}>
                Edit User
            </Button>
            <Button variant="danger" onClick={handleDeleteUser}>
                Delete User
            </Button>

            <br />
            <br />

            <h3>Watched Episodes</h3>

            {Object.keys(groupedEpisodes).length > 0 ? (
                Object.entries(groupedEpisodes).map(([seriesTitle, seasons]) => (
                    <div key={seriesTitle}>
                        <h4>{seriesTitle}</h4>
                        {Object.entries(seasons).map(([seasonNumber, episodes]) => (
                            <div key={seasonNumber}>
                                <h5>Season {seasonNumber}</h5>
                                <ul>
                                    {episodes.map(episode => (
                                        <li key={episode.id}>
                                            <Button variant="link" onClick={() => navigate('/view_episode', { state: { episode } })}>
                                                {episode.episodeNum}: {episode.title}
                                            </Button>
                                            <Button variant="danger" size="sm" onClick={() => handleDeleteWatch(episode.id)}>
                                                Remove
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <p>No watched episodes found.</p>
            )}


        </div >
    )
}

export default ViewUser

