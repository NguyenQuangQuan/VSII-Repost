import React, { ReactNode } from 'react';

// material-ui
import { Stack, TablePagination } from '@mui/material';

interface ITableFooterProps {
    download?: ReactNode;
    pagination?: {
        total: number;
        page: number;
        size: number;
    };
    onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const TableFooter = (props: ITableFooterProps) => {
    const { download, pagination, onPageChange, onRowsPerPageChange } = props;
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent={!download ? 'center' : download && pagination ? 'space-between' : 'end'}
            sx={{ marginTop: !pagination ? '20px' : '' }}
        >
            {pagination && onPageChange && onRowsPerPageChange && (
                <TablePagination
                    component="div"
                    count={pagination.total}
                    page={pagination.page}
                    onPageChange={onPageChange}
                    rowsPerPage={pagination.size}
                    onRowsPerPageChange={onRowsPerPageChange}
                />
            )}
            {download}
        </Stack>
    );
};

export default TableFooter;
