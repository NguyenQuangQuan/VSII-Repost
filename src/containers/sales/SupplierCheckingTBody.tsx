// materia-ui
import { IconButton, Stack, TableBody, TableCell, TableRow, Tooltip, Typography } from '@mui/material';

// third party
import { FormattedMessage } from 'react-intl';

// project imports
import { ISupplierChecking } from 'types';
import { PERMISSIONS } from 'constants/Permission';
import { checkAllowedPermission } from 'utils/authorization';

// assets
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { dateFormat } from 'utils/date';
import { formatPrice } from 'utils/common';

interface SupplierCheckingTBodyProps {
    suppliers: ISupplierChecking[];
    handleOpen: (supplier?: ISupplierChecking) => void;
    handleOpenDeleteConfirm: (supplier: ISupplierChecking, type?: string) => void;
}

const SupplierCheckingTBody = (props: SupplierCheckingTBodyProps) => {
    const { suppliers, handleOpen, handleOpenDeleteConfirm } = props;
    const { saleList } = PERMISSIONS.sale;

    const getTranslateworkType = (workType: any) => {
        switch (workType) {
            case 'Remote':
                return <FormattedMessage id="remote" />;
            case 'Onsite':
                return <FormattedMessage id="onsite" />;
            default:
                return '';
        }
    };

    return (
        <TableBody>
            {suppliers.map((supplier: ISupplierChecking, key: number) => (
                <TableRow key={key}>
                    <TableCell>{key + 1}</TableCell>
                    <TableCell>
                        <Stack direction="row">
                            <Tooltip placement="right" title={supplier.supplierName}>
                                <Typography className="tooltip-content">{supplier.supplierName}</Typography>
                            </Tooltip>
                        </Stack>
                    </TableCell>
                    <TableCell>
                        <Stack direction="row">
                            <Tooltip placement="right" title={supplier.technology}>
                                <Typography className="tooltip-content">{supplier.technology}</Typography>
                            </Tooltip>
                        </Stack>
                    </TableCell>
                    <TableCell>{supplier.quantity}</TableCell>
                    <TableCell>{dateFormat(supplier.fromDate)}</TableCell>
                    <TableCell>{dateFormat(supplier.toDate)}</TableCell>
                    <TableCell>{formatPrice(supplier.unitPrice)}</TableCell>
                    <TableCell>
                        {supplier.picFirstName} {supplier.picLastName}
                    </TableCell>
                    <TableCell>{getTranslateworkType(supplier.workType)}</TableCell>
                    <TableCell>
                        <Stack direction="row">
                            <Tooltip placement="right" title={supplier.note}>
                                <Typography className="tooltip-content">{supplier.note}</Typography>
                            </Tooltip>
                        </Stack>
                    </TableCell>
                    {checkAllowedPermission(saleList.editSupplier) && (
                        <TableCell>
                            <Stack direction="row" justifyContent="center" alignItems="center">
                                <Tooltip placement="top" title={<FormattedMessage id="edit" />} onClick={() => handleOpen(supplier)}>
                                    <IconButton aria-label="edit" size="small">
                                        <EditTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip
                                    placement="top"
                                    title={<FormattedMessage id="delete" />}
                                    onClick={() => handleOpenDeleteConfirm(supplier, 'delete')}
                                >
                                    <IconButton aria-label="delete" size="small">
                                        <HighlightOffIcon sx={{ fontSize: '1.1rem' }} />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                        </TableCell>
                    )}
                </TableRow>
            ))}
        </TableBody>
    );
};

export default SupplierCheckingTBody;
