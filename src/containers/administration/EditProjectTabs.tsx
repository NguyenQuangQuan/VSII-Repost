import { SyntheticEvent } from 'react';

// material-ui
import { useTheme } from '@mui/material';

// project imports
import MainCard from 'components/cards/MainCard';
import { Tabs } from 'components/extended/Tabs';
import { projectEditTabs } from 'constants/Common';
import { gridSpacing } from 'store/constant';

interface IEditProjectTabsProps {
    tabValue: number;
    handleChangeTab: (event: SyntheticEvent, newTabValue: number) => void;
}

const EditProjectTabs = (props: IEditProjectTabsProps) => {
    const { tabValue, handleChangeTab } = props;
    const theme = useTheme();

    return (
        <MainCard
            sx={{
                border: 'none',
                borderRadius: '0',
                marginBottom: theme.spacing(gridSpacing),
                '& .MuiCardContent-root': {
                    padding: '0 !important'
                }
            }}
        >
            <Tabs tabValue={tabValue} tabList={projectEditTabs} onChange={handleChangeTab} />
        </MainCard>
    );
};

export default EditProjectTabs;
