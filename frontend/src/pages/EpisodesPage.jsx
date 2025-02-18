import { useEffect, useState } from "react";
import api from "../services/api";

function EpisodesPage() {
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        async function fetchEpisodes() {
            try {
                const response = await api.get("/episodes", {
                    params: {
                        pageNumber: 0,
                        pageSize: 10,
                    },
                });
                console.log(response.data)
                setEpisodes(response.data);
            } catch (error) {
                console.error("Error fetching episodes:", error);
            }
        }
        fetchEpisodes();
    }, []);

    return (
        <div>
            <h1>Episodes List</h1>
            {episodes.map((episode) => (
                <div key={episode.id}>
                    <h2>{episode.season}</h2>
                    <p>{episode.episode}</p>
                </div>
            ))}
        </div>
    );
}

export default EpisodesPage;
