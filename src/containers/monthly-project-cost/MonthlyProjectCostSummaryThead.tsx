/* eslint-disable react-hooks/exhaustive-deps */
// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';
import { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface IMonthlyProjectCostSummaryProps {
    year: number;
    projectLength: number;
}

const MonthlyProjectCostSummaryThead = (props: IMonthlyProjectCostSummaryProps) => {
    const { year, projectLength } = props;
    const theme = useTheme();
    const [dimensions, setDimensions] = useState<any>(null);
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const [projectNameCell, setProjectNameCell] = useState<any>(null);

    const callBackRef = useCallback(
        (domNode: any) => {
            if (domNode) {
                setDimensions(domNode.getBoundingClientRect());
            }
        },
        [projectLength]
    );

    const projectNameRef = useCallback(
        (domNode: any) => {
            if (domNode) {
                setProjectNameCell(domNode.getBoundingClientRect());
            }
        },
        [projectLength]
    );

    return (
        <TableHead>
            <TableRow>
                <TableCell ref={projectNameRef} rowSpan={2} sx={{ left: !!matches ? 0 : 'unset', zIndex: 3 }}>
                    <FormattedMessage id="project" />
                </TableCell>
                <TableCell
                    rowSpan={2}
                    sx={{
                        left: !!matches ? projectNameCell?.width : 'unset',
                        zIndex: 3
                    }}
                >
                    <FormattedMessage id="project-type" />
                </TableCell>
                <TableCell rowSpan={2}>
                    <FormattedMessage id="department" />
                </TableCell>
                <TableCell rowSpan={2}>
                    <FormattedMessage id="contract-no" />
                </TableCell>
                <TableCell rowSpan={2}>
                    <FormattedMessage id="contract-size" />
                </TableCell>
                <TableCell rowSpan={2}>
                    <FormattedMessage id="license" />
                </TableCell>
                <TableCell rowSpan={2} align="center" sx={{ whiteSpace: 'nowrap' }}>
                    <FormattedMessage id="expense" /> {year - 2}
                </TableCell>
                <TableCell rowSpan={2} align="center" sx={{ whiteSpace: 'nowrap' }}>
                    <FormattedMessage id="expense" /> {year - 1}
                </TableCell>
                <TableCell rowSpan={2} align="center" sx={{ whiteSpace: 'nowrap', color: '#D9001B !important' }}>
                    <FormattedMessage id="remaining-value" /> {year}
                </TableCell>
                <TableCell align="center" rowSpan={1} colSpan={13}>
                    {year}
                </TableCell>
                <TableCell
                    rowSpan={2}
                    align="center"
                    sx={{ color: '#D9001B !important', right: !!matches ? dimensions?.width : 'unset', zIndex: 3 }}
                >
                    <FormattedMessage id="total-cost" />
                    <br /> {year}
                </TableCell>
                <TableCell rowSpan={2} ref={callBackRef} sx={{ right: !!matches ? 0 : 'unset', zIndex: 3 }}>
                    <FormattedMessage id="remaining-accumulation" />
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
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    <FormattedMessage id="thirteenth-salary" />
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default MonthlyProjectCostSummaryThead;
