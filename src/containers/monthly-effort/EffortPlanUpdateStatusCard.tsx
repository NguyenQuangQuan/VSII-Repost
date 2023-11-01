// third-party
import Chart from 'react-apexcharts';
import { Typography, Grid, IconButton } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';

// material-ui
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'components/cards/MainCard';
import SkeletonSummaryCard from 'components/cards/Skeleton/SummaryCard';
import { gridSpacing } from 'store/constant';
import { IEffortPlanUpdateStatus } from 'types';
import { effortPlanUpdateStatusChartOptions, effortPlanUpdateStatusColors } from 'pages/monthly-effort/Config';
import { checkAllowedPermission } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

// =========================|| EFFORT PLAN UPDATE STATUS CHART CARD ||========================= //

interface IEffortPlanUpdateStatusCardProps {
    data: IEffortPlanUpdateStatus[] | any;
    isLoading: boolean;
    month: string | number;
    handleOpen: () => void;
}

const EffortPlanUpdateStatusCard = ({ isLoading, data, month, handleOpen }: IEffortPlanUpdateStatusCardProps) => {
    const theme = useTheme();
    const intl = useIntl();
    const result = data.map((item: any) => ({
        ...item,
        name: `${intl.formatMessage({ id: item.name })} ${month}`
    }));
    const { monthlyEffort } = PERMISSIONS.report;

    return (
        <>
            {isLoading ? (
                <SkeletonSummaryCard />
            ) : (
                <MainCard
                    sx={{
                        marginBottom: theme.spacing(gridSpacing),
                        overflow: 'unset'
                    }}
                    title={<FormattedMessage id="update-effort-plan" />}
                    secondary={
                        checkAllowedPermission(monthlyEffort.editEffortPlan) && (
                            <IconButton size="small" onClick={handleOpen}>
                                <EditTwoToneIcon fontSize="small" />
                            </IconButton>
                        )
                    }
                >
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} lg={12} sx={{ height: '100%' }}>
                            <Chart options={effortPlanUpdateStatusChartOptions} series={result} type="bar" height={240} />
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <Grid container alignItems="left" flexDirection="column-reverse">
                                {effortPlanUpdateStatusColors.map((item, index) => (
                                    <Grid item xs={12} lg={12} key={index}>
                                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                                            <Grid item>
                                                <FiberManualRecordIcon sx={{ color: item.color }} />
                                            </Grid>
                                            <Grid item xs zeroMinWidth>
                                                <Grid container spacing={1}>
                                                    <Grid item xs zeroMinWidth>
                                                        <Typography align="left" variant="body2">
                                                            <FormattedMessage id={item.name} /> {month}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

export default EffortPlanUpdateStatusCard;
