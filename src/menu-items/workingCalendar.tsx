// third-party
import { FormattedMessage } from 'react-intl';

// project imports
import { RegisterWorkingCalendar } from 'components/icons';
import { MAIN_FUNCTIONS } from 'constants/Permission';
import { ROUTER } from 'constants/Routers';
import { NavItemType } from 'types';

// constant
const icons = {
    RegisterWorkingCalendar
};

// ==============================|| EXTRA WORKING CALENDAR MENU ITEMS ||============================== //

const workingCalendar: NavItemType = {
    id: 'workingCalender',
    title: <FormattedMessage id="hr" />,
    type: 'group',
    access: MAIN_FUNCTIONS.workingCalendar.registerWorkingCalendar,
    children: [
        {
            id: 'hr-working-calendar',
            title: <FormattedMessage id="hr-working-calendar" />,
            type: 'item',
            url: `/${ROUTER.workingCalendar.register_working_calendar}`,
            icon: icons.RegisterWorkingCalendar,
            breadcrumbs: true,
            access: MAIN_FUNCTIONS.workingCalendar.registerWorkingCalendar
        }
    ]
};

export default workingCalendar;
