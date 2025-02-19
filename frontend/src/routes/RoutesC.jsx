import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx'
import ViewSeries from '../pages/seriesCRUD/ViewSeries.jsx';
import CreateSeries from '../pages/seriesCRUD/CreateSeries.jsx';
import EditSeries from '../pages/seriesCRUD/EditSeries.jsx';

const RoutesC = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/view_series" element={<ViewSeries />} />
                <Route path="/create_series" element={<CreateSeries />} />
                <Route path="/edit_series" element={<EditSeries />} />
            </Routes >
        </div>
    )
}

export default RoutesC

