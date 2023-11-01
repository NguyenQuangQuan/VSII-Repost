// third-party
import { FormattedMessage } from 'react-intl';

// project import
import { DashBoard } from 'components/icons';
import { ROUTER } from 'constants/Routers';
import { NavItemType } from 'types';

// constant
const icons = {
    DashBoard
};

const dashboard: NavItemType = {
    id: '',
    title: <FormattedMessage id="dashboard" />,
    type: 'group',
    children: [
        {
            id: '',
            title: <FormattedMessage id="dashboard" />,
            type: 'item',
            url: ROUTER.home.index,
            icon: icons.DashBoard,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
