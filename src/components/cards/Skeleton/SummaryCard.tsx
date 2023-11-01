import { Fragment } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

// project import
import { gridSpacing } from 'store/constant';

// ==============================|| SKELETON - EARNING CARD ||============================== //

interface ISummaryCard {
    isMoreLoading?: boolean;
}

const SummaryCard = (props: ISummaryCard) => {
    const { isMoreLoading } = props;

    const theme = useTheme();
    return (
        <Card sx={{ marginBottom: theme.spacing(gridSpacing) }}>
            <CardContent>
                <Grid container direction="column">
                    <Grid item>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Skeleton variant="rectangular" width={44} height={44} />
                            </Grid>
                            <Grid item>
                                <Skeleton variant="rectangular" width={34} height={34} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Skeleton variant="rectangular" sx={{ my: 2 }} height={40} />
                    </Grid>
                    <Grid item>
                        <Skeleton variant="rectangular" height={30} />
                    </Grid>
                    {isMoreLoading &&
                        [...Array(3)].map((x, i) => (
                            <Fragment key={i}>
                                <Grid item>
                                    <Skeleton variant="rectangular" sx={{ my: 2 }} height={150} />
                                </Grid>
                                <Grid item>
                                    <Skeleton variant="rectangular" height={100} />
                                </Grid>
                            </Fragment>
                        ))}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default SummaryCard;
