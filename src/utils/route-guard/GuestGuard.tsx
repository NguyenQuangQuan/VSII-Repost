import { Navigate, Outlet } from 'react-router-dom';

// project imports
import { DASHBOARD_PATH } from 'constants/Config';
import { getCookieByKey } from 'utils/cookies';

// ==============================|| GUEST GUARD ||============================== //

const useAuth = () => {
    const accessToken = getCookieByKey('accessToken');
    if (accessToken) return true;

    return false;
};

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard = () => {
    const auth = useAuth();

    return auth ? <Navigate to={DASHBOARD_PATH} /> : <Outlet />;
};

export default GuestGuard;
