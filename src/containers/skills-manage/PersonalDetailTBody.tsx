// React
import { forwardRef } from 'react';

// material-ui
import { Button, Stack, TableBody, TableCell, TableRow } from '@mui/material';

// project imports
import { PUBLIC_URL } from 'constants/Common';
import InputTable from './InputTable';

interface IPersonalDetailTBodyProps {
    avatarPreview: string | undefined;
    handleChangeAvatar: (e: any) => any;
    handleRemoveAvatar: () => void;
}

const PersonalDetailTBody = forwardRef((props: IPersonalDetailTBodyProps, ref: any) => {
    const { avatarPreview, handleRemoveAvatar, handleChangeAvatar } = props;
    return (
        <TableBody>
            <TableRow>
                <TableCell rowSpan={9} className="personal-detail-1st-col" align="center">
                    <Stack alignItems="center">
                        <div>
                            <img
                                src={avatarPreview ? avatarPreview : `${PUBLIC_URL}/no-avatar.png`}
                                alt="avatar"
                                style={{
                                    width: '210px',
                                    height: '280px',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                        <Stack direction="row" spacing={1}>
                            <Button color="error" onClick={handleRemoveAvatar}>
                                Remove
                            </Button>
                            <Button component="label" variant="contained" htmlFor="avatar">
                                Attach file
                            </Button>
                            <input type="file" id="avatar" hidden={true} onChange={handleChangeAvatar} accept="image/jpeg" ref={ref} />
                        </Stack>
                    </Stack>
                </TableCell>
                <TableCell className="personal-detail-2rd-col">Fullname</TableCell>
                <TableCell>
                    <InputTable name="personalDetail.fullname" />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="personal-detail-2rd-col">Job Titles</TableCell>
                <TableCell>
                    <InputTable name="personalDetail.jobTitle" />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="personal-detail-2rd-col">Date of Birth</TableCell>
                <TableCell>
                    <InputTable name="personalDetail.dateOfBirth" />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="personal-detail-2rd-col">Place of Birth</TableCell>
                <TableCell>
                    <InputTable name="personalDetail.placeOfBirth" />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="personal-detail-2rd-col">Gender</TableCell>
                <TableCell>
                    <InputTable name="personalDetail.gender" />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="personal-detail-2rd-col">Marital Status</TableCell>
                <TableCell>
                    <InputTable name="personalDetail.maritalStatus" />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="personal-detail-2rd-col">Email</TableCell>
                <TableCell>
                    <InputTable name="personalDetail.email" />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="personal-detail-2rd-col">Mobile</TableCell>
                <TableCell>
                    <InputTable name="personalDetail.mobile" />
                </TableCell>
            </TableRow>
        </TableBody>
    );
});

export default PersonalDetailTBody;
