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
        const { title, seasonNum, episodesAmount, seriesId } = req.body;

        if (!title || !seasonNum || !episodesAmount || !seriesId) {
            return res.status(400).send('Missing required fields');
        }

        const episodesToAdd = [];

        for (let i = 1; i <= episodesAmount; i++) {
            episodesToAdd.push({
                title: title,
                seasonNum,
                episodeNum: i,
                seriesId,
            });
        }

        const result = await episodesService.addEpisodes(episodesToAdd);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }


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
}

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
    updateEpisode,
    deleteEpisode
}