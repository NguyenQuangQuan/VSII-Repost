// material-ui
import { Grid } from '@mui/material';

// project imports
import { Button } from 'components';
import { Label } from 'components/extended/Form';
import { SearchForm, Member, Skill, TitleCode, LevelSkill, Degree } from '../search';
import {
    ISkillsReportSearchDefaultValue,
    skillsReportSearchDefaultValue,
    skillsReportSearchDefaultValueSchema
} from 'pages/skills-manage/Config';
import { E_IS_LOGTIME } from 'constants/Common';

//third-party
import { FormattedMessage } from 'react-intl';

interface ISkillsReportSearchProps {
    formReset: ISkillsReportSearchDefaultValue;
    handleSearch: (value: any) => void;
}

const SkillsReportSearch = (props: ISkillsReportSearchProps) => {
    const { formReset, handleSearch } = props;

    return (
        <SearchForm
            defaultValues={skillsReportSearchDefaultValue}
            formSchema={skillsReportSearchDefaultValueSchema}
            handleSubmit={handleSearch}
            formReset={formReset}
        >
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} lg={2}>
                    <Member isLogTime={E_IS_LOGTIME.YES} name="userName" />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <TitleCode />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <Skill />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <LevelSkill />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <Degree />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <Label label="&nbsp;" />
                    <Button type="submit" size="medium" children={<FormattedMessage id="search" />} variant="contained" />
                </Grid>
            </Grid>
        </SearchForm>
    );
};

export default SkillsReportSearch;
