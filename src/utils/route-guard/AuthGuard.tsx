import { Navigate, Outlet, useLocation } from 'react-router-dom';

// project imports
import { DASHBOARD_PATH } from 'constants/Config';
import { ROUTER } from 'constants/Routers';
import { IUserInfo } from 'types/authentication';
import { userAuthorization } from 'utils/authorization';
import { getCookieByKey, getUserInfoCookies } from 'utils/cookies';

// ==============================|| AUTH GUARD ||============================== //

const useAuth = () => {
    const accessToken = getCookieByKey('accessToken');
    if (accessToken) return true;

    return false;
};

/**
 * Authentication guard for routes
 * @param permissionRequired string
 */
const AuthGuard = ({ permissionRequired }: { permissionRequired?: string[] }) => {
    const location = useLocation();

    const auth = useAuth();
    if (auth) {
        const userInfo = getUserInfoCookies() as IUserInfo;
        const { isAllowFunctions } = userAuthorization(userInfo.groups, permissionRequired);
        if (permissionRequired) {
            return auth ? isAllowFunctions ? <Outlet /> : <Navigate to={DASHBOARD_PATH} /> : <Navigate to={ROUTER.authentication.login} />;
        } else {
            return auth ? <Outlet /> : <Navigate to={ROUTER.authentication.login} />;
        }
    } else {
        return <Navigate to={ROUTER.authentication.login} replace state={{ from: location }} />;
    }
};

export default AuthGuard;
