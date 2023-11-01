import { Box, Grid, Typography } from '@mui/material';
import { PUBLIC_URL } from 'constants/Common';
import imageDashBoard from '../assets/images/dashboard/image-dashboard.svg';
import { FormattedMessage } from 'react-intl';
import { getUserInfoCookies } from 'utils/cookies';
import { useTheme } from '@mui/material/styles';

const DashBoard = () => {
    const userInfo = getUserInfoCookies();
    const theme = useTheme();
    return (
        <Box
            sx={{
                background: `url("${PUBLIC_URL}background-dashboard.svg") no-repeat center`,
                [theme.breakpoints.up('lg')]: {
                    height: 'calc(100vh - 128px)'
                }
            }}
        >
            <Grid
                container
                alignItems={'center'}
                className="dashboard__container"
                sx={{
                    [theme.breakpoints.down('lg')]: {
                        '& .MuiGrid-root': {
                            padding: '40px !important'
                        },
                        '& .MuiGrid-root:last-child': {
                            padding: '0 40px 40px !important',
                            '& .image__dashboard': {
                                maxWidth: '40%'
                            }
                        }
                    },
                    [theme.breakpoints.down('md')]: {
                        '& .MuiGrid-root:last-child': {
                            '& .image__dashboard': {
                                maxWidth: '50%'
                            }
                        }
                    },
                    [theme.breakpoints.down('sm')]: {
                        '& .MuiGrid-root:last-child': {
                            '& .image__dashboard': {
                                maxWidth: '75%'
                            }
                        }
                    }
                }}
            >
                <Grid item xs={12} lg={6}>
                    <div className="dashboard__content--header">
                        <Typography variant="h3" gutterBottom color={'#3163D4'}>
                            <FormattedMessage id="welcome" />
                        </Typography>
                        <Typography variant="h3" gutterBottom>
                            {userInfo && `${userInfo.firstName} ${userInfo.lastName} `}
                        </Typography>
                    </div>
                    <div className="dashboard__content--body">
                        <Typography variant="h2" gutterBottom>
                            <FormattedMessage id="system-title" />
                        </Typography>
                        <br />
                        <Typography variant="subtitle1" gutterBottom>
                            <strong>
                                <FormattedMessage id="accessibility" />
                            </strong>
                            <FormattedMessage id="accessibility-content" />
                        </Typography>
                        <br />
                        <Typography variant="subtitle1" gutterBottom>
                            <strong>
                                <FormattedMessage id="efficiency" />
                            </strong>
                            <FormattedMessage id="efficiency-content" />
                        </Typography>
                        <br />
                        <Typography variant="subtitle1" gutterBottom>
                            <strong>
                                <FormattedMessage id="real-time" />
                            </strong>
                            <FormattedMessage id="real-time-content" />
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={12} lg={6} textAlign={'center'}>
                    <img src={imageDashBoard} alt="dashboardImage" className="image__dashboard" />
                </Grid>
            </Grid>
        </Box>
    );
};

export default DashBoard;
