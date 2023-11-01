import { LAYOUT_CONST } from 'constants/Common';

// types
import { ConfigProps } from 'types';

export const BASE_PATH = '';

export const DASHBOARD_PATH = '/';

export const HORIZONTAL_MAX_ITEM = 6;

const Config: ConfigProps = {
    layout: LAYOUT_CONST.VERTICAL_LAYOUT, // vertical, horizontal
    drawerType: LAYOUT_CONST.DEFAULT_DRAWER, // default, mini-drawer
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 8,
    outlinedFilled: true,
    navType: 'light', // light, dark
    presetColor: 'default', // default, theme1, theme2
    locale: 'en', // 'en' - English, 'vi' - Vietnamese
    container: false
};

export default Config;
