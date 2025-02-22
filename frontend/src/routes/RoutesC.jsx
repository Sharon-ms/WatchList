import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx'

import ViewSeries from '../pages/seriesCRUD/ViewSeries.jsx';
import CreateSeries from '../pages/seriesCRUD/CreateSeries.jsx';
import EditSeries from '../pages/seriesCRUD/EditSeries.jsx';
import AddEpisodes from '../pages/seriesCRUD/AddEpisodes.jsx';


import ViewUsers from '../pages/usersCRUD/ViewUsers.jsx';
import CreateUser from '../pages/usersCRUD/CreateUser.jsx';
import ViewUser from '../pages/usersCRUD/ViewUser.jsx';
import EditUser from '../pages/usersCRUD/EditUser.jsx';

const RoutesC = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/view_series" element={<ViewSeries />} />
                <Route path="/create_series" element={<CreateSeries />} />
                <Route path="/edit_series" element={<EditSeries />} />

                <Route path="/add_episodes" element={<AddEpisodes />} />


                <Route path="/view_users" element={<ViewUsers />} />
                <Route path="/create_user" element={<CreateUser />} />
                <Route path="/view_user" element={<ViewUser />} />
                <Route path="/edit_user" element={<EditUser />} />
            </Routes >
        </div>
    )
}

export default RoutesC

