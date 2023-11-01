import { SyntheticEvent } from 'react';
import { FormattedMessage } from 'react-intl';

// material-ui
import { Tabs as MuiTabs, Tab as MuiTab, styled } from '@mui/material';

// project imports
import { ITabs } from 'types';
import { checkAllowedPermission } from 'utils/authorization';
interface ITabsProps {
    tabList: ITabs[];
    onChange: (event: SyntheticEvent, value: any) => void;
    tabValue: number;
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const Tabs = (props: ITabsProps) => {
    const { tabList, onChange, tabValue } = props;
    return (
        <MuiTabsWrapper value={tabValue} onChange={onChange} variant="scrollable">
            {tabList.map((item: ITabs, key) => {
                if (item.permission_key) {
                    const isAllowed = checkAllowedPermission(item.permission_key);
                    return isAllowed && <MuiTab key={key} label={<FormattedMessage id={item.name} />} {...a11yProps(key)} />;
                }
                return <MuiTab key={key} label={<FormattedMessage id={item.name} />} {...a11yProps(key)} />;
            })}
        </MuiTabsWrapper>
    );
};

const MuiTabsWrapper = styled(MuiTabs)({});

export default Tabs;
