import { ReactNode } from 'react';

// material-ui
import { Table as MuiTable, SxProps, TableContainer, TableProps } from '@mui/material';

// project imports
import TableEmpty from './Empty';
import TableLoading from './Loading';

interface ITableProps {
    other?: TableProps;
    isLoading?: boolean;
    children: ReactNode;
    heads: ReactNode;
    data?: Array<string | number | object>;
    footer?: ReactNode;
    height?: string;
    maxHeight?: number | string;
    heightTableEmpty?: string | undefined;
    sx?: SxProps<any>;
}

const Table = (props: ITableProps) => {
    const { isLoading, heads, data, maxHeight, children, footer, height, heightTableEmpty, sx, ...other } = props;
    return (
        <TableContainer sx={{ maxHeight, height, ...sx }}>
            <MuiTable stickyHeader {...other} size="small">
                {heads}
                {isLoading ? <TableLoading /> : data?.length === 0 ? <TableEmpty height={heightTableEmpty} /> : children}
                {isLoading ? <></> : footer ? <tfoot>{footer}</tfoot> : <></>}
            </MuiTable>
        </TableContainer>
    );
};

Table.defaultProps = {
    maxHeight: 500
};

export default Table;
