import { TableBody, TableCell, TableRow } from '@mui/material';
import { FormattedMessage } from 'react-intl';

interface ITableEmptyProps {
    height?: string;
}

const TableEmpty = (props: ITableEmptyProps) => {
    const { height } = props;

    return (
        <TableBody>
            <TableRow>
                <TableCell align="center" colSpan={100} sx={{ height }}>
                    <span>
                        <FormattedMessage id="no-data" />
                    </span>
                </TableCell>
            </TableRow>
        </TableBody>
    );
};

TableEmpty.defaultProps = {
    height: '400px'
};
export default TableEmpty;
