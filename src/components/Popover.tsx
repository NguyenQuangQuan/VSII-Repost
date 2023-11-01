import React from 'react';
import { Popover as MuiPopover, PopoverVirtualElement } from '@mui/material';

interface IPopoverProps {
    anchorEl: Element | (() => Element) | PopoverVirtualElement | (() => PopoverVirtualElement) | null | undefined;
    handleClose: ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void) | undefined;
    children: React.ReactNode;
    sx?: any;
}

const Popover = (props: IPopoverProps) => {
    const { anchorEl, handleClose, children, sx } = props;
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <MuiPopover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
            sx={sx}
        >
            {children}
        </MuiPopover>
    );
};

export default Popover;
