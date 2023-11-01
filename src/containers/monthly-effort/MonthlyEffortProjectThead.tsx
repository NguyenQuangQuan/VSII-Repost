import { useCallback, useState } from 'react';

// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface IMonthlyEffortProjectTheadProps {
    currentYear: number;
    projectLength: number;
}

function MonthlyEffortProjectThead({ currentYear, projectLength }: IMonthlyEffortProjectTheadProps) {
    const [dimensions, setDimensions] = useState<any>(null);
    const [projectCell, setProjectCell] = useState<any>(null);
    const [deptIdCell, setDeptIdCell] = useState<any>(null);
    const theme = useTheme();

    const callBackRef = useCallback(
        (domNode: any) => {
            if (projectLength > 0 && domNode) {
                setDimensions(domNode.getBoundingClientRect());
            }
        },
        [projectLength]
    );

    const projectCellRef = useCallback(
        (domNode: any) => {
            if (projectLength > 0 && domNode) {
                setProjectCell(domNode.getBoundingClientRect());
            }
        },
        [projectLength]
    );

    const deptIdRef = useCallback((domNode: any) => {
        if (domNode) {
            setDeptIdCell(domNode.getBoundingClientRect());
        }
    }, []);

    const matches = useMediaQuery(theme.breakpoints.up('md'));
    return (
        <TableHead>
            <TableRow>
                <TableCell ref={projectCellRef} rowSpan={2} sx={{ left: !!matches ? 0 : 'unset', zIndex: 3 }}>
                    <FormattedMessage id="project" />
                </TableCell>
                <TableCell
                    ref={deptIdRef}
                    rowSpan={2}
                    sx={{ left: !!matches ? projectLength > 0 && projectCell?.width : 'unset', zIndex: 3 }}
                >
                    <FormattedMessage id="department" />
                </TableCell>
                <TableCell
                    rowSpan={2}
                    sx={{ left: !!matches ? projectLength > 0 && projectCell?.width + deptIdCell?.width : 'unset', zIndex: 3 }}
                >
                    <FormattedMessage id="project-type" />
                </TableCell>
                <TableCell rowSpan={2}>
                    <FormattedMessage id="work-completed" />
                </TableCell>
                <TableCell rowSpan={2}>
                    <FormattedMessage id="implement-quota" />
                </TableCell>
                <TableCell rowSpan={2}>
                    <FormattedMessage id="maintainance-quota" />
                </TableCell>
                <TableCell rowSpan={2}>
                    <FormattedMessage id="total-quota" />
                </TableCell>
                <TableCell rowSpan={2} sx={{ color: '#D9001B !important' }}>
                    <FormattedMessage id="previous-effort" />
                </TableCell>
                <TableCell align="center" rowSpan={1} colSpan={12}>
                    {currentYear}
                </TableCell>
                <TableCell
                    rowSpan={2}
                    sx={{ color: '#D9001B !important', right: !!matches ? projectLength > 0 && dimensions?.width : 'unset', zIndex: 3 }}
                >
                    <FormattedMessage id="total-used-effort" />
                </TableCell>
                <TableCell ref={callBackRef} rowSpan={2} sx={{ right: !!matches ? 0 : 'unset', zIndex: 3 }}>
                    <FormattedMessage id="remaining-effort" />
                </TableCell>
            </TableRow>
            <TableRow
                sx={{
                    '& .MuiTableCell-root': {
                        position: 'sticky',
                        top: dimensions && dimensions.height / 2
                    }
                }}
            >
                <TableCell>
                    <FormattedMessage id="jan" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="feb" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="mar" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="apr" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="may" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="jun" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="jul" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="aug" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="sep" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="oct" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="nov" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="dec" />
                </TableCell>
            </TableRow>
        </TableHead>
    );
}
export default MonthlyEffortProjectThead;
