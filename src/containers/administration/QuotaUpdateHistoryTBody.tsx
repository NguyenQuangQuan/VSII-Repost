// materia-ui
import { TableBody, TableCell, TableRow } from '@mui/material';

// projec import
import { IQuotaUpdateHistory } from 'types';
import { dateFormat } from 'utils/date';

interface IQuotaUpdateHistoryTBodyProps {
    quotaUpdateHistories?: IQuotaUpdateHistory[];
}
const QuotaUpdateHistoryTBody = (props: IQuotaUpdateHistoryTBodyProps) => {
    const { quotaUpdateHistories } = props;

    return (
        <TableBody>
            {quotaUpdateHistories?.map((historyItem: IQuotaUpdateHistory, index: number) => (
                <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{historyItem.maintainQuota}</TableCell>
                    <TableCell>{historyItem.implQuota}</TableCell>
                    <TableCell>{dateFormat(historyItem.updateDate)}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default QuotaUpdateHistoryTBody;
