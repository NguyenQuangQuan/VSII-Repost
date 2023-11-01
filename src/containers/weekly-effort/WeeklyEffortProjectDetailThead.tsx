// material-ui
import { TableCell, TableHead, TableRow } from '@mui/material';
import { Checkbox } from 'components/extended/Form';
import { FormattedMessage } from 'react-intl';

type IWeeklyEffortProjectDetailTheadProps = {
    handleCheckAll: () => void;
    isCheckAll?: boolean;
    isSomeSelected?: boolean;
};

function WeeklyEffortProjectDetailThead(props: IWeeklyEffortProjectDetailTheadProps) {
    const { handleCheckAll, isCheckAll, isSomeSelected } = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <Checkbox
                        name="checkAll"
                        isControl={false}
                        handleChange={handleCheckAll}
                        valueChecked={isCheckAll}
                        indeterminate={isSomeSelected}
                    />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="member" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="member-code" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="effort-in-week" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="payable-ot" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="non-payable-ot" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="effort-pm-verified" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="payable-ot-verified" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="non-payable-ot-verified" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="pm-verifed" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="pm-verified-date" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="qa-verifed" />
                </TableCell>
                <TableCell>
                    <FormattedMessage id="qa-verified-date" />
                </TableCell>
            </TableRow>
        </TableHead>
    );
}
export default WeeklyEffortProjectDetailThead;
