import { forwardRef } from 'react';

// material-ui
import { Button, Stack, TableBody, TableCell, TableRow } from '@mui/material';

// project imports
import { DATE_FORMAT, PUBLIC_URL } from 'constants/Common';
import InputTable from './InputTable';

// third party
import moment from 'moment';

interface ISignatureTBodyProps {
    signaturePreview?: string;
    ref: any;
    handleChangeSignature: any;
    handleRemoveSignature: any;
    date?: any;
}

const SignatureTBody = forwardRef((props: ISignatureTBodyProps, ref: any) => {
    const { signaturePreview, handleChangeSignature, handleRemoveSignature, date } = props;
    const toDate = moment(date, DATE_FORMAT.DDMMYYYY).toDate();
    const lastDateFormat = date ? moment(toDate).format(DATE_FORMAT.DoMMMYY) : moment(new Date()).format(DATE_FORMAT.DoMMMYY);

    return (
        <TableBody>
            <TableRow>
                <TableCell>
                    I certify that the information declared above is true to the best of my knowledge and belief.
                    <br />
                    Ha Noi, {lastDateFormat}
                    <br />
                    Signatue
                    <Stack alignItems="left">
                        <div>
                            <img
                                src={signaturePreview ? signaturePreview : `${PUBLIC_URL}/no-image.jpg`}
                                alt="avatar"
                                style={{
                                    width: '150px',
                                    height: '100px',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                        <Stack direction="row" spacing={1}>
                            <Button color="error" onClick={handleRemoveSignature}>
                                Remove
                            </Button>
                            <Button component="label" variant="contained" htmlFor="signature">
                                Attach file
                            </Button>
                            <input
                                type="file"
                                id="signature"
                                hidden={true}
                                onChange={handleChangeSignature}
                                accept="image/jpeg"
                                ref={ref}
                            />
                        </Stack>
                        <InputTable name="personalDetail.fullname" placeholder="Fill fullname" disabled />
                    </Stack>
                </TableCell>
            </TableRow>
        </TableBody>
    );
});

export default SignatureTBody;
