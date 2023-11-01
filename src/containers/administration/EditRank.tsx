import { useForm, useFieldArray } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

// yup
import { yupResolver } from '@hookform/resolvers/yup';

// material-ui
import { LoadingButton } from '@mui/lab';
import { Grid, Stack, Button, TableContainer, TableBody, Tooltip, IconButton, Typography } from '@mui/material';

// project import
import Modal from 'components/extended/Modal';
import { gridSpacing } from 'store/constant';
import { FormProvider } from 'components/extended/Form';
import { editRankFormSchema, IEditRank, rankCostHistoryFormDefault } from 'pages/administration/Config';
import { getUserInfoCookies } from 'utils/cookies';
import { IRank, IRankCostHistory } from 'types';
import { dateFormat } from 'utils/date';
import { DATE_FORMAT } from 'constants/Common';
import RankCostHistoryThead from './RankCostHistoryThead';
import RankCostHistoryTBody from './RankCostHistoryTBody';
import { AddCircleOutlineIcon } from 'assets/images/icons';
import { Table } from 'components/extended/Table';

type IEditRankProps = {
    rank: IRank;
    open: boolean;
    handleClose: () => void;
    handleEditRank: (rank: IEditRank) => void;
    loading: boolean;
};

const EditRank = (props: IEditRankProps) => {
    const { open, handleClose, rank, handleEditRank, loading } = props;
    const { userName } = getUserInfoCookies();
    const costHistoryListFormDefault: any = [rankCostHistoryFormDefault];
    const methods = useForm({
        defaultValues: {
            rankCostHistoryList: rank ? rank.rankCostHistoryList : costHistoryListFormDefault
        },
        resolver: yupResolver(editRankFormSchema),
        mode: 'all'
    });

    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: 'rankCostHistoryList'
    });

    const addRankCostHistoryHandler = () => {
        append(rankCostHistoryFormDefault);
    };

    const handleSubmit = (values: IEditRank) => {
        const value = values.rankCostHistoryList.map((item: IRankCostHistory) => ({
            fromDate: dateFormat(item.fromDate, DATE_FORMAT.DDMMYYYY),
            toDate: dateFormat(item.toDate, DATE_FORMAT.DDMMYYYY),
            amount: item.amount
        }));
        const payload = { rankCostHistoryList: value, userUpdate: userName, idHexString: rank.idHexString };
        handleEditRank(payload);
    };

    return (
        <Modal isOpen={open} title="edit-rank" onClose={handleClose} keepMounted={false} maxWidth="md">
            <FormProvider formReturn={{ ...methods }} onSubmit={handleSubmit}>
                <Grid container spacing={gridSpacing}>
                    <Typography variant="subtitle1" sx={{ paddingLeft: '10px' }}>
                        <span style={{ fontWeight: '400' }}>
                            <FormattedMessage id="rank-name" />
                        </span>
                        : {rank?.rankName}
                    </Typography>

                    <TableContainer>
                        <Stack direction="row" sx={{ paddingTop: '10px', paddingLeft: '10px', justifyContent: 'left', alignItems: 'left' }}>
                            <Tooltip placement="top" title={<FormattedMessage id={'add'} />} onClick={() => addRankCostHistoryHandler()}>
                                <IconButton aria-label="Add" size="small">
                                    <AddCircleOutlineIcon sx={{ fontSize: '1.1rem' }} />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        <Table heads={<RankCostHistoryThead />} data={fields}>
                            <TableBody>
                                {fields.map((item, key) => (
                                    <RankCostHistoryTBody key={item.id} index={key} remove={remove} count={fields.length} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid item xs={12}>
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Button color="error" onClick={handleClose}>
                                <FormattedMessage id="cancel" />
                            </Button>
                            <LoadingButton loading={loading} variant="contained" type="submit">
                                <FormattedMessage id="submit" />
                            </LoadingButton>
                        </Stack>
                    </Grid>
                </Grid>
            </FormProvider>
        </Modal>
    );
};

export default EditRank;
