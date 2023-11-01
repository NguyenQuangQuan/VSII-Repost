import { FormattedMessage } from 'react-intl';
// material-ui
import { Grid } from '@mui/material';
// project imports
import { DatePicker, Input, PercentageFormat } from 'components/extended/Form';
import { BiddingStatus, BiddingType, ContractType, ServiceType } from 'containers/search';
import { PERCENT_PLACEHOLDER } from 'constants/Common';

type IAddOrEditProjectInfoProps = {
    isEdit?: boolean;
    handleChange: any;
};

const AddOrEditProjectInfo = (props: IAddOrEditProjectInfoProps) => {
    const { isEdit, handleChange } = props;
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
                <Input required name="year" label={<FormattedMessage id="year" />} disabled />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input label={<FormattedMessage id="contract-no" />} name="contractNo" />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input label={<FormattedMessage id="customer" />} name="customer" />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    name="probability"
                    label={<FormattedMessage id="probability" />}
                    textFieldProps={{
                        placeholder: PERCENT_PLACEHOLDER,
                        InputProps: {
                            inputComponent: PercentageFormat as any
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input required label={<FormattedMessage id="project-name" />} name="projectName" disabled={isEdit} />
            </Grid>
            <Grid item xs={12} lg={6}>
                <BiddingStatus required isShowAll />
            </Grid>
            <Grid item xs={12} lg={6}>
                <BiddingType required isShowAll name="type" disabled={isEdit} />
            </Grid>
            <Grid item xs={12} lg={6}>
                <DatePicker name="contractDueDate" label={<FormattedMessage id="contract-date" />} />
            </Grid>
            <Grid item xs={12} lg={6}>
                <ServiceType required isShowAll name="serviceType" disabled={isEdit} />
            </Grid>
            <Grid item xs={12} lg={6}>
                <DatePicker name="contractDurationFrom" label={<FormattedMessage id="contract-duration-from" />} />
            </Grid>
            <Grid item xs={12} lg={6}>
                <ContractType required isShowAll name="contractType" handleChange={handleChange} />
            </Grid>
            <Grid item xs={12} lg={6}>
                <DatePicker name="contractDurationTo" label={<FormattedMessage id="contract-duration-to" />} />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    textFieldProps={{ placeholder: 'Enter note', multiline: true, rows: 4 }}
                    name="note"
                    label={<FormattedMessage id="note" />}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input label={<FormattedMessage id="warranty-time" />} name="warrantyTime" />
            </Grid>
        </Grid>
    );
};

export default AddOrEditProjectInfo;
