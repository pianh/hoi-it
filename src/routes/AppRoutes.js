import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import TableUsers from '../components/TableUsers';
import Login from '../components/Login';
import PrivateRoute from './PrivateRoute';
const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                {/* <PrivateRoute path="/users">
                <TableUsers />
            </PrivateRoute> */}
                <Route
                    path="/users"
                    element={
                        <PrivateRoute>
                            <TableUsers />
                        </PrivateRoute>
                    }
                ></Route>
            </Routes>
        </>
    );
};
export default AppRoutes;
