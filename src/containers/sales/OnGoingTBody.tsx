import React from 'react';

// material-ui
import { IconButton, Stack, TableBody, TableCell, TableRow, Tooltip } from '@mui/material';

// project imports
import { ISaleOnGoingItem } from 'types';
import { dateFormat } from 'utils/date';
import { formatPrice } from 'utils/common';
import { PERMISSIONS } from 'constants/Permission';
import { checkAllowedPermission } from 'utils/authorization';

// third party
import { FormattedMessage } from 'react-intl';

// assets
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';

interface IOnGoingTBodyProps {
    page: number;
    size: number;
    items: ISaleOnGoingItem[];
    handleOpen: (items?: ISaleOnGoingItem) => void;
    handleDelete: (idHexString: string) => void;
}

const OnGoingTBody = (props: IOnGoingTBodyProps) => {
    const { page, size, items, handleOpen, handleDelete } = props;
    const { onGoingPermission } = PERMISSIONS.sale.salePipeline;

    return (
        <TableBody>
            {items?.map((pro: ISaleOnGoingItem, key) => (
                <TableRow key={key}>
                    {checkAllowedPermission(onGoingPermission.delete) || checkAllowedPermission(onGoingPermission.edit) ? (
                        <TableCell align="center" sx={{ position: 'sticky', left: 0, zIndex: 1, backgroundColor: 'white' }}>
                            <Stack direction="row" justifyContent="center" alignItems="center">
                                {checkAllowedPermission(onGoingPermission.delete) && (
                                    <Tooltip placement="top" title={<FormattedMessage id="edit" />} onClick={() => handleOpen(pro)}>
                                        <IconButton aria-label="delete" size="small">
                                            <EditTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                {checkAllowedPermission(onGoingPermission.delete) && (
                                    <Tooltip
                                        placement="top"
                                        title={<FormattedMessage id="delete" />}
                                        onClick={() => handleDelete(pro.idHexString)}
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

                    <TableCell>{size * page + key + 1}</TableCell>
                    <TableCell>{pro.projectInfo.contractType}</TableCell>
                    <TableCell>{pro.projectInfo.customer}</TableCell>
                    <TableCell>{pro.projectInfo.projectName}</TableCell>
                    <TableCell>{pro.projectInfo.contractNo}</TableCell>
                    <TableCell>{pro.projectInfo.probability ? pro.projectInfo.probability + '%' : ''}</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{pro.projectInfo.status}</TableCell>
                    <TableCell>{formatPrice(pro.financialInfo.sizeVND)}</TableCell>
                    <TableCell>{formatPrice(pro.financialInfo.sizeUSD)}</TableCell>
                    <TableCell>{dateFormat(pro.projectInfo.contractDueDate)}</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                        {pro.projectInfo.contractDurationFrom &&
                            pro.projectInfo.contractDurationTo &&
                            `${dateFormat(pro.projectInfo.contractDurationFrom)} - ${dateFormat(pro.projectInfo.contractDurationTo)}`}
                    </TableCell>
                    <TableCell>{pro.projectInfo.warrantyTime}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default OnGoingTBody;
