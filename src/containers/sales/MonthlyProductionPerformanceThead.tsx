/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useCallback, useState } from 'react';

// third-party
import { FormattedMessage } from 'react-intl';

// material-ui
import { TableCell, TableHead, TableRow, useMediaQuery, useTheme } from '@mui/material';

// project import
import { GROUP_COLOR_MONTH } from 'constants/Common';
import { calculationSum } from 'utils/common';

interface IMonthlyProductionPerformanceTheadProps {
    months: string[];
    count: number;
}

const style_group_thead_even = {
    '& .MuiTableCell-root:nth-of-type(8n+1),.MuiTableCell-root:nth-of-type(8n+2),.MuiTableCell-root:nth-of-type(8n+3),.MuiTableCell-root:nth-of-type(8n+4)':
        {
            backgroundColor: GROUP_COLOR_MONTH
        }
};

function MonthlyProductionPerformanceThead(props: IMonthlyProductionPerformanceTheadProps) {
    const { months, count } = props;
    const theme = useTheme();
    const [actionEl, setActionEl] = useState<any>(null);
    const [projectNameEl, setProjectNameEl] = useState<any>(null);
    const [serviceTypeEl, setServiceTypeEl] = useState<any>(null);
    const [contractTypeEl, setContractTypeEl] = useState<any>(null);
    const [dimensions, setDimensions] = useState<any>(null);

    // action
    const actionElRef = useCallback(
        (domNode: any) => {
            if (count > 0 && domNode) setActionEl(domNode.getBoundingClientRect());
        },
        [count]
    );
    // project name
    const projectNameElRef = useCallback(
        (domNode: any) => {
            if (count > 0 && domNode) setProjectNameEl(domNode.getBoundingClientRect());
        },
        [count]
    );
    // service type
    const serviceTypeElRef = useCallback(
        (domNode: any) => {
            if (count > 0 && domNode) setServiceTypeEl(domNode.getBoundingClientRect());
        },
        [count]
    );
    // contract type
    const contractTypeElRef = useCallback(
        (domNode: any) => {
            if (count > 0 && domNode) setContractTypeEl(domNode.getBoundingClientRect());
        },
        [count]
    );
    // contract size
    const callBackRef = useCallback(
        (domNode: any) => {
            if (count > 0 && domNode) setDimensions(domNode.getBoundingClientRect());
        },
        [count]
    );

    const matches = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <TableHead>
            <TableRow
                sx={{
                    '& .MuiTableCell-root:nth-of-type(even)': {
                        backgroundColor: GROUP_COLOR_MONTH
                    },
                    '& .MuiTableCell-root:nth-of-type(-n+5)': {
                        position: !!matches ? 'sticky' : 'unset',
                        zIndex: 3,
                        backgroundColor: '#fff'
                    }
                }}
            >
                <TableCell ref={actionElRef} rowSpan={2} sx={{ left: 0 }}>
                    <span className="w60px">
                        <FormattedMessage id="action" />
                    </span>
                </TableCell>
                <TableCell ref={projectNameElRef} rowSpan={2} sx={{ left: actionEl && actionEl?.width }}>
                    <span className="w150px">
                        <FormattedMessage id="project-name" />
                    </span>
                </TableCell>
                <TableCell
                    ref={serviceTypeElRef}
                    rowSpan={2}
                    sx={{ left: projectNameEl && calculationSum(actionEl?.width, projectNameEl?.width) }}
                >
                    <span className="w60px">
                        <FormattedMessage id="service-type" />
                    </span>
                </TableCell>
                <TableCell
                    ref={contractTypeElRef}
                    rowSpan={2}
                    sx={{
                        left: serviceTypeEl && calculationSum(actionEl?.width, projectNameEl?.width, serviceTypeEl?.width)
                    }}
                >
                    <span className="w60px">
                        <FormattedMessage id="contract-type" />
                    </span>
                </TableCell>
                <TableCell
                    rowSpan={2}
                    ref={callBackRef}
                    sx={{
                        left:
                            contractTypeEl &&
                            calculationSum(actionEl?.width, projectNameEl?.width, serviceTypeEl?.width, contractTypeEl?.width)
                    }}
                >
                    <span className="w60px">
                        <FormattedMessage id="contract-size" />
                    </span>
                </TableCell>
                {months.map((month: string, index: number) => (
                    <TableCell key={index} align="center" rowSpan={1} colSpan={4}>
                        <FormattedMessage id={month} />
                    </TableCell>
                ))}
            </TableRow>
            <TableRow
                sx={{
                    '& .MuiTableCell-root': { position: !!matches ? 'sticky' : 'unset', top: dimensions && dimensions?.height / 2 },
                    ...style_group_thead_even
                }}
            >
                {months.map((_, i) => (
                    <Fragment key={i}>
                        <TableCell>Delivered</TableCell>
                        <TableCell>Receivable</TableCell>
                        <TableCell>Received</TableCell>
                        <TableCell>Financial</TableCell>
                    </Fragment>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default MonthlyProductionPerformanceThead;
