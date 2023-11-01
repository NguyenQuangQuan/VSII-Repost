import { FormattedMessage } from 'react-intl';

// material-ui
import { Box, Button, Stack, useTheme } from '@mui/material';

// project imports
import { Table } from 'components/extended/Table';
import { gridSpacing } from 'store/constant';
import { quotaUpdateHistoryDefault } from 'pages/administration/Config';
import QuotaUpdateHistoryThead from './QuotaUpdateHistoryThead';
import QuotaUpdateHistoryTBody from './QuotaUpdateHistoryTBody';
import { IQuotaUpdateHistory } from 'types';

interface IQuotaUpdateHistoryProps {
    loading: boolean;
    quotaUpdateHistories: IQuotaUpdateHistory[];
    handleClose: () => void;
}

const QuotaUpdateHistory = (props: IQuotaUpdateHistoryProps) => {
    const theme = useTheme();
    const { loading, quotaUpdateHistories, handleClose } = props;

    return (
        <>
            <Table
                heads={<QuotaUpdateHistoryThead />}
                isLoading={loading}
                data={quotaUpdateHistories ? quotaUpdateHistories : quotaUpdateHistoryDefault}
            >
                <QuotaUpdateHistoryTBody quotaUpdateHistories={quotaUpdateHistories ? quotaUpdateHistories : quotaUpdateHistoryDefault} />
            </Table>
            <Box sx={{ marginTop: theme.spacing(gridSpacing) }}>
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button color="error" onClick={handleClose}>
                        <FormattedMessage id="cancel" />
                    </Button>
                </Stack>
            </Box>
        </>
    );
};

export default QuotaUpdateHistory;
