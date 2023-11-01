// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';
import { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';

interface ISummaryTheadTheadProps {
    summaryLength: number;
}

const SummaryThead = (props: ISummaryTheadTheadProps) => {
    const { summaryLength } = props;

    const [dimensions, setDimensions] = useState<any>(null);

    const callBackRef = useCallback(
        (domNode: any) => {
            if (summaryLength > 0 && domNode) {
                setDimensions(domNode.getBoundingClientRect());
            }
        },
        [summaryLength]
    );

    return (
        <TableHead>
            <TableRow
                sx={{
                    '& th': {
                        color: 'white !important',
                        textAlign: 'center',
                        background: '#3163D4',
                        whiteSpace: 'nowrap'
                    }
                }}
            >
                <TableCell rowSpan={2}>
                    <FormattedMessage id="indicator" />
                </TableCell>
                <TableCell rowSpan={2}>
                    <FormattedMessage id="usd" />
                </TableCell>
                <TableCell rowSpan={2}>
                    <FormattedMessage id="vnd" />
                </TableCell>
                <TableCell rowSpan={1} colSpan={4}>
                    <FormattedMessage id="revenue-estimation" />
                </TableCell>
                <TableCell ref={callBackRef} rowSpan={2}>
                    <FormattedMessage id="total-revenue-estimation" />
                </TableCell>
            </TableRow>
            <TableRow
                sx={{
                    '& th': {
                        color: 'white !important',
                        textAlign: 'center',
                        background: '#3163D4',
                        borderBottom: 'none !important',
                        whiteSpace: 'nowrap'
                    },
                    '&': {
                        position: 'sticky',
                        top: dimensions && dimensions.height / 2
                    }
                }}
            >
                <TableCell>
                    <FormattedMessage id="1st-quarter" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="2nd-quarter" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="3rd-quarter" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="4th-quarter" />
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default SummaryThead;
