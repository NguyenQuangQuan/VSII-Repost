import { FormattedMessage } from 'react-intl';
import { yupResolver } from '@hookform/resolvers/yup';

// material-ui
import { Grid, Stack, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// project imports
import Modal from 'components/extended/Modal';
import { FormProvider, Input } from 'components/extended/Form';
import { gridSpacing } from 'store/constant';
import { IEffortPlanDepartment } from 'types';
import { updateEffortPlanFormDefault, updateEffortPlanFormSchema } from 'pages/monthly-effort/Config';

// ==============================|| UPDATE EFFORT PLAN DIALOG ||============================== //

interface IUpdateEffortPlanProps {
    open: boolean;
    effortPlanDepts: IEffortPlanDepartment[];
    handleClose: () => void;
    updateEffortPlan: (effortPlanDepts: IEffortPlanDepartment[]) => void;
}

const UpdateEffortPlan = ({ open, effortPlanDepts, handleClose, updateEffortPlan }: IUpdateEffortPlanProps) => {
    const handleSubmit = (values: any) => {
        const convertValue = [
            {
                department: 'SCS',
                effortplanMissing: values.effortPlanDepts[0].effortplanMissing,
                effortplanSent: values.effortPlanDepts[0].effortplanSent
            },
            {
                department: 'PRD',
                effortplanMissing: values.effortPlanDepts[1].effortplanMissing,
                effortplanSent: values.effortPlanDepts[1].effortplanSent
            }
        ];
        updateEffortPlan(convertValue);
    };

    return (
        <Modal isOpen={open} title="effort-plan" onClose={handleClose}>
            <FormProvider
                form={{
                    defaultValues: updateEffortPlanFormDefault,
                    resolver: yupResolver(updateEffortPlanFormSchema)
                }}
                formReset={{ effortPlanDepts }}
                onSubmit={handleSubmit}
            >
                <Grid container spacing={gridSpacing}>
                    <TableContainer>
                        <Table aria-label="simple table" size="small" sx={{ '& td, & th': { border: 0 } }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell align="center">
                                        <FormattedMessage id="sent-monthly" />
                                    </TableCell>
                                    <TableCell align="center">
                                        <FormattedMessage id="not-sent-monthly" />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {updateEffortPlanFormDefault.effortPlanDepts.map((item: IEffortPlanDepartment, index: number) => {
                                    const fieldName = `effortPlanDepts[${index}]`;
                                    return (
                                        <TableRow key={fieldName}>
                                            <TableCell sx={{ fontWeight: 500 }}>{item.department}</TableCell>
                                            <TableCell>
                                                <Input name={`${fieldName}.effortplanSent`} />
                                            </TableCell>
                                            <TableCell>
                                                <Input name={`${fieldName}.effortplanMissing`} />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid item xs={12}>
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Button color="error" onClick={handleClose}>
                                <FormattedMessage id="cancel" />
                            </Button>
                            <LoadingButton variant="contained" type="submit">
                                <FormattedMessage id="submit" />
                            </LoadingButton>
                        </Stack>
                    </Grid>
                </Grid>
            </FormProvider>
        </Modal>
    );
};

export default UpdateEffortPlan;
