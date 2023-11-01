// project import
import dashboard from './dashboard';
import administration from './administration';
import reports from './reports';
import workingCalendar from './workingCalendar';
// types
import { NavItemType } from 'types';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
    items: [dashboard, administration, workingCalendar, reports]
};

export default menuItems;
