// material-ui
import { Box } from '@mui/material';

// project import
import MainCard, { MainCardProps } from 'components/cards/MainCard';

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

const AuthCardWrapper = ({ children, ...other }: MainCardProps) => (
    <MainCard
        sx={{
            maxWidth: { xs: 400, lg: 400 },
            margin: { xs: 2.5, md: 3 },
            '& > *': {
                flexGrow: 1,
                flexBasis: '50%'
            },
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px);'
        }}
        content={false}
        {...other}
    >
        <Box sx={{ p: { xs: 2, sm: 3, xl: 5 }, paddingBottom: '100px !important' }}>{children}</Box>
    </MainCard>
);

export default AuthCardWrapper;
