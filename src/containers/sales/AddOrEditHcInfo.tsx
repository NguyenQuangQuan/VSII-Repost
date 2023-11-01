import { FormattedMessage } from 'react-intl';

// material-ui
import { Grid, Table, TableContainer } from '@mui/material';

// project imports
import { Input, NumericFormatCustom } from 'components/extended/Form';
import BiddingHCThead from './BiddingHCThead';
import BiddingHCTBody from './BiddingHCTBody';

export interface AddOrEditHcInfoProps {
    monthlyHCLists?: any;
    handleOpen: () => void;
    onChangeHcMonthly?: () => void;
    contractTypeValue?: string;
}
const AddOrEditHcInfo = (props: AddOrEditHcInfoProps) => {
    const { monthlyHCLists, handleOpen, onChangeHcMonthly, contractTypeValue } = props;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
                <Input
                    label={<FormattedMessage id="billable-hcs" />}
                    name="billableHcs"
                    textFieldProps={{
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    disabled
                    label={<FormattedMessage id="quarter-1st" />}
                    name="quarter1st"
                    textFieldProps={{
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    disabled
                    label={<FormattedMessage id="hcs" />}
                    name="hcs"
                    textFieldProps={{
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    disabled
                    label={<FormattedMessage id="quarter-2nd" />}
                    name="quarter2nd"
                    textFieldProps={{
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    label={<FormattedMessage id="team-lead-hcs" />}
                    name="teamLeadHcs"
                    textFieldProps={{
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    disabled
                    label={<FormattedMessage id="quarter-3rd" />}
                    name="quarter3rd"
                    textFieldProps={{
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    label={<FormattedMessage id="senior-hcs" />}
                    name="seniorHcs"
                    textFieldProps={{
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    disabled
                    label={<FormattedMessage id="quarter-4th" />}
                    name="quarter4th"
                    textFieldProps={{
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    label={<FormattedMessage id="middle-hcs" />}
                    name="middleHcs"
                    textFieldProps={{
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    disabled
                    label={<FormattedMessage id="total-new-sale" />}
                    name="totalNewSale"
                    textFieldProps={{
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    label={<FormattedMessage id="junior-hcs" />}
                    name="juniorHcs"
                    textFieldProps={{
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    disabled
                    label={<FormattedMessage id="total-billable" />}
                    name="totalBillable"
                    textFieldProps={{
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                />
            </Grid>

            <TableContainer>
                <Table>
                    <BiddingHCThead contractTypeValue={contractTypeValue} monthlyHCLists={monthlyHCLists} />
                    <BiddingHCTBody
                        monthlyHCList={monthlyHCLists}
                        handleOpen={handleOpen}
                        onChange={onChangeHcMonthly}
                        contractTypeValue={contractTypeValue}
                    />
                </Table>
            </TableContainer>
        </Grid>
    );
};

export default AddOrEditHcInfo;
