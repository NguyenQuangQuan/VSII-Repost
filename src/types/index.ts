/* eslint-disable prettier/prettier */
import React, { FunctionComponent, ReactElement, ReactNode } from 'react';

// material-ui
import { SvgIconTypeMap, ChipProps } from '@mui/material';

import { OverridableComponent } from '@mui/material/OverridableComponent';

// project imports
import { TablerIcon } from '@tabler/icons';

export * from './common';
export * from './config';
export * from './menu';
export * from './snackbar';
export * from './weekly-effort';
export * from './monthly-effort';
export * from './list-project-team';
export * from './non-billable-monitoring';
export * from './monthly-project-cost';
export * from './cost-monitoring';
export * from './administration';
export * from './master';
export * from './sales';
export * from './skills-manage';

export type Direction = 'up' | 'down' | 'right' | 'left';

export interface TabsProps {
    children?: React.ReactElement | React.ReactNode | string;
    value: string | number;
    index: number;
}

export interface GenericCardProps {
    title?: string;
    primary?: string | number | undefined;
    secondary?: string;
    content?: string;
    image?: string;
    dateTime?: string;
    iconPrimary?: OverrideIcon;
    color?: string;
    size?: string;
}

export type OverrideIcon =
    | (OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
        muiName: string;
    })
    | React.ComponentClass<any>
    | FunctionComponent<any>
    | TablerIcon;

export type LinkTarget = '_blank' | '_self' | '_parent' | '_top';

export type NavItemTypeObject = { children?: NavItemType[]; items?: NavItemType[]; type?: string };

export type NavItemType = {
    id?: string;
    icon?: GenericCardProps['iconPrimary'];
    target?: boolean;
    external?: boolean;
    url?: string | undefined;
    type?: string;
    title?: ReactNode | string;
    color?: 'primary' | 'secondary' | 'default' | undefined;
    caption?: ReactNode | string;
    breadcrumbs?: boolean;
    disabled?: boolean;
    chip?: ChipProps;
    children?: NavItemType[];
    elements?: NavItemType[];
    search?: string;
    access?: string[];
};

export interface ColorProps {
    readonly [key: string]: string;
}

export type GuardProps = {
    children: ReactElement | null;
};

export interface StringColorProps {
    id?: string;
    label?: string;
    color?: string;
    primary?: string;
    secondary?: string;
}

/** ---- Common Functions types ---- */

export type StringBoolFunc = (s: string) => boolean;
export type StringNumFunc = (s: string) => number;
export type NumbColorFunc = (n: number) => StringColorProps | undefined;
export type ChangeEventFunc = (e: React.ChangeEvent<HTMLInputElement>) => void;

// amit

export type KeyedObject = {
    [key: string]: string | number | KeyedObject | any;
};
