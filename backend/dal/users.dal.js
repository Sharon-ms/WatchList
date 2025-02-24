const { User, Series, Episode } = require('./db');

async function getAllUsers(pageNumber, pageSize) {
    return User.findAll(
        {
            // include: [Episode],
            offset: pageNumber * pageSize,
            limit: pageSize
        }
    );
}

async function getUserById(id) {
    return User.findByPk(id, { include: [Episode] })
}

async function getUserWatchedEpisodes(userId) {
    try {
        console.log("Fetching watched episodes for user:", userId);

        const user = await User.findByPk(userId, {
            include: {
                model: Episode,
                include: {
                    model: Series,  // הוספת המודל של הסדרה
                    attributes: ["title"], // שליפת שם הסדרה
                },
                through: { attributes: [] }, // כדי לא לקבל מידע נוסף מהטבלה המקשרת
            }
        });

        if (!user) {
            console.warn(`User with ID ${userId} not found`);
            return { error: "User not found" };
        }

        return user.Episodes.map(ep => ({
            id: ep.id,
            title: ep.title,
            episodeNum: ep.episodeNum,
            seriesTitle: ep.Series?.title || "Unknown Series", // שליפת שם הסדרה
            seasonNumber: ep.seasonNum
        }));
    } catch (error) {
        console.error("Error fetching watched episodes:", error);
        throw new Error("Database query failed");
    }
}


// async function getUserWatchedEpisodes(userId) {
//     try {
//         console.log("Fetching watched episodes for user:", userId);

//         const user = await User.findByPk(userId, {
//             include: {
//                 model: Episode,
//                 through: { attributes: [] }, // כדי לא לקבל מידע נוסף מהטבלה המקשרת
//             }
//         });

//         if (!user) {
//             console.warn(`User with ID ${userId} not found`);
//             return { error: "User not found" };
//         }

//         return user.Episodes.map(ep => ({
//             id: ep.id,
//             title: ep.title,
//             episodeNum: ep.episodeNum,
//             seriesTitle: ep.seriesTitle,
//             seasonNumber: ep.seasonNumber
//         }));
//     } catch (error) {
//         console.error("Error fetching watched episodes:", error);
//         throw new Error("Database query failed");
//     }
// }

// const deleteWatchedEpisode = async (userId, episodeId) => {
//     try {
//         const result = await Watched.destroy({
//             where: { UserId: userId, EpisodeId: episodeId }
//         });

//         return result > 0; 
//     } catch (error) {
//         console.error("Error in deleteWatchedEpisode:", error);
//         throw error;
//     }
// };

const deleteWatchedEpisode = async (userId, episodeId) => {
    try {
        // מוצאים את המשתמש לפי מזהה
        const user = await User.findByPk(userId);
        
        if (!user) {
            console.error("User not found");
            return false;  
        }

        const result = await user.removeEpisode(episodeId);

        return result > 0;
    } catch (error) {
        console.error("Error in deleteWatchedEpisode:", error);
        throw error;
    }
};



async function addUser(newUser) {
    return User.create(newUser)
}

async function updateUser(id, update) {
    return User.update(update, { where: { id: id } })
}

async function deleteUser(id) {
    return User.destroy({ where: { id: id } })
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserWatchedEpisodes,
    deleteWatchedEpisode,
    addUser,
    updateUser,
    deleteUser
} 