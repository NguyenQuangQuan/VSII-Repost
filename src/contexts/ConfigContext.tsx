import { createContext, ReactNode } from 'react';

// project import
import defaultConfig from 'constants/Config';
import useLocalStorage from 'hooks/useLocalStorage';

// types
import { PaletteMode } from '@mui/material';
import { CustomizationProps } from 'types';

// initial state
const initialState: CustomizationProps = {
    ...defaultConfig,
    onChangeLayout: () => {},
    onChangeDrawer: () => {},
    onChangeMenuType: () => {},
    onChangePresetColor: () => {},
    onChangeLocale: () => {},
    onChangeContainer: () => {},
    onChangeFontFamily: () => {},
    onChangeBorderRadius: () => {},
    onChangeOutlinedField: () => {}
};

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext(initialState);

type ConfigProviderProps = {
    children: ReactNode;
};

function ConfigProvider({ children }: ConfigProviderProps) {
    const [config, setConfig] = useLocalStorage('qa-report-config', {
        layout: initialState.layout,
        drawerType: initialState.drawerType,
        fontFamily: initialState.fontFamily,
        borderRadius: initialState.borderRadius,
        outlinedFilled: initialState.outlinedFilled,
        navType: initialState.navType,
        presetColor: initialState.presetColor,
        locale: initialState.locale
    });

    const onChangeLayout = (layout: string) => {
        setConfig({
            ...config,
            layout
        });
    };

    const onChangeDrawer = (drawerType: string) => {
        setConfig({
            ...config,
            drawerType
        });
    };

    const onChangeMenuType = (navType: PaletteMode) => {
        setConfig({
            ...config,
            navType
        });
    };

    const onChangePresetColor = (presetColor: string) => {
        setConfig({
            ...config,
            presetColor
        });
    };

    const onChangeLocale = (locale: string) => {
        setConfig({
            ...config,
            locale
        });
    };

    const onChangeContainer = () => {
        setConfig({
            ...config,
            container: !config.container
        });
    };

    const onChangeFontFamily = (fontFamily: string) => {
        setConfig({
            ...config,
            fontFamily
        });
    };

    const onChangeBorderRadius = (event: Event, newValue: number | number[]) => {
        setConfig({
            ...config,
            borderRadius: newValue as number
        });
    };

    const onChangeOutlinedField = (outlinedFilled: boolean) => {
        setConfig({
            ...config,
            outlinedFilled
        });
    };

    return (
        <ConfigContext.Provider
            value={{
                ...config,
                onChangeLayout,
                onChangeDrawer,
                onChangeMenuType,
                onChangePresetColor,
                onChangeLocale,
                onChangeContainer,
                onChangeFontFamily,
                onChangeBorderRadius,
                onChangeOutlinedField
            }}
        >
            {children}
        </ConfigContext.Provider>
    );
}

export { ConfigProvider, ConfigContext };
