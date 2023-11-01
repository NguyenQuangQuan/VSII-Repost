import { FormattedMessage } from 'react-intl';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { IOption } from 'types';
import { Department, Member, SearchForm, Weeks, Years } from '../search';
import { Button } from 'components';
import { Label } from 'components/extended/Form';
import { searchFormConfig } from '../search/Config';
import { IListProjectTeamConfig, listProjectTeamConfig, listProjectTeamSchema } from 'pages/Config';
interface IListProjectTeamSearchProps {
    formReset: IListProjectTeamConfig;
    weeks: IOption[];
    handleChangeYear: (e: any) => void;
    handleSearch: (value: any) => void;
}

const ListProjectTeamSearch = (props: IListProjectTeamSearchProps) => {
    const { formReset, weeks, handleChangeYear, handleSearch } = props;

    return (
        <SearchForm
            defaultValues={listProjectTeamConfig}
            formSchema={listProjectTeamSchema}
            handleSubmit={handleSearch}
            formReset={formReset}
        >
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} lg={2.4}>
                    <Years handleChangeYear={handleChangeYear} />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <Weeks weeks={weeks} />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <Member name={searchFormConfig.userName.name} />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <Department />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <Label label="&nbsp;" />
                    <Button type="submit" size="medium" children={<FormattedMessage id="search" />} variant="contained" />
                </Grid>
            </Grid>
        </SearchForm>
    );
};

export default ListProjectTeamSearch;
