const { User, Series, Episode } = require('../dal/db');

async function getAllEpisodes(pageNumber, pageSize) {
    return Episode.findAll(
        {
            include: [Series],
            offset: pageNumber * pageSize,
            limit: pageSize
        }
    );
}

async function getEpisodeById(id) {
    return Episode.findByPk(id);
}


async function getEpisodesBySeriesId(seriesId) {
    // return Episode.findByPk(id,
    // { include: [Series]
    return Episode.findAll({
        where: { seriesId }
    });
}

async function addEpisodes(newEpisode) {
    return Episode.create(newEpisode)
    // return Episode.bulkCreate(newEpisode)
}

async function addWatch(userId, episodeId) {
    const user = await User.findByPk(userId);
    const episode = await Episode.findByPk(episodeId);

    if (!user || !episode) {
        throw new Error("User or Episode not found");
    }

    await user.addEpisode(episode);
    return User.findOne({
        where: { id: userId },
        include: [Episode]
    })
}

async function getUsersWhoWatched(episodeId) {
    try {
        console.log("Fetching users for episode:", episodeId); // בודק שהערך מתקבל

        const episode = await Episode.findByPk(episodeId, {
            include: {
                model: User,
                through: { attributes: [] }, // לא מחזיר נתונים מהטבלה המקשרת
            }
        });

        if (!episode) {
            console.warn(`Episode with ID ${episodeId} not found`);
            return { error: "Episode not found" };
        }

        console.log("Users found for episode:", episode.Users);
        return episode.Users;
    } catch (error) {
        console.error("Error fetching users for episode:", error);
        throw new Error("Database query failed");
    }
}


// async function getUsersWhoWatched(id) {
//     try {
//         const episode = await Episode.findByPk(id, {
//             include: {
//                 model: User,
//                 through: { attributes: [] }, 
//             },
//         });

//         if (!episode) {
//             return null; 
//         }

//         return episode.Users;
//     } catch (error) {
//         console.error("Error fetching users who watched:", error);
//         throw error;
//     }
// }



async function updateEpisode(id, update) {
    return Episode.update(update, { where: { id: id } })
}

async function deleteEpisode(id) {
    return Episode.destroy({ where: { id: id } })
}

module.exports = {
    getAllEpisodes,
    getEpisodeById,
    getEpisodesBySeriesId,
    addEpisodes,
    addWatch,
    getUsersWhoWatched,
    updateEpisode,
    deleteEpisode
} 