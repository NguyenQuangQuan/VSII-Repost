// materia-ui
import { Grid } from '@mui/material';

// third-party
import { FormattedMessage } from 'react-intl';

// project imports
import { Button } from 'components';
import { DatePicker, Label } from 'components/extended/Form';
import { Name, SearchForm, Member } from '../search';
import { ISalesLeadFilterConfig, salesLeadFilterConfig, salesLeadFilterShemcha } from 'pages/sales/Config';
import { searchFormConfig } from 'containers/search/Config';
import { E_IS_LOGTIME } from 'constants/Common';

interface ISupplierCheckingSearchProps {
    handleSearch: (value: any) => void;
    formReset: ISalesLeadFilterConfig;
}

const SupplierCheckingSearch = (props: ISupplierCheckingSearchProps) => {
    const { handleSearch, formReset } = props;
    return (
        <SearchForm
            formReset={formReset}
            defaultValues={salesLeadFilterConfig}
            formSchema={salesLeadFilterShemcha}
            handleSubmit={handleSearch}
        >
            <Grid container alignItems="center" justifyContent="space-beetween" spacing={2}>
                <Grid item xs={12} lg={2.4}>
                    <Name name={searchFormConfig.supplierName.name} label={searchFormConfig.supplierName.label} />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <DatePicker name="fromDate" label={<FormattedMessage id="from-date" />} />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <DatePicker name="toDate" label={<FormattedMessage id="to-date" />} />
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

export default SupplierCheckingSearch;
