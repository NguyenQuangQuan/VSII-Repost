import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

// material-ui
import { Button, IconButton, IconButtonProps, Stack, Tooltip, Typography, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'components/cards/MainCard';
import { Download, VerifyWorkingCalendar, WorkingCalendarClosingDate } from 'components/icons';
import { gridSpacing } from 'store/constant';
import { PERMISSIONS } from 'constants/Permission';

// assets;
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import { checkAllowedPermission } from 'utils/authorization';
import { GppGoodOutlinedIcon } from 'assets/images/icons';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
    title: string;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    // eslint-disable-next-line
    const { expand, title, ...other } = props;
    return (
        <Tooltip title={title}>
            <IconButton size="small" {...other} />
        </Tooltip>
    );
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
    })
}));

interface IFilterCollapseProps {
    handleExport?: () => void;
    handleOpenCommentDialog?: () => void;
    children: React.ReactNode | string;
    handleVerifiedConfirm?: (type: string) => void | undefined;
    handleClosingDate?: () => void;
    handleVerifiedWorkingCalendar?: () => void;
}

const FilterCollapse = ({
    handleExport,
    children,
    handleOpenCommentDialog,
    handleVerifiedConfirm,
    handleClosingDate,
    handleVerifiedWorkingCalendar
}: IFilterCollapseProps) => {
    // Hooks, states, variables
    const theme = useTheme();
    const intl = useIntl();
    const [isExpanded, setIsExpanded] = useState<boolean>(true);
    const { weeklyEffort } = PERMISSIONS.report;
    const { registerWorkingCalendar } = PERMISSIONS.workingCalendar;

    // Event
    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <MainCard
            sx={{ marginBottom: theme.spacing(gridSpacing) }}
            title={<FormattedMessage id="filters-report" />}
            secondary={
                <>
                    {handleVerifiedConfirm && checkAllowedPermission(weeklyEffort.pmVerify) && (
                        <Button onClick={() => handleVerifiedConfirm('PM')}>
                            <Stack alignItems="center" direction="row" gap={1}>
                                <GppGoodOutlinedIcon />
                                <Typography fontWeight={500}>
                                    <FormattedMessage id="pm-verify" />
                                </Typography>
                            </Stack>
                        </Button>
                    )}
                    {handleVerifiedConfirm && checkAllowedPermission(weeklyEffort.qaVerify) && (
                        <Button onClick={() => handleVerifiedConfirm('QA')}>
                            <Stack alignItems="center" direction="row" gap={1}>
                                <GppGoodOutlinedIcon />
                                <Typography fontWeight={500}>
                                    <FormattedMessage id="qa-verify" />
                                </Typography>
                            </Stack>
                        </Button>
                    )}
                    {handleClosingDate && checkAllowedPermission(registerWorkingCalendar.closingWorkingCalendar) && (
                        <Button onClick={() => handleClosingDate()}>
                            <Stack alignItems="center" direction="row" gap={1}>
                                <WorkingCalendarClosingDate />
                                <Typography fontWeight={500}>
                                    <FormattedMessage id="hr-working-calendar-closing" />
                                </Typography>
                            </Stack>
                        </Button>
                    )}
                    {handleVerifiedWorkingCalendar && checkAllowedPermission(registerWorkingCalendar.verifyWorkingCalendar) && (
                        <Button onClick={() => handleVerifiedWorkingCalendar()}>
                            <Stack alignItems="center" direction="row" gap={1}>
                                <VerifyWorkingCalendar />
                                <Typography fontWeight={500}>
                                    <FormattedMessage id="hr-working-calendar-verify" />
                                </Typography>
                            </Stack>
                        </Button>
                    )}
                    {handleOpenCommentDialog && (
                        <Button onClick={() => handleOpenCommentDialog()}>
                            <Stack alignItems="center" direction="row" gap={1}>
                                <SpeakerNotesIcon />
                                <Typography fontWeight={500}>
                                    <FormattedMessage id="comment" />
                                </Typography>
                            </Stack>
                        </Button>
                    )}
                    {handleExport && (
                        <Button onClick={() => handleExport()}>
                            <Stack alignItems="center" direction="row" gap={1}>
                                <Download />
                                <Typography fontWeight={500}>
                                    <FormattedMessage id="download-report" />
                                </Typography>
                            </Stack>
                        </Button>
                    )}
                    <ExpandMore
                        expand={isExpanded}
                        onClick={handleExpandClick}
                        aria-expanded={isExpanded}
                        title={isExpanded ? intl.formatMessage({ id: 'hide-filters' }) : intl.formatMessage({ id: 'show-filters' })}
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </>
            }
            isShowContent={isExpanded}
        >
            {children}
        </MainCard>
    );
};

export default FilterCollapse;
