import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// material-ui
import { Divider, List, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import { useAppDispatch, useAppSelector } from 'app/hooks';
import useConfig from 'hooks/useConfig';
import { activeID } from 'store/slice/menuSlice';
import { NavItemType } from 'types';
import { IUserInfo } from 'types/authentication';
import { userAuthorization } from 'utils/authorization';
import { getUserInfoCookies } from 'utils/cookies';
import NavCollapse from './NavCollapse';
import NavItem from './NavItem';

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

type VirtualElement = {
    getBoundingClientRect: () => ClientRect | DOMRect;
    contextElement?: Element;
};

interface NavGroupProps {
    item: NavItemType;
    lastItem: number;
    remItems: NavItemType[];
    lastItemId: string;
}

const NavGroup = ({ item, lastItem, remItems, lastItemId }: NavGroupProps) => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const userInfo = getUserInfoCookies() as IUserInfo;

    const { pathname } = useLocation();
    const { drawerOpen } = useAppSelector((state) => state.menu);
    const { layout } = useConfig();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const [anchorEl, setAnchorEl] = useState<VirtualElement | (() => VirtualElement) | null | undefined>(null);
    const [currentItem, setCurrentItem] = useState(item);

    const openMini = Boolean(anchorEl);

    useEffect(() => {
        if (lastItem) {
            if (item.id === lastItemId) {
                const localItem: any = { ...item };
                const elements = remItems.map((ele: NavItemType) => ele.elements);
                localItem.children = elements.flat(1);
                setCurrentItem(localItem);
            } else {
                setCurrentItem(item);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item, lastItem, layout, matchDownMd]);

    const checkOpenForParent = (child: NavItemType[], id: string) => {
        child.forEach((ele: NavItemType) => {
            if (ele.children?.length) {
                checkOpenForParent(ele.children, currentItem.id!);
            }
            if (ele.url === pathname) {
                dispatch(activeID(id));
            }
        });
    };

    const checkSelectedOnload = (data: NavItemType) => {
        const childrens = data.children ? data.children : [];
        childrens.forEach((itemCheck: NavItemType) => {
            if (itemCheck.children?.length) {
                checkOpenForParent(itemCheck.children, currentItem.id!);
            }
            if (itemCheck.url === pathname) {
                dispatch(activeID(currentItem.id!));
            }
        });
    };

    // keep selected-menu on page load and use for horizontal menu close on change routes
    useEffect(() => {
        checkSelectedOnload(currentItem);
        if (openMini) setAnchorEl(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, currentItem]);

    // menu list collapse & items
    const items = currentItem.children?.map((menu) => {
        const { isAllowFunctions } = userAuthorization(userInfo.groups, menu.access);
        switch (menu.type) {
            case 'collapse':
                return (isAllowFunctions || !menu.access) && <NavCollapse key={menu.id} menu={menu} level={1} parentId={currentItem.id!} />;
            case 'item':
                return (isAllowFunctions || !menu.access) && <NavItem key={menu.id} item={menu} level={1} parentId={currentItem.id!} />;
            default:
                return (
                    <Typography key={menu.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return (
        <>
            <List
                disablePadding={!drawerOpen}
                subheader={
                    currentItem.title &&
                    drawerOpen && (
                        <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
                            {currentItem.title}
                            {currentItem.caption && (
                                <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                                    {currentItem.caption}
                                </Typography>
                            )}
                        </Typography>
                    )
                }
            >
                {items}
            </List>

            {/* group divider */}
            {drawerOpen && <Divider sx={{ mt: 0.25, mb: 1.25 }} />}
        </>
    );
};

export default NavGroup;
