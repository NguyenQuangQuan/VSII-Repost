import { memo } from 'react';

// material-ui
import { Typography } from '@mui/material';

// project imports
import menuItem from 'menu-items';
import { NavItemType } from 'types';
import { IUserInfo } from 'types/authentication';
import { userAuthorization } from 'utils/authorization';
import { getUserInfoCookies } from 'utils/cookies';
import NavGroup from './NavGroup';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    // last menu-item to show in horizontal menu bar
    const lastItem = null;

    const userInfo = getUserInfoCookies() as IUserInfo;
    let lastItemIndex = menuItem.items.length - 1;
    let remItems: NavItemType[] = [];
    let lastItemId: string;

    if (lastItem && lastItem < menuItem.items.length) {
        lastItemId = menuItem.items[lastItem - 1].id!;
        lastItemIndex = lastItem - 1;
        remItems = menuItem.items.slice(lastItem - 1, menuItem.items.length).map((item: NavItemType) => ({
            title: item.title,
            elements: item.children
        }));
    }

    const navItems = menuItem.items.slice(0, lastItemIndex + 1).map((item: NavItemType) => {
        // const { isAllowFunctions } = userAuthorization(userInfo.groups, item.access);

        switch (item.type) {
            case 'group':
                return (
                    // (isAllowFunctions || !item.access) && (
                    <NavGroup key={item.id} item={item} lastItem={lastItem!} remItems={remItems} lastItemId={lastItemId} />
                    // )
                );
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

export default memo(MenuList);
