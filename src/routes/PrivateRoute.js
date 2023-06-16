import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import TableUsers from '~/components/TableUsers';
import { UserContext } from '../context/UserContext';
import { Alert } from 'react-bootstrap';
const PrivateRoute = (props) => {
    const { user, loginContext } = useContext(UserContext);

    if (user && !user.auth) {
        return (
            <>
                <Alert variant="danger" className="mt-3">
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>You don't have permisson to access this page.</p>
                </Alert>
            </>
        );
    }
    console.log('sađadaddad');
    return <>{props.children}</>;
};
export default PrivateRoute;
