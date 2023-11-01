import React, { ReactNode } from 'react';
// material-ui
import { ButtonProps, Button as MuiButton, styled } from '@mui/material';

interface IButtonProps {
    children: ReactNode;
    buttonProps?: ButtonProps;
    type?: 'button' | 'submit' | 'reset' | undefined;
    size?: 'small' | 'medium' | 'large' | undefined;
    variant?: 'text' | 'outlined' | 'contained' | undefined;
}

const Button = (props: IButtonProps) => {
    const { children, type, size, variant, ...buttonProps } = props;
    return (
        <MuiButtonStyle fullWidth type={type} size={size} variant={variant} {...buttonProps}>
            {children}
        </MuiButtonStyle>
    );
};

const MuiButtonStyle = styled(MuiButton)({});

export default Button;
