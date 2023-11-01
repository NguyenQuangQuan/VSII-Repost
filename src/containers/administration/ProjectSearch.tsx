import { FormattedMessage } from 'react-intl';
// material-ui
import { Grid } from '@mui/material';

// project import
import { Button } from 'components';
import { Label } from 'components/extended/Form';
import { Member, Project, ProjectType, SearchForm, Status } from 'containers/search';
import { searchFormConfig } from 'containers/search/Config';
import { IProjectSearchConfig, projectSearchConfig, projectSearchSchema } from 'pages/administration/Config';

interface IManageProjectSearchProps {
    formReset: IProjectSearchConfig;
    handleSearch: (value: any) => void;
}

const ManageProjectSearch = (props: IManageProjectSearchProps) => {
    const { formReset, handleSearch } = props;
    return (
        <SearchForm defaultValues={projectSearchConfig} formSchema={projectSearchSchema} handleSubmit={handleSearch} formReset={formReset}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} lg={2.5}>
                    <Project projectAuthorization="false" isDefaultAll={true} isNotStatus />
                </Grid>
                <Grid item xs={12} lg={2.5}>
                    <ProjectType />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <Status isShowProjectStatus />
                </Grid>
                <Grid item xs={12} lg={2.5}>
                    <Member name={searchFormConfig.projectManager.name} label={<FormattedMessage id="project-manager" />} isFindAll />
                </Grid>
                <Grid item xs={12} lg={2.5}>
                    <Label label="&nbsp;" />
                    <Button type="submit" size="medium" children={<FormattedMessage id="search" />} variant="contained" />
                </Grid>
            </Grid>
        </SearchForm>
    );
};

export default ManageProjectSearch;
