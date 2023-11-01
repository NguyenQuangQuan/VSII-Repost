import { FormattedMessage } from 'react-intl';

// material-ui
import { Grid, SelectChangeEvent } from '@mui/material';
import { Button } from 'components';
import { Label } from 'components/extended/Form';
import { E_IS_LOGTIME } from 'constants/Common';

// project imports
import { IOption } from 'types';
import { Department, Member, Months, SearchForm, Years } from '../search';
import { searchFormConfig } from 'containers/search/Config';
import { IWorkingCalendarSearch, workingCalendarSearhSchema, workingCalenderSearchConfig } from 'pages/register-working-calendar/Config';

interface IRegisterWorkingCalendarSearchProps {
    formReset: IWorkingCalendarSearch;
    months: IOption[];
    handleChangeYear: (e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>) => void;
    handleSearch: (value: IWorkingCalendarSearch) => void;
}

const RegisterWorkingCalenderSearch = (props: IRegisterWorkingCalendarSearchProps) => {
    const { formReset, months, handleChangeYear, handleSearch } = props;

    return (
        <SearchForm
            defaultValues={workingCalenderSearchConfig}
            formSchema={workingCalendarSearhSchema}
            handleSubmit={handleSearch}
            formReset={formReset}
        >
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} lg={2.4}>
                    <Years handleChangeYear={handleChangeYear} />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <Months months={months} />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <Department />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <Member isLogTime={E_IS_LOGTIME.ALL} name={searchFormConfig.idHexString.name} />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <Label label="&nbsp;" />
                    <Button type="submit" size="medium" children={<FormattedMessage id="search" />} variant="contained" />
                </Grid>
            </Grid>
        </SearchForm>
    );
};

export default RegisterWorkingCalenderSearch;
