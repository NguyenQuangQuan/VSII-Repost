import { FormattedMessage } from 'react-intl';

// materia-ui
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'components/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { ITypeList } from 'types/working-calendar';

// assets

interface ITypeListProp {
    typeList: ITypeList[];
}

const RegisterWorkingCalendarType = (props: ITypeListProp) => {
    const { typeList } = props;
    const theme = useTheme();

    return (
        <MainCard
            sx={{
                '& div .MuiCardContent-root': {
                    padding: '20px 24px !important'
                },
                marginBottom: theme.spacing(gridSpacing)
            }}
        >
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                sx={{
                    overflowX: 'auto'
                }}
            >
                <Grid item xs={12} lg={12}>
                    <Grid container spacing={2}>
                        {typeList.map((item: ITypeList, index: number) => (
                            <Grid item xs={12} lg={2.4} key={index}>
                                <Grid container spacing={1} sx={{ alignItems: 'center' }}>
                                    <Grid item xs={4} lg={2.4} key={index}>
                                        <div
                                            style={{
                                                backgroundColor: item.color,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                padding: '2px 10px',
                                                borderRadius: '4px'
                                            }}
                                        >
                                            <Typography style={{ color: 'black' }}>{item.key}</Typography>
                                        </div>
                                    </Grid>

                                    <Grid item xs={8} zeroMinWidth>
                                        <Typography align="left" variant="body2">
                                            <FormattedMessage id={item.value} /> <span style={{ fontWeight: '800' }}>({item.total})</span>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default RegisterWorkingCalendarType;
