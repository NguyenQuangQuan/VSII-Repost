import { Grid, TableCell, TableRow } from '@mui/material';

const InfomationTechnologySkillsPoint = () => {
    return (
        <>
            <TableRow>
                <TableCell
                    colSpan={9}
                    sx={{
                        color: '#2548A1 !important',
                        fontWeight: '600',
                        fontStyle: 'italic'
                    }}
                >
                    <Grid container>
                        <Grid item xs={7.2}>
                            {/* Experiences */}
                            <Grid container>
                                <Grid item xs={3}>
                                    Experiences:
                                </Grid>
                                <Grid item xs={3}>
                                    0: 0 month
                                </Grid>
                                <Grid item xs={3}>
                                    2: 6 - 12 months
                                </Grid>
                                <Grid item xs={3}>
                                    4: 2 - 5 years
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={3}>
                                    1: 1 - 6 months
                                </Grid>
                                <Grid item xs={3}>
                                    3: 1 - 2 years
                                </Grid>
                                <Grid item xs={3}>
                                    5: {'>'} 5 years
                                </Grid>
                            </Grid>
                            {/* Last used */}
                            <Grid container sx={{ m: '10px 0' }}>
                                <Grid item xs={3}>
                                    Last used:{' '}
                                </Grid>
                                <Grid item xs={3}>
                                    Last year used
                                </Grid>
                            </Grid>
                            {/* Expert level */}
                            <Grid container>
                                <Grid item xs={3}>
                                    Expert level:
                                </Grid>
                                <Grid item xs={3}>
                                    1: Beginner Level
                                </Grid>
                                <Grid item xs={3}>
                                    3: Sometimes have to use manuals
                                </Grid>
                                <Grid item xs={3}>
                                    5: Expert Level
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={3}>
                                    2: Always have to use manuals
                                </Grid>
                                <Grid item xs={3}>
                                    4: Can solve problems
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </TableCell>
            </TableRow>
            <TableRow sx={{ '& td': { textAlign: 'center' } }}>
                <TableCell className="w-95px" rowSpan={2}>
                    Main skill
                </TableCell>
                <TableCell className="w-300px" rowSpan={2}></TableCell>
                <TableCell className="w-250px" rowSpan={2}>
                    Experiences
                </TableCell>
                <TableCell className="w-250px" rowSpan={2}>
                    Lasted used
                </TableCell>
                <TableCell colSpan={5}>Expert level</TableCell>
            </TableRow>
            <TableRow sx={{ '& td': { textAlign: 'center' } }}>
                <TableCell>1</TableCell>
                <TableCell>2</TableCell>
                <TableCell>3</TableCell>
                <TableCell>4</TableCell>
                <TableCell>5</TableCell>
            </TableRow>
        </>
    );
};

export default InfomationTechnologySkillsPoint;
