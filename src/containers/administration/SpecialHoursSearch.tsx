import { FormattedMessage } from 'react-intl';
// material-ui
import { Grid } from '@mui/material';

// project import
import { Button } from 'components';
import { SpecialHoursType, SearchForm } from 'containers/search';
import { ISpecialHoursSearchConfig, specialHoursSearchConfig, holidaySearchSchema } from 'pages/administration/Config';

interface IManageSpecialHoursSearchProps {
    handleSearch: (value: ISpecialHoursSearchConfig) => void;
    formReset: ISpecialHoursSearchConfig;
}

const ManageSpecialHolidaySearch = (props: IManageSpecialHoursSearchProps) => {
    const { handleSearch, formReset } = props;

    return (
        <SearchForm
            defaultValues={specialHoursSearchConfig}
            formSchema={holidaySearchSchema}
            handleSubmit={handleSearch}
            formReset={formReset}
        >
            <Grid>
                <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                    <Grid item xs={12} lg={3} sm={3} md={3} xl={3} justifyContent="flex-start">
                        <SpecialHoursType />
                    </Grid>
                    <Grid item xs={12} lg={3} sm={3} md={3} xl={3} justifyContent="flex-end">
                        <Button type="submit" size="medium" children={<FormattedMessage id="search" />} variant="contained" />
                    </Grid>
                </Grid>
            </Grid>
        </SearchForm>
    );
};

export default ManageSpecialHolidaySearch;
