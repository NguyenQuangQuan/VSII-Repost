import React, { SyntheticEvent } from 'react';

// material-ui
import { useTheme } from '@mui/material';

// project imports
import MainCard from 'components/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { Tabs } from 'components/extended/Tabs';
import { ITabs } from 'types';
import { checkAllowedTab } from 'utils/authorization';

interface ITabCustomProps {
    value: number;
    handleChange: (event: SyntheticEvent, value: number) => void;
    tabs: ITabs[];
}

const TabCustom = (props: ITabCustomProps) => {
    const theme = useTheme();
    const { value, handleChange, tabs } = props;

    return (
        <MainCard
            sx={{
                marginBottom: theme.spacing(gridSpacing),
                border: 'none',
                '& .MuiCardContent-root': {
                    padding: '0 !important'
                }
            }}
        >
            <Tabs tabValue={checkAllowedTab(tabs).length === 1 ? 0 : value} tabList={tabs} onChange={handleChange} />
        </MainCard>
    );
};

export default TabCustom;
