import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {
    Box,
    ClickAwayListener,
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Typography
} from '@mui/material';

// project imports
import NavItem from './NavItem';
import Transitions from 'components/extended/Transitions';
import { useAppSelector } from 'app/hooks';
import useConfig from 'hooks/useConfig';
import { getUserInfoCookies } from 'utils/cookies';
import { NavItemType } from 'types';
import { userAuthorization } from 'utils/authorization';
import { IUserInfo } from 'types/authentication';

// assets
import { IconChevronDown, IconChevronRight, IconChevronUp } from '@tabler/icons';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// mini-menu - wrapper
const PopperStyledMini = styled(Popper)(({ theme }) => ({
    overflow: 'visible',
    zIndex: 1202,
    minWidth: 180,
    '&:before': {
        content: '""',
        backgroundColor: theme.palette.background.paper,
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 120,
        borderLeft: `1px solid ${theme.palette.divider}`,
        borderBottom: `1px solid ${theme.palette.divider}`
    }
}));

// ==============================|| SIDEBAR MENU LIST COLLAPSE ITEMS ||============================== //

type VirtualElement = {
    getBoundingClientRect: () => ClientRect | DOMRect;
    contextElement?: Element;
};

interface NavCollapseProps {
    menu: NavItemType;
    level: number;
    parentId: string;
}

