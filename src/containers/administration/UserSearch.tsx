import { FormattedMessage } from 'react-intl';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { Button } from 'components';
import { Label } from 'components/extended/Form';
import { IUserFilterConfig, userFilterConfig, userFilterSchema } from 'pages/administration/Config';
import { SearchForm, MemberCode, Department, Status, Username, Contractor } from '../search';

interface IUserSearchProps {
    formReset: IUserFilterConfig;
    handleSearch: (value: any) => void;
}

const UserSearch = (props: IUserSearchProps) => {
    const { formReset, handleSearch } = props;

    return (
        <SearchForm defaultValues={userFilterConfig} formSchema={userFilterSchema} handleSubmit={handleSearch} formReset={formReset}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} lg={2}>
                    <MemberCode />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <Username />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <Department />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <Contractor />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <Status />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <Label label="&nbsp;" />
                    <Button type="submit" size="medium" children={<FormattedMessage id="search" />} variant="contained" />
                </Grid>
            </Grid>
        </SearchForm>
    );
};

export default UserSearch;
