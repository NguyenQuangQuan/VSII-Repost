// material-ui
import { Grid } from '@mui/material';

// project import
import { Button } from 'components';
import { Input, Label } from 'components/extended/Form';
import { SearchForm } from 'containers/search';
import { IGroupSearchConfig, groupSearchConfig, groupSearchSchema } from 'pages/administration/Config';

// third party
import { FormattedMessage } from 'react-intl';

interface IGroupSearchProps {
    formReset: IGroupSearchConfig;
    handleSearch: (value: IGroupSearchConfig) => void;
}

const ManageGroupSearch = (props: IGroupSearchProps) => {
    const { formReset, handleSearch } = props;

    return (
        <SearchForm defaultValues={groupSearchConfig} formSchema={groupSearchSchema} handleSubmit={handleSearch} formReset={formReset}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} lg={3}>
                    <Input name="code" label={<FormattedMessage id="group-code" />} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <Input name="name" label={<FormattedMessage id="group-name" />} />
                </Grid>
                <Grid item xs={12} lg={3}></Grid>
                <Grid item xs={12} lg={3}>
                    <Label label="&nbsp;" />
                    <Button type="submit" size="medium" children={<FormattedMessage id="search" />} variant="contained" />
                </Grid>
            </Grid>
        </SearchForm>
    );
};

export default ManageGroupSearch;
