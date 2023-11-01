// material-ui
import { Button, Stack, Typography } from '@mui/material';

// project imports
import { exportDocument } from 'utils/common';
import { Download } from './icons';

interface IButtonExportProps {
    label: string;
    url: string;
    query: any;
}

const ButtonExport = (props: IButtonExportProps) => {
    const { label, url, query } = props;

    const handleDownload = () => {
        exportDocument(url, query);
    };

    return (
        <Button onClick={handleDownload}>
            <Stack alignItems="center" direction="row" gap={1}>
                <Download />
                <Typography fontWeight={500}>{label}</Typography>
            </Stack>
        </Button>
    );
};

export default ButtonExport;
