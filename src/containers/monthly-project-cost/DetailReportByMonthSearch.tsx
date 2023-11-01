import { FormattedMessage } from 'react-intl';

// material-ui
import { Grid } from '@mui/material';
import { Button } from 'components';

// project imports
import { Label } from 'components/extended/Form';
import { detailReportByMonthConfig, detailReportByMonthSchema } from 'pages/monthly-project-cost/Config';
import { IOption } from 'types';
import { Months, Project, SearchForm, Years } from '../search';

interface IDetailReportByMonthSearchProps {
    months: IOption[];
    handleChangeYear: (e: any) => void;
    handleSearch: (value: any) => void;
    formReset: any;
    handleChangeMonth: (e: any) => void;
    month: any;
}

const DetailReportByMonthSearch = (props: IDetailReportByMonthSearchProps) => {
    const { months, handleChangeYear, handleSearch, formReset, handleChangeMonth, month } = props;

    return (
        <SearchForm
            defaultValues={detailReportByMonthConfig}
            formSchema={detailReportByMonthSchema}
            handleSubmit={handleSearch}
            formReset={formReset}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} lg={3}>
                    <Years handleChangeYear={handleChangeYear} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <Months months={months} isShow13MonthSalary onChange={handleChangeMonth} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <Project isNotStatus month={month} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <Label label="&nbsp;" />
                    <Button type="submit" size="medium" children={<FormattedMessage id="search" />} variant="contained" />
                </Grid>
            </Grid>
        </SearchForm>
    );
};

export default DetailReportByMonthSearch;
