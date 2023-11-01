import { FormattedMessage } from 'react-intl';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { Input } from 'components/extended/Form';
import { Member } from 'containers/search';
import { E_IS_LOGTIME } from 'constants/Common';

export interface IAddOrEditOtherInfoProps {
    handleChange: (data: any) => void;
}

const AddOrEditOtherInfo = (props: IAddOrEditOtherInfoProps) => {
    const { handleChange } = props;
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
                <Member
                    isLogTime={E_IS_LOGTIME.YES}
                    isDefaultAll
                    name="contact"
                    label={<FormattedMessage id="contact" />}
                    isIdHexString
                    handleChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input label={<FormattedMessage id="phone-number" />} name="phoneNumber" />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input label={<FormattedMessage id="presale-folder" />} name="presaleFolder" />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input label={<FormattedMessage id="email-address" />} name="emailAddress" />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input label={<FormattedMessage id="customer-contact" />} name="customerContact" />
            </Grid>
        </Grid>
    );
};

export default AddOrEditOtherInfo;
