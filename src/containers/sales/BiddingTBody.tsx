// materia-ui
import { IconButton, Stack, TableBody, TableCell, TableRow, Tooltip, Typography } from '@mui/material';

// third party
import { FormattedMessage } from 'react-intl';

// project imports
import { ISaleBidding } from 'types';
import { PERMISSIONS } from 'constants/Permission';
import { checkAllowedPermission } from 'utils/authorization';
import { dateFormat } from 'utils/date';
import { formatPrice } from 'utils/common';

// assets
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';

interface BiddingTBodyProps {
    pageNumber: number;
    pageSize: number;
    saleBiddings: ISaleBidding[];
    handleOpen: (saleBidding?: ISaleBidding) => void;
    handleDelete: (idHexString: string) => void;
}

const BiddingTBody = (props: BiddingTBodyProps) => {
    const { saleBiddings, handleOpen, handleDelete, pageNumber, pageSize } = props;
    const { biddingPermission } = PERMISSIONS.sale.salePipeline;

    return (
        <TableBody>
            {saleBiddings.map((saleBidding: ISaleBidding, key: number) => (
                <TableRow key={key}>
                    {checkAllowedPermission(biddingPermission.edit) || checkAllowedPermission(biddingPermission.delete) ? (
                        <TableCell sx={{ position: 'sticky', left: 0, zIndex: 2, backgroundColor: 'white' }}>
                            <Stack direction="row" justifyContent="center" alignItems="center">
                                {checkAllowedPermission(biddingPermission.edit) && (
                                    <Tooltip placement="top" title={<FormattedMessage id="edit" />} onClick={() => handleOpen(saleBidding)}>
                                        <IconButton aria-label="edit" size="small">
                                            <EditTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                {checkAllowedPermission(biddingPermission.delete) && (
                                    <Tooltip
                                        placement="top"
                                        title={<FormattedMessage id="delete" />}
                                        onClick={() => handleDelete(saleBidding.idHexString)}
                                    >
                                        <IconButton aria-label="edit" size="small">
                                            <ClearSharpIcon sx={{ fontSize: '1.1rem' }} />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </Stack>
                        </TableCell>
                    ) : (
                        <></>
                    )}
                    <TableCell>{pageSize * pageNumber + key + 1}</TableCell>
                    <TableCell>
                        <Stack direction="row">
                            <Tooltip placement="right" title={saleBidding.project.contractType}>
                                <Typography className="tooltip-content">{saleBidding.project.contractType}</Typography>
                            </Tooltip>
                        </Stack>
                    </TableCell>
                    <TableCell>
                        <Stack direction="row">
                            <Tooltip placement="right" title={saleBidding.project.customer}>
                                <Typography className="tooltip-content">{saleBidding.project.customer}</Typography>
                            </Tooltip>
                        </Stack>
                    </TableCell>
                    <TableCell>
                        <Stack direction="row">
                            <Tooltip placement="right" title={saleBidding.project.projectName}>
                                <Typography className="tooltip-content">{saleBidding.project.projectName}</Typography>
                            </Tooltip>
                        </Stack>
                    </TableCell>
                    <TableCell>
                        <Stack direction="row">
                            <Tooltip placement="right" title={saleBidding.project.contractNo}>
                                <Typography className="tooltip-content">{saleBidding.project.contractNo}</Typography>
                            </Tooltip>
                        </Stack>
                    </TableCell>
                    <TableCell>
                        <Stack direction="row">
                            <Tooltip placement="right" title={saleBidding.project.probability}>
                                <Typography className="tooltip-content">
                                    {saleBidding.project.probability ? saleBidding.project.probability + '%' : ''}
                                </Typography>
                            </Tooltip>
                        </Stack>
                    </TableCell>
                    <TableCell>
                        <Stack direction="row">
                            <Tooltip placement="right" title={saleBidding.project.status}>
                                <Typography className="tooltip-content">{saleBidding.project.status}</Typography>
                            </Tooltip>
                        </Stack>
                    </TableCell>
                    <TableCell>
                        <Stack direction="row">
                            <Tooltip placement="right" title={formatPrice(saleBidding.financialInfo.sizeVND)}>
                                <Typography className="tooltip-content">{formatPrice(saleBidding.financialInfo.sizeVND)}</Typography>
                            </Tooltip>
                        </Stack>
                    </TableCell>
                    <TableCell>
                        <Stack direction="row">
                            <Tooltip placement="right" title={formatPrice(saleBidding.financialInfo.sizeUSD)}>
                                <Typography className="tooltip-content">{formatPrice(saleBidding.financialInfo.sizeUSD)}</Typography>
                            </Tooltip>
                        </Stack>
                    </TableCell>
                    <TableCell>
                        <Stack direction="row">
                            <Typography className="tooltip-content">{dateFormat(saleBidding.project.contractDueDate)}</Typography>
                        </Stack>
                    </TableCell>
                    <TableCell>
                        <Stack direction="row">
                            <Typography className="tooltip-content">
                                {`${dateFormat(saleBidding.project.contractDurationFrom)} - ${dateFormat(
                                    saleBidding.project.contractDurationTo
                                )}`}
                            </Typography>
                        </Stack>
                    </TableCell>
                    <TableCell>
                        <Stack direction="row">
                            <Tooltip placement="right" title={saleBidding.project.warrantyTime}>
                                <Typography className="tooltip-content">{saleBidding.project.warrantyTime}</Typography>
                            </Tooltip>
                        </Stack>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default BiddingTBody;
