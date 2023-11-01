import { FormattedMessage } from 'react-intl';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { Input, NumericFormatCustom } from 'components/extended/Form';
import { MONEY_PLACEHOLDER } from 'constants/Common';
import { CurrencyVND } from 'containers/search';
import { IOption } from 'types';

interface IAddOrEditFinancialInfoProps {
    handleChangeCurrency?: (data: IOption) => void;
    isEdit?: boolean;
}
const AddOrEditFinancialInfo = (props: IAddOrEditFinancialInfoProps) => {
    const { handleChangeCurrency, isEdit } = props;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
                <CurrencyVND handleChangeFullOption={handleChangeCurrency} disabled={isEdit} required />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    name="acctReceivables"
                    label={<FormattedMessage id="acct-receivables" />}
                    textFieldProps={{
                        placeholder: MONEY_PLACEHOLDER,
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    textFieldProps={{
                        placeholder: MONEY_PLACEHOLDER,
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                    label={<FormattedMessage id="original-contract-size" />}
                    name="originalContractSize"
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    name="netEarn"
                    label={<FormattedMessage id="net-earn" />}
                    disabled
                    textFieldProps={{
                        placeholder: MONEY_PLACEHOLDER,
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    disabled
                    label={<FormattedMessage id="exchange-rate" />}
                    name="exchangeRate"
                    textFieldProps={{
                        placeholder: MONEY_PLACEHOLDER,
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    name="paid"
                    label={<FormattedMessage id="paid" />}
                    textFieldProps={{
                        placeholder: MONEY_PLACEHOLDER,
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    name="sizeVND"
                    label={<FormattedMessage id="size-vnd" />}
                    disabled
                    textFieldProps={{
                        placeholder: MONEY_PLACEHOLDER,
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    name="remain"
                    label={<FormattedMessage id="remain" />}
                    disabled
                    textFieldProps={{
                        placeholder: MONEY_PLACEHOLDER,
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    name="sizeUSD"
                    label={<FormattedMessage id="size-usd" />}
                    disabled
                    textFieldProps={{
                        placeholder: MONEY_PLACEHOLDER,
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    name="quarterLicense1st"
                    label={<FormattedMessage id="quarter-license-1st" />}
                    textFieldProps={{
                        placeholder: MONEY_PLACEHOLDER,
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    name="managementRevenueAllocated"
                    label={<FormattedMessage id="management-revenue-allocated" />}
                    disabled
                    textFieldProps={{
                        placeholder: MONEY_PLACEHOLDER,
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    name="quarterLicense2nd"
                    label={<FormattedMessage id="quarter-license-2nd" />}
                    textFieldProps={{
                        placeholder: MONEY_PLACEHOLDER,
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    name="accountRevenueAllocatedVND"
                    label={<FormattedMessage id="accountant-revenue-allocatedVND" />}
                    textFieldProps={{
                        placeholder: MONEY_PLACEHOLDER,
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    name="quarterLicense3rd"
                    label={<FormattedMessage id="quarter-license-3rd" />}
                    textFieldProps={{
                        placeholder: MONEY_PLACEHOLDER,
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    name="newSaleUSD"
                    label={<FormattedMessage id="new-sale-usd" />}
                    disabled
                    textFieldProps={{
                        placeholder: MONEY_PLACEHOLDER,
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    name="quarterLicense4th"
                    label={<FormattedMessage id="quarter-license-4th" />}
                    textFieldProps={{
                        placeholder: MONEY_PLACEHOLDER,
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Input
                    name="licenseFee"
                    label={<FormattedMessage id="license-fee" />}
                    textFieldProps={{
                        placeholder: MONEY_PLACEHOLDER,
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default AddOrEditFinancialInfo;
