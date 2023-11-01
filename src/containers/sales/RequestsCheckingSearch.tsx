// material-ui
import { Grid } from '@mui/material';

//third-party
import { FormattedMessage } from 'react-intl';

// project imports
import { Button } from 'components';
import { DatePicker, Label } from 'components/extended/Form';
import { Name, StatusRequestsChecking, SearchForm, Member } from '../search';
import { ISalesLeadFilterConfig, salesLeadFilterConfig, salesLeadFilterShemcha } from 'pages/sales/Config';
import { searchFormConfig } from 'containers/search/Config';
import { E_IS_LOGTIME } from 'constants/Common';

interface IRequestsCheckingSearchProps {
    handleSearch: (value: any) => void;
    formReset: ISalesLeadFilterConfig;
}

const RequestsCheckingSearch = (props: IRequestsCheckingSearchProps) => {
    const { handleSearch, formReset } = props;

    return (
        <SearchForm
            defaultValues={salesLeadFilterConfig}
            formSchema={salesLeadFilterShemcha}
            handleSubmit={handleSearch}
            formReset={formReset}
        >
            <Grid container alignItems="center" justifyContent="space-beetween" spacing={2}>
                <Grid item xs={12} lg={2.4}>
                    <Name name={searchFormConfig.partnerName.name} label={searchFormConfig.partnerName.label} />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <DatePicker name="receivedDate" label={<FormattedMessage id="received-date" />} />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <StatusRequestsChecking isShowAll={false} />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <Member isLogTime={E_IS_LOGTIME.YES} name="picUserName" label={<FormattedMessage id="pic-user-name" />} />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <Label label="&nbsp;" />
                    <Button type="submit" size="medium" children={<FormattedMessage id="search" />} variant="contained" />
                </Grid>
            </Grid>
        </SearchForm>
    );
};

export default RequestsCheckingSearch;
