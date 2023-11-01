import { FormattedMessage } from 'react-intl';

// material-ui
import { ClickAwayListener, Grid, IconButton, Tooltip, Typography, useTheme } from '@mui/material';

// project import
import { TotalWorkingCalendar } from 'components/icons';
import { REGISTER_WORKING_CALENDAR_TYPE } from 'constants/Common';
import { IOption } from 'types';
import { IWorkingCalendar } from 'types/working-calendar';
import { useEffect, useState } from 'react';

interface TotalProps {
    item: IWorkingCalendar;
}

const Total = (props: TotalProps) => {
    const { item } = props;
    const theme = useTheme();
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

    const handleTooltipHover = () => {
        if (!isMobile) {
            setTooltipOpen(true);
        }
    };

    const handleTooltipClick = () => {
        if (isMobile) {
            setIsTooltipVisible((prevVisible) => !prevVisible);
        }
    };

    const handleClickAway = () => {
        if (isMobile) {
            setIsTooltipVisible(false);
        }
    };

    const handleDocumentClick = (event: MouseEvent) => {
        const tooltip = document.querySelector('.MuiTooltip-popper');
        const target = event.target as Element;
        if (tooltip && !tooltip.contains(target)) {
            setIsTooltipVisible(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (tooltipOpen) {
            document.addEventListener('click', handleDocumentClick);
        } else {
            document.removeEventListener('click', handleDocumentClick);
        }

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [tooltipOpen]);

    useEffect(() => {
        setTooltipOpen(isTooltipVisible);
    }, [isTooltipVisible]);

    return (
        <div style={{ display: 'flex' }}>
            <ClickAwayListener onClickAway={handleClickAway}>
                <Tooltip
                    open={isMobile ? isTooltipVisible : tooltipOpen}
                    onClose={() => setTooltipOpen(false)}
                    title={
                        <Grid container sx={{ [theme.breakpoints.up('md')]: { width: '250px', padding: '10px' } }}>
                            <Grid item xs={10}>
                                {REGISTER_WORKING_CALENDAR_TYPE.map((type: IOption, index: number) => (
                                    <Grid key={index} container spacing={1} sx={{ alignItems: 'center', padding: '2px' }}>
                                        <Grid item>
                                            <div
                                                style={{
                                                    backgroundColor: type.color,
                                                    width: '40px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: '2px 10px',
                                                    borderRadius: '4px'
                                                }}
                                            >
                                                <Typography style={{ color: 'black' }}>{type.value}</Typography>
                                            </div>
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Typography sx={{ color: 'white' }} align="left" variant="body2">
                                                <FormattedMessage id={type.label} />
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>

                            <Grid item xs={2} sx={{ textAlign: 'left', padding: '2px' }}>
                                <Grid sx={{ height: '25px' }}>{item.workingDaySum.wao}</Grid>
                                <Grid sx={{ height: '25px' }}>{item.workingDaySum.onSite}</Grid>
                                <Grid sx={{ height: '25px' }}>{item.workingDaySum.halfDayLeave}</Grid>
                                <Grid sx={{ height: '25px' }}>{item.workingDaySum.maternityLeave}</Grid>
                                <Grid sx={{ height: '25px' }}>{item.workingDaySum.wedding}</Grid>
                                <Grid sx={{ height: '25px' }}>{item.workingDaySum.wfh}</Grid>
                                <Grid sx={{ height: '25px' }}>{item.workingDaySum.leave}</Grid>
                                <Grid sx={{ height: '25px' }}>{item.workingDaySum.sickLeave}</Grid>
                                <Grid sx={{ height: '25px' }}>{item.workingDaySum.holiday}</Grid>
                                <Grid sx={{ height: '25px' }}>{item.workingDaySum.compensatoryLeave}</Grid>
                            </Grid>
                        </Grid>
                    }
                >
                    <IconButton aria-label="list" size="small" onMouseEnter={handleTooltipHover} onClick={handleTooltipClick}>
                        <TotalWorkingCalendar />
                    </IconButton>
                </Tooltip>
            </ClickAwayListener>
        </div>
    );
};

export default Total;
