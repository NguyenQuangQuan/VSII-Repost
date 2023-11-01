import React, { useState } from 'react';

// material-ui
import { TableCell, TableRow } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

//third-party
import { FormattedMessage } from 'react-intl';

//project import
import { ISkillsReport } from 'types';
import sendRequest from 'services/ApiService';
import Api from 'constants/Api';
import { convertStatus, showPdfInNewTab } from 'utils/common';
import { PERMISSIONS } from 'constants/Permission';
import { checkAllowedPermission } from 'utils/authorization';

interface ISkillsReportRowProps {
    data: ISkillsReport;
    page: number;
    size: number;
    index: number;
}

const SkillsReportRow = (props: ISkillsReportRowProps) => {
    const { data, page, size, index } = props;
    const [open, setOpen] = useState<boolean>(false);
    const { skillsUpdate } = PERMISSIONS.report.skillManage;

    const handleViewPDF = async (params: { memberCode: string }) => {
        const response = await sendRequest(Api.skills_manage.viewPDF, params);
        if (response?.status) {
            const { content } = response.result;
            showPdfInNewTab(content.pdf);
        } else {
            return;
        }
    };

    const translateDegree = (degree: string) => {
        switch (degree) {
            case 'diploma-degree':
                return <FormattedMessage id="diploma-degree" />;
            case 'college-degree':
                return <FormattedMessage id="college-degree" />;
            case 'post-graduated':
                return <FormattedMessage id="post-graduated" />;
            case 'other':
                return <FormattedMessage id="other" />;
            default:
                return '';
        }
    };

    return (
        <>
            <TableRow>
                {data && data.technologySkillResponse.length > 1 ? (
                    <TableCell width="40px">
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                ) : (
                    <TableCell width="40px" />
                )}
                <TableCell>{size * page + index + 1}</TableCell>
                <TableCell>{data.memberCode}</TableCell>
                <TableCell
                    sx={{
                        cursor: checkAllowedPermission(skillsUpdate.viewCV) ? 'pointer' : 'unset',
                        '&:hover': {
                            fontWeight: checkAllowedPermission(skillsUpdate.viewCV) ? 'bold' : 'inherit'
                        }
                    }}
                    onClick={checkAllowedPermission(skillsUpdate.viewCV) ? () => handleViewPDF({ memberCode: data.memberCode }) : undefined}
                >
                    {data.fullNameEn}
                </TableCell>
                <TableCell>{data.title}</TableCell>
                <TableCell colSpan={3} sx={{ padding: '6px 0' }}>
                    <TableRow
                        key={index}
                        sx={{
                            display: 'table',
                            width: '100%',
                            '.MuiTableCell-root': {
                                borderBottom: 'none',
                                wordBreak: 'break-all'
                            }
                        }}
                    >
                        <TableCell
                            sx={{
                                fontWeight:
                                    data.technologySkillResponse.length > 0 && data.technologySkillResponse[0].mainSkill ? 'bold' : '400'
                            }}
                            width={'33.333%'}
                            align="center"
                        >
                            {data.technologySkillResponse.length > 0 && data.technologySkillResponse[0].techName}
                        </TableCell>
                        <TableCell align="center" width={'33.333%'}>
                            {data.technologySkillResponse.length > 0 && data.technologySkillResponse[0].level}
                        </TableCell>
                        <TableCell align="center">
                            {data.technologySkillResponse.length > 0 && data.technologySkillResponse[0].experiences}
                        </TableCell>
                    </TableRow>
                </TableCell>
                <TableCell>{translateDegree(data.degree)}</TableCell>
                <TableCell>{convertStatus(data.status)}</TableCell>
            </TableRow>
            {data && data.technologySkillResponse.length > 1 && (
                <TableRow
                    sx={{
                        '& > .MuiTableCell-root': {
                            borderBottom: 'none',
                            wordBreak: 'break-all'
                        }
                    }}
                >
                    <TableCell colSpan={5} />
                    <TableCell colSpan={3} sx={{ padding: '6px 0' }}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            {data.technologySkillResponse.slice(1).map((item, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        display: 'table',
                                        width: '100%'
                                    }}
                                >
                                    <TableCell align="center" width={'33.333%'}>
                                        {item.techName}
                                    </TableCell>
                                    <TableCell align="center" width={'33.333%'}>
                                        {item.level}
                                    </TableCell>
                                    <TableCell align="center">{item.experiences}</TableCell>
                                </TableRow>
                            ))}
                        </Collapse>
                    </TableCell>
                </TableRow>
            )}
        </>
    );
};

export default SkillsReportRow;
