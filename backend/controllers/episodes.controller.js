const episodesService = require('../services/episodes.service');

async function getAllEpisodes(req, res) {
    try {
        const { pageNumber, pageSize } = req.query;
        const episodes = await episodesService.getAllEpisodes(Number(pageNumber), Number(pageSize));
        console.log(episodes)
        res.send(episodes)
    }
    catch (err) {
        res.status(500).send(err.message)
    }

}

async function getEpisodeBySeriesId(req, res) {
    try {
        const seriesId = Number(req.params.seriesId);
        const episode = await episodesService.getEpisodeBySeriesId(seriesId);
        res.send(episode)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

async function addEpisodes(req, res) {
    try {
        const newEpisode = req.body;
        const result = await episodesService.addEpisodes(newEpisode);
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

// async function addEpisodes(req, res) {

//     try {
//         const { title, seriesId, seasonNum, episodeNum } = req.body;

//         if (!title || !seasonNum || !episodeNum || !seriesId) {
//             return res.status(400).send('Missing required fields');
//         }

//         const episodesToAdd = [];

//         for (let i = 1; i <= episodeNum; i++) {
//             episodesToAdd.push({
//                 title: title,
//                 seasonNum,
//                 episodeNum: i,
//                 seriesId,
//             });
//         }

//         const result = await episodesService.addEpisodes(episodesToAdd);
//         res.send(result);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }


    // try {
    //     const { seasons } = req.body;

    //     if (!Array.isArray(seasons)) {
    //         return res.status(400).send('Seasons must be an array');
    //     }

    //     const episodesToAdd = [];

    //     // לולאת seasons שמכילה את כל העונות עם כמות הפרקים
    //     for (let season of seasons) {
    //         const { title, seriesId, seasonNum, episodesAmount } = season;

    //         for (let i = 1; i <= episodesAmount; i++) {
    //             episodesToAdd.push({
    //                 title: '', // כותרת נשארת ריקה - תוגדר בצד ה-Frontend
    //                 seasonNum,
    //                 episodeNum: i,
    //                 seriesId,
    //             });
    //         }
    //     }

    //     const result = await episodesService.addEpisodes(episodesToAdd);

    //     res.send(result);
    // } catch (err) {
    //     res.status(500).send(err.message);
    // }

    // try {
    //     const { title, seasonNum, episodesAmount, seriesId } = req.body;

    //     const episodesToAdd = [];

    //     for (let i = 1; i <= episodesAmount; i++) {
    //         episodesToAdd.push({
    //             title: `${title} - Episode ${i}`,
    //             seasonNum,
    //             episodeNum: i,
    //             seriesId,
    //         });
    //     }

    //     const result = await episodesService.addEpisodes(episodesToAdd);

    //     res.send(result);
    // } catch (err) {
    //     res.status(500).send(err.message);
    // }
// }

async function addWatch(req, res) {
    try {
        const { userId, episodeId } = req.body;
        const result = await episodesService.addWatch(userId, episodeId);
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

async function getUsersWhoWatched(req, res) {
    try {
        const { id } = req.params;
        console.log("Received request for users in episode:", id);

        const users = await episodesService.getUsersWhoWatched(id);

        if (users.error) {
            return res.status(404).json({ message: users.error });
        }

        res.json(users);
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


// async function getUsersWhoWatched(req, res) {
//     try {
//         const episodeId  = req.params;
//         const result = await episodesService.getUsersWhoWatched(Number(episodeId));
//         res.send(result)
//     }
//     catch (err) {
//         console.error("Error fetching users who watched:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// }


async function updateEpisode(req, res) {
    try {
        const id = req.params.id;
        const updates = req.body;
        const result = await episodesService.updateEpisode(Number(id), updates);
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

async function deleteEpisode(req, res) {
    try {
        const id = req.params.id;
        const result = await episodesService.deleteEpisode(Number(id));
        res.json(result)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    getAllEpisodes,
    getEpisodeBySeriesId,
    addEpisodes,
    addWatch,
    getUsersWhoWatched,
    updateEpisode,
    deleteEpisode
}