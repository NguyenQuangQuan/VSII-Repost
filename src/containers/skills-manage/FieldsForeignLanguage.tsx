// material-ui
import { IconButton, TableCell, TableRow } from '@mui/material';

// react-hook-form

// project imports
import { EXPERT_LEVEL } from 'constants/Common';
import { Language } from 'containers/search';
import { IOption } from 'types';
import ExpertLevel from './ExpertLevel';
import InputTable from './InputTable';

// assets
import { DeleteTwoToneIcon } from 'assets/images/icons';

interface IFieldsForeignLanguageProps {
    index: number;
    handleRemove: (index: number, idHexString?: string | null) => void;
    languageSelect: IOption[];
    idHexString?: string | null;
    handleChangeLanguage: (e: any) => void;
}

const FieldsForeignLanguage = (props: IFieldsForeignLanguageProps) => {
    const { index, handleRemove, idHexString, languageSelect, handleChangeLanguage } = props;

    return (
        <TableRow sx={{ position: 'relative', '& td': { textAlign: 'center', height: 0 } }}>
            <TableCell></TableCell>
            <TableCell sx={{ textAlign: 'left !important' }}>
                <Language
                    name={`foreignLanguage.${index}.name`}
                    isShowAll={false}
                    languageSelect={languageSelect}
                    handleChangeLanguage={handleChangeLanguage}
                />
            </TableCell>
            <TableCell>
                <InputTable name={`foreignLanguage.${index}.experiences`} textAlign="center" />
            </TableCell>
            <TableCell>
                <InputTable name={`foreignLanguage.${index}.lastedUsed`} textAlign="center" />
            </TableCell>
            <TableCell colSpan={5} sx={{ padding: 0 }}>
                <ExpertLevel name={`foreignLanguage.${index}.level`} options={EXPERT_LEVEL} />
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        right: '-50px',
                        transform: 'translateY(-50%)'
                    }}
                    onClick={() => handleRemove(index, idHexString)}
                >
                    <DeleteTwoToneIcon fontSize="small" />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default FieldsForeignLanguage;
