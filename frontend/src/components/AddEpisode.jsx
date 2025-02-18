import { useState } from "react";
import api from "../services/api"; 

function AddEpisode() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newEpisode = { title, description };
            await api.post("/episodes", newEpisode);
            alert("Episode added successfully!");
            setTitle("");
            setDescription("");
        } catch (error) {
            console.error("Error adding episode:", error);
        }
    };

    return (
        <div>
            <h2>Add New Episode</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Episode</button>
            </form>
        </div>
    );
}

export default AddEpisode;
