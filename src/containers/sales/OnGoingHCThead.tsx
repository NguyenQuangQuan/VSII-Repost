import { Fragment } from 'react';

// third party
import { FormattedMessage, useIntl } from 'react-intl';

// material-ui
import { TableCell, TableHead, TableRow, Box } from '@mui/material';

// project imports
import { MONTHS_OF_YEAR } from 'constants/Common';
import { IMonthlyHCList } from 'types';

interface IOnGoingTheadProps {
    hcInfo?: IMonthlyHCList[];
}

const OnGoingHCThead = (props: IOnGoingTheadProps) => {
    const { hcInfo } = props;
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
                {hcInfo?.map((item: IMonthlyHCList, key) => (
                    <Fragment key={key}>
                        <Box>
                            <TableCell>{`HC ${intl.formatMessage({ id: MONTHS_OF_YEAR[item?.month] })}`}</TableCell>
                        </Box>
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

export default OnGoingHCThead;
