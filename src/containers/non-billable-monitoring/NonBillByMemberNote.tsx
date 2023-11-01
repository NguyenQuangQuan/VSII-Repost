import { FormattedMessage } from 'react-intl';

// materia-ui
import { ListItem, ListItemIcon, ListItemText, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'components/cards/MainCard';
import { TIME_STATUS_BY_NON_BILL } from 'constants/Common';
import { gridSpacing } from 'store/constant';
import { IOption } from 'types';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const nonBillableMonitoringColors = TIME_STATUS_BY_NON_BILL.filter((item: IOption) => item.value);

const NonBillByMemberNote = () => {
    const theme = useTheme();
    return (
        <MainCard
            sx={{
                '& div .MuiCardContent-root': {
                    padding: '0 24px !important'
                },
                marginBottom: theme.spacing(gridSpacing)
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                sx={{
                    overflowX: 'auto'
                }}
            >
                {nonBillableMonitoringColors.map((item: IOption, index) => (
                    <ListItem key={index}>
                        <ListItemIcon>
                            <FiberManualRecordIcon sx={{ color: item.color }} />
                        </ListItemIcon>
                        <ListItemText primary={<FormattedMessage id={item.label} />} />
                    </ListItem>
                ))}
            </Stack>
        </MainCard>
    );
};

export default NonBillByMemberNote;
