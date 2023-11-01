// material-ui
import { Grid } from '@mui/material';

// project imports
import { Button } from 'components';
import { Label } from 'components/extended/Form';
import { Department, Member, SearchForm, Status, TitleCode } from 'containers/search';
import { searchFormConfig } from 'containers/search/Config';
import { ISkillsUpdateSearchConfig, skillsUpdateSearchConfig, skillsUpdateSearchSchema } from 'pages/skills-manage/Config';

// third party
import { FormattedMessage } from 'react-intl';

interface ISkillsUpdateSearchProps {
    formReset: ISkillsUpdateSearchConfig;
    handleSubmit: (data: ISkillsUpdateSearchConfig) => void;
}

const SkillsUpdateSearch = (props: ISkillsUpdateSearchProps) => {
    const { formReset, handleSubmit } = props;
    return (
        <SearchForm
            defaultValues={skillsUpdateSearchConfig}
            formSchema={skillsUpdateSearchSchema}
            handleSubmit={handleSubmit}
            formReset={formReset}
        >
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} lg={2.4}>
                    <Member name={searchFormConfig.userName.name} isFindAll />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <TitleCode />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <Department />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <Status />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <Label label="&nbsp;" />
                    <Button type="submit" size="medium" children={<FormattedMessage id="search" />} variant="contained" />
                </Grid>
            </Grid>
        </SearchForm>
    );
};

export default SkillsUpdateSearch;
