import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

// material-ui
import { Button, Grid, SelectChangeEvent, TableBody, Typography } from '@mui/material';

// project imports
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider } from 'components/extended/Form';
import Modal from 'components/extended/Modal';
import { Table } from 'components/extended/Table';
import { Years } from 'containers/search';
import { ClosingDateWorkingCalendarConfig, ClosingDateWorkingCalendarSchema } from 'pages/register-working-calendar/Config';
import { gridSpacing } from 'store/constant';
import { IClosingDate } from 'types/working-calendar';
import ClosingDateTBody from './ClosingDateTBody';
import ClosingDateWorkingCalendarThead from './ClosingDateThead';
import EditClosingDateWorkingCalendar from './EditClosingDateWorkingCalenda';

// ==============================|| CLosing Date Working Calendar Modal ||============================== //

interface IClosingDateWorkingCalendarProps {
    openClosingDate: boolean;
    handleClose: () => void;
    closingDate: IClosingDate;
    getDataTable: (year: number) => void;
    postEditClosingDate: (item: IClosingDate) => void;
    openEditClosingDate: boolean;
    setEditClosingDate: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClosingDateWorkingCalendar = ({
    openClosingDate,
    handleClose,
    closingDate,
    getDataTable,
    postEditClosingDate,
    openEditClosingDate,
    setEditClosingDate
}: IClosingDateWorkingCalendarProps) => {
    const [closingDateOfMonth, setClosingDateOfMonth] = useState<IClosingDate>();
    // funtion

    const handleChangeYear = (e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>) => {
        const { value } = e.target;
        getDataTable(value as number);
    };

    const handleSubmit = (values: IClosingDate) => {
        // setYearClosing(values.year as number);
    };

    const handleOpenDialog = (value: any) => {
        setClosingDateOfMonth(
            closingDate
                ? {
                      ...closingDate,
                      closingDates: value
                  }
                : ClosingDateWorkingCalendarConfig
        );
        setEditClosingDate(true);
    };

    const handleCloseModalEdit = () => {
        setEditClosingDate(false);
    };

    return (
        <>
            <Modal isOpen={openClosingDate} title={'closing-date'} onClose={handleClose} keepMounted={false}>
                <FormProvider
                    form={{
                        defaultValues: ClosingDateWorkingCalendarConfig,
                        resolver: yupResolver(ClosingDateWorkingCalendarSchema)
                    }}
                    formReset={closingDate}
                    onSubmit={handleSubmit}
                >
                    {/* Tabs  */}
                    <Grid container spacing={gridSpacing}>
                        {/* Closing Date Search */}
                        <Grid item xs={12} sx={{ display: 'flex' }}>
                            <Grid item xs={2} sx={{ padding: '10px 25px' }}>
                                <Typography sx={{ fontSize: '0.9rem' }}>
                                    <FormattedMessage id="year" />
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Years handleChangeYear={handleChangeYear} reverse />
                            </Grid>
                        </Grid>

                        {/* Closing Date Table */}
                        <Grid item xs={12}>
                            {closingDate && (
                                <Table heads={<ClosingDateWorkingCalendarThead />} data={closingDate.closingDates}>
                                    <TableBody>
                                        <ClosingDateTBody data={closingDate} handleOpen={handleOpenDialog} />
                                    </TableBody>
                                </Table>
                            )}
                        </Grid>
                    </Grid>

                    {/* ICon Close */}
                    <Grid textAlign={'center'} padding={'20px'}>
                        <Button variant="contained" onClick={handleClose}>
                            <FormattedMessage id="close" />
                        </Button>
                    </Grid>
                </FormProvider>
            </Modal>

            {/* Edit Closing Date */}
            {closingDateOfMonth && closingDate && (
                <EditClosingDateWorkingCalendar
                    open={openEditClosingDate}
                    item={closingDateOfMonth}
                    handleClose={handleCloseModalEdit}
                    editClosingDate={postEditClosingDate}
                    closingDate={closingDate}
                />
            )}
        </>
    );
};

export default ClosingDateWorkingCalendar;
