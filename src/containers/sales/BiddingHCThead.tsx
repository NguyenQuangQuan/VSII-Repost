import { Fragment } from 'react';

// third party
// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { MONTHS_OF_YEAR } from 'constants/Common';
import { FormattedMessage, useIntl } from 'react-intl';

// project imports\
interface IBiddingHCTheadProps {
    contractTypeValue?: string;
    monthlyHCLists?: any;
}

const BiddingHCThead = (props: IBiddingHCTheadProps) => {
    const { contractTypeValue, monthlyHCLists } = props;
    const intl = useIntl();
    return (
        <TableHead>
            <TableRow
                sx={{
                    '& th': {
                        whiteSpace: 'nowrap'
                    }
                }}
            >
                {contractTypeValue && (
                    <TableCell>
                        <FormattedMessage id="action" />
                    </TableCell>
                )}
                {monthlyHCLists?.map((item: any, key: number) => (
                    <Fragment key={key}>
                        <TableCell>{`HC ${intl.formatMessage({ id: MONTHS_OF_YEAR[item?.month] })}`}</TableCell>
                        <TableCell>
                            <FormattedMessage id="billable-day" />
                        </TableCell>
                        <TableCell>
                            <FormattedMessage id="billable" />
                        </TableCell>
                    </Fragment>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default BiddingHCThead;