const NavCollapse = ({ menu, level, parentId }: NavCollapseProps) => {
    const theme = useTheme();
    const userInfo = getUserInfoCookies() as IUserInfo;

    const { borderRadius } = useConfig();
    const { drawerOpen } = useAppSelector((state) => state.menu);

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string | null | undefined>(null);
    const [anchorEl, setAnchorEl] = useState<VirtualElement | (() => VirtualElement) | null | undefined>(null);

    const handleClickMini = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement, MouseEvent> | undefined) => {
        setAnchorEl(null);
        if (drawerOpen) {
            setOpen(!open);
            setSelected(!selected ? menu.id : null);
        } else {
            setAnchorEl(event?.currentTarget);
        }
    };

    const handleClosePopper = () => {
        setOpen(false);
        setSelected(null);
        setAnchorEl(null);
    };

    const openMini = Boolean(anchorEl);
    const { pathname } = useLocation();

    const checkOpenForParent = (child: NavItemType[], id: string) => {
        child.forEach((item: NavItemType) => {
            if (item.url === pathname) {
                setOpen(true);
                setSelected(id);
            }
        });
    };

    // menu collapse for sub-levels
    useEffect(() => {
        setOpen(false);
        setSelected(null);
        if (openMini) setAnchorEl(null);
        if (menu.children) {
            menu.children.forEach((item: NavItemType) => {
                if (item.children?.length) {
                    checkOpenForParent(item.children, menu.id!);
                }
                if (item.url === pathname) {
                    setSelected(menu.id);
                    setOpen(true);
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, menu.children]);

    // menu collapse & item
    const menus = menu.children?.map((item) => {
        const { isAllowFunctions } = userAuthorization(userInfo?.groups, item.access);
        switch (item.type) {
            case 'collapse':
                return (
                    (isAllowFunctions || !item.access) && <NavCollapse key={item.id} menu={item} level={level + 1} parentId={parentId} />
                );
            case 'item':
                return (isAllowFunctions || !item.access) && <NavItem key={item.id} item={item} level={level + 1} parentId={parentId} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    const isSelected = selected === menu.id;

    const Icon = menu.icon!;
    const menuIcon = menu.icon ? (
        <Icon
            strokeWidth={1.5}
            size={drawerOpen ? '20px' : '24px'}
            style={{ color: isSelected ? theme.palette.secondary.main : theme.palette.text.primary }}
        />
    ) : (
        <FiberManualRecordIcon
            sx={{
                color: isSelected ? theme.palette.secondary.main : theme.palette.text.primary,
                width: isSelected ? 8 : 6,
                height: isSelected ? 8 : 6
            }}
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    );

    const collapseIcon = drawerOpen ? (
        <IconChevronUp stroke={1.5} size="16px" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
    ) : (
        <IconChevronRight stroke={1.5} size="16px" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
    );

    const textColor = theme.palette.mode === 'dark' ? 'grey.400' : 'text.primary';
    const iconSelectedColor = theme.palette.mode === 'dark' && drawerOpen ? 'text.primary' : 'secondary.main';

    return (
        <>
            <ListItemButton
                sx={{
                    zIndex: 1201,
                    borderRadius: `${borderRadius}px`,
                    mb: 0.5,
                    pl: drawerOpen ? `${level * 24}px` : 1.25,
                    ...(drawerOpen &&
                        level === 1 &&
                        theme.palette.mode !== 'dark' && {
                            '&:hover': {
                                background: theme.palette.secondary.light
                            },
                            '&.Mui-selected': {
                                background: theme.palette.secondary.light,
                                color: iconSelectedColor,
                                '&:hover': {
                                    color: iconSelectedColor,
                                    background: theme.palette.secondary.light
                                }
                            }
                        }),
                    ...((!drawerOpen || level !== 1) && {
                        py: level === 1 ? 0 : 1,
                        '&:hover': {
                            bgcolor: 'transparent'
                        },
                        '&.Mui-selected': {
                            '&:hover': {
                                bgcolor: 'transparent'
                            },
                            bgcolor: 'transparent'
                        }
                    })
                }}
                selected={isSelected}
                {...(!drawerOpen && { onMouseEnter: handleClickMini, onMouseLeave: handleClosePopper })}
                onClick={handleClickMini}
            >
                {menuIcon && (
                    <ListItemIcon
                        sx={{
                            minWidth: level === 1 ? 30 : 18,
                            color: isSelected ? iconSelectedColor : textColor,
                            ...(!drawerOpen &&
                                level === 1 && {
                                    borderRadius: `${borderRadius}px`,
                                    width: 46,
                                    height: 46,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    '&:hover': {
                                        bgcolor: theme.palette.mode === 'dark' ? theme.palette.secondary.main + 25 : 'secondary.light'
                                    },
                                    ...(isSelected && {
                                        bgcolor: theme.palette.mode === 'dark' ? theme.palette.secondary.main + 25 : 'secondary.light',
                                        '&:hover': {
                                            bgcolor: theme.palette.mode === 'dark' ? theme.palette.secondary.main + 30 : 'secondary.light'
                                        }
                                    })
                                })
                        }}
                    >
                        {menuIcon}
                    </ListItemIcon>
                )}
                {(drawerOpen || (!drawerOpen && level !== 1)) && (
                    <ListItemText
                        primary={
                            <Typography variant={isSelected ? 'h5' : 'body1'} color="inherit" sx={{ my: 'auto' }}>
                                {menu.title}
                            </Typography>
                        }
                    />
                )}

                {openMini || open ? (
                    collapseIcon
                ) : (
                    <IconChevronDown stroke={1.5} size="16px" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
                )}

                {!drawerOpen && (
                    <PopperStyledMini
                        open={openMini}
                        anchorEl={anchorEl}
                        placement="right-start"
                        style={{
                            zIndex: 2001
                        }}
                        modifiers={[
                            {
                                name: 'offset',
                                options: {
                                    offset: [-12, 0]
                                }
                            }
                        ]}
                    >
                        {({ TransitionProps }) => (
                            <Transitions in={openMini} {...TransitionProps}>
                                <Paper
                                    sx={{
                                        overflow: 'hidden',
                                        mt: 1.5,
                                        boxShadow: theme.shadows[8],
                                        backgroundImage: 'none'
                                    }}
                                >
                                    <ClickAwayListener onClickAway={handleClosePopper}>
                                        <Box>{menus}</Box>
                                    </ClickAwayListener>
                                </Paper>
                            </Transitions>
                        )}
                    </PopperStyledMini>
                )}
            </ListItemButton>
            {drawerOpen && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {open && (
                        <List
                            component="div"
                            disablePadding
                            sx={{
                                position: 'relative',
                                '&:after': {
                                    content: "''",
                                    position: 'absolute',
                                    left: '32px',
                                    top: 0,
                                    height: '100%',
                                    width: '1px',
                                    opacity: theme.palette.mode === 'dark' ? 0.2 : 1,
                                    background: theme.palette.mode === 'dark' ? theme.palette.dark.light : theme.palette.primary.light
                                }
                            }}
                        >
                            {menus}
                        </List>
                    )}
                </Collapse>
            )}
        </>
    );
};

export default NavCollapse;
