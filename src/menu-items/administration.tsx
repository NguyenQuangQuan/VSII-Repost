// third-party
import { FormattedMessage } from 'react-intl';

// project imports
import {
    ManageUser,
    ManageProject,
    ManageHoliday,
    ManageSpecialHours,
    ManageGroup,
    ManageRank,
    SystemConfig,
    EmailConfig
} from 'components/icons';
import { MAIN_FUNCTIONS } from 'constants/Permission';
import { ROUTER } from 'constants/Routers';
import { NavItemType } from 'types';

// constant
const icons = {
    ManageUser,
    ManageProject,
    ManageHoliday,
    ManageSpecialHours,
    ManageGroup,
    ManageRank,
    SystemConfig,
    EmailConfig
};

// ==============================|| EXTRA administration MENU ITEMS ||============================== //

const administration: NavItemType = {
    id: 'administration',
    title: <FormattedMessage id="administration" />,
    type: 'group',
    access: MAIN_FUNCTIONS.admin.root,
    children: [
        {
            id: 'manage-user',
            title: <FormattedMessage id="manage-user" />,
            type: 'item',
            url: `/${ROUTER.administration.manage_user}`,
            icon: icons.ManageUser,
            access: MAIN_FUNCTIONS.admin.user,
            breadcrumbs: true
        },
        {
            id: 'manage-project',
            title: <FormattedMessage id="manage-project" />,
            type: 'item',
            url: `/${ROUTER.administration.manage_project}`,
            icon: icons.ManageProject,
            access: MAIN_FUNCTIONS.admin.project,
            breadcrumbs: true
        },
        {
            id: 'manage-holiday',
            title: <FormattedMessage id="manage-holiday" />,
            type: 'item',
            url: `/${ROUTER.administration.manage_holiday}`,
            icon: icons.ManageHoliday,
            access: MAIN_FUNCTIONS.admin.holidays,
            breadcrumbs: true
        },
        {
            id: 'manage-special-hours',
            title: <FormattedMessage id="manage-special-hours" />,
            type: 'item',
            url: `/${ROUTER.administration.manage_special_hours}`,
            icon: icons.ManageSpecialHours,
            access: MAIN_FUNCTIONS.admin.specialHours,
            breadcrumbs: true
        },
        {
            id: 'manage-group',
            title: <FormattedMessage id="manage-group" />,
            type: 'item',
            url: `/${ROUTER.administration.manage_group}`,
            icon: icons.ManageGroup,
            breadcrumbs: true,
            access: MAIN_FUNCTIONS.admin.group
        },
        {
            id: 'manage-rank',
            title: <FormattedMessage id="manage-rank" />,
            type: 'item',
            url: `/${ROUTER.administration.manage_rank}`,
            icon: icons.ManageRank,
            breadcrumbs: true,
            access: MAIN_FUNCTIONS.admin.rank
        },
        {
            id: 'system-config',
            title: <FormattedMessage id="system-config" />,
            type: 'item',
            icon: icons.SystemConfig,
            url: `/${ROUTER.administration.system_config}`,
            breadcrumbs: true,
            access: MAIN_FUNCTIONS.admin.systemConfig
        },
        {
            id: 'email-config',
            title: <FormattedMessage id="email-config" />,
            type: 'item',
            icon: icons.EmailConfig,
            url: `/${ROUTER.administration.email_config}`,
            breadcrumbs: true,
            access: MAIN_FUNCTIONS.admin.emailConfig
        }
    ]
};

export default administration;
