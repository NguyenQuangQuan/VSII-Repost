/* eslint-disable prettier/prettier */
// material-ui
import { IconButton, Stack, TableBody, TableCell, TableRow, Tooltip } from '@mui/material';

// assets
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';

// third party
import { FormattedMessage } from 'react-intl';
import { convertStatus } from 'utils/common';

// project imports
import { PERMISSIONS } from 'constants/Permission';
import { checkAllowedPermission } from 'utils/authorization';

interface ISkillsUpdateTBodyProps {
    pageNumber: number;
    pageSize: number;
    members: any[];
    handleShowDetail: (params: { memberCode: string; userName: string }) => void;
    handleViewPDF: (params: { memberCode: string }) => void;
    handleDownloadCV: (params: { memberCode: string; type: string }) => void;
}

const SkillsUpdateTBody = (props: ISkillsUpdateTBodyProps) => {
    const { pageNumber, pageSize, members, handleShowDetail, handleViewPDF, handleDownloadCV } = props;
    const { skillsUpdate } = PERMISSIONS.report.skillManage;

    return (
        <TableBody>
            {members?.map((mem, key) => (
                <TableRow key={key}>
                    <TableCell align="center">{pageSize * pageNumber + key + 1}</TableCell>
                    <TableCell align="center">{mem.memberCode}</TableCell>
                    <TableCell align="center">{mem.fullNameEn}</TableCell>
                    <TableCell align="left">
                        {mem?.title}-{mem?.titleName}
                    </TableCell>
                    <TableCell align="center">{mem.department}</TableCell>
                    <TableCell align="center">{convertStatus(mem.status)}</TableCell>
                    {checkAllowedPermission(skillsUpdate.edit) ||
                        checkAllowedPermission(skillsUpdate.download) ||
                        checkAllowedPermission(skillsUpdate.viewCV) ? (
                        <TableCell>
                            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                                {checkAllowedPermission(skillsUpdate.edit) && (
                                    <Tooltip
                                        placement="top"
                                        title={<FormattedMessage id="edit" />}
                                        onClick={() => handleShowDetail({ memberCode: mem.memberCode, userName: mem?.userName })}
                                    >
                                        <IconButton aria-label="delete" size="small">
                                            <EditTwoToneIcon />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                {checkAllowedPermission(skillsUpdate.download) && (
                                    <Tooltip placement="top" title={<FormattedMessage id="download-word" />}>
                                        <IconButton
                                            aria-label="delete"
                                            size="small"
                                            onClick={() => handleDownloadCV({ memberCode: mem.memberCode, type: 'DOC' })}
                                        >
                                            <DownloadIcon />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                {checkAllowedPermission(skillsUpdate.viewCV) && (
                                    <Tooltip placement="top" title={<FormattedMessage id="pdf" />}>
                                        <IconButton
                                            aria-label="delete"
                                            size="small"
                                            onClick={() => handleViewPDF({ memberCode: mem.memberCode })}
                                        >
                                            <PictureAsPdfIcon />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </Stack>
                        </TableCell>
                    ) : (
                        <></>
                    )}
                </TableRow>
            ))}
        </TableBody>
    );
};

export default SkillsUpdateTBody;
