// material-ui
import { LoadingButton } from '@mui/lab';
import {
    Box,
    Button,
    DialogActions,
    Grid,
    IconButton,
    Stack,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Tooltip
} from '@mui/material';
import { AddCircleOutlineIcon } from 'assets/images/icons';

// project imports
import { FormProvider, Input, Label, NumericFormatCustom } from 'components/extended/Form';
import Modal from 'components/extended/Modal';
import { MonthlyBillable } from 'containers/search';

// third party
import { FormattedMessage } from 'react-intl';
import MonthlyBillableThead from './MonthlyBillableThead';
import { Table } from 'components/extended/Table';
import MonthlyBillableTBody from './MonthlyBillableTBody';
import { formatPrice } from 'utils/common';
import { CONTRACT_TYPE_SALE_REPORT } from 'constants/Common';

interface IAddOrEditBiddingProps {
    open?: boolean | undefined;
    isEdit?: boolean;
    handleClose?: () => void;
    loading?: boolean;
    handleSubmit?: any;
    handleProvisionalCalculation?: any;
    handleRemoveHcInfo: (index: number) => void;
    handleChangeRate: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    handleChangeRateVND: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeQuantity: (e: React.ChangeEvent<HTMLInputElement>) => void;
    hcInfoMonthValues: any;
    addRankCostHistoryHandler: any;
    methods?: any;
    total?: number;
    contractTypeValue?: string;
    onSubmit?: any;
    sizeVNDValue: any;
}

const TMOrFCBidding = (props: IAddOrEditBiddingProps) => {
    const {
        open,
        isEdit,
        handleClose,
        loading,
        total,
        handleSubmit,
        handleProvisionalCalculation,
        handleRemoveHcInfo,
        handleChangeRate,
        handleChangeRateVND,
        handleChangeQuantity,
        hcInfoMonthValues,
        addRankCostHistoryHandler,
        contractTypeValue,
        methods,
        sizeVNDValue
    } = props;

    const onSubmitForm = (value: any) => {
        handleSubmit();
    };

    // Hooks, State, Variable, Props

    return (
        <Modal isOpen={open!} title={'monthly-billable'} onClose={handleClose} keepMounted={false} maxWidth="md">
            <FormProvider formReturn={methods} onSubmit={onSubmitForm}>
                <Grid item xs={12} lg={12}>
                    <MonthlyBillable required />
                </Grid>
                {contractTypeValue === CONTRACT_TYPE_SALE_REPORT.FIX_COST_BIDDING && (
                    <Grid item xs={12} lg={12}>
                        <Box sx={{ margin: '15px 0px' }}>
                            <span style={{ paddingRight: '15px' }}> Size VND :</span>
                            <span>{formatPrice(sizeVNDValue)}</span>
                        </Box>
                        <Input
                            textFieldProps={{
                                InputProps: {
                                    inputComponent: NumericFormatCustom as any
                                }
                            }}
                            name="contractAllocationByMonth"
                            label={<FormattedMessage id="contract-allocation-by-month" />}
                        />
                    </Grid>
                )}

                <Grid item xs={12} lg={12} sx={{ marginBottom: '10px' }}>
                    <Grid>
                        <Label label="&nbsp;" />
                        <Button variant="contained" onClick={() => handleProvisionalCalculation()}>
                            <FormattedMessage id="estimate" />
                        </Button>
                    </Grid>
                </Grid>

                <Input
                    textFieldProps={{
                        InputProps: {
                            inputComponent: NumericFormatCustom as any
                        }
                    }}
                    name="billable"
                    label={<FormattedMessage id="billable" />}
                />
                {contractTypeValue === CONTRACT_TYPE_SALE_REPORT.TM && (
                    <Grid item xs={12} lg={12}>
                        <TableContainer>
                            <Stack
                                direction="row"
                                justifyContent="left"
                                alignItems="left"
                                paddingTop={'20px'}
                                paddingLeft={'10px'}
                                maxWidth="md"
                            >
                                <Tooltip placement="top" title="add" onClick={() => addRankCostHistoryHandler()}>
                                    <IconButton aria-label="delete" size="small">
                                        <AddCircleOutlineIcon sx={{ fontSize: '1.1rem' }} />
                                    </IconButton>
                                </Tooltip>
                            </Stack>

                            <Table
                                heads={<MonthlyBillableThead dataArray={hcInfoMonthValues} />}
                                data={hcInfoMonthValues}
                                heightTableEmpty="100px"
                            >
                                <TableBody>
                                    {hcInfoMonthValues?.map((item: any, key: number) => (
                                        <MonthlyBillableTBody
                                            key={item.id}
                                            item={item}
                                            index={key}
                                            remove={handleRemoveHcInfo}
                                            handleChangeRate={handleChangeRate}
                                            handleChangeRateVND={handleChangeRateVND}
                                            handleChangeQuantity={handleChangeQuantity}
                                        />
                                    ))}

                                    <TableRow>
                                        <TableCell colSpan={4} />
                                        <TableCell align="center">
                                            <FormattedMessage id="total" />
                                        </TableCell>
                                        <TableCell>{formatPrice(total)}</TableCell>
                                        <TableCell />
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                )}

                {/* Cancel | Submit */}
                <Grid item xs={12}>
                    <DialogActions>
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Button color="error" onClick={handleClose}>
                                <FormattedMessage id="cancel" />
                            </Button>
                            <LoadingButton loading={loading} variant="contained" type="submit">
                                {isEdit ? <FormattedMessage id="submit" /> : <FormattedMessage id="add" />}
                            </LoadingButton>
                        </Stack>
                    </DialogActions>
                </Grid>
            </FormProvider>
        </Modal>
    );
};

export default TMOrFCBidding;
