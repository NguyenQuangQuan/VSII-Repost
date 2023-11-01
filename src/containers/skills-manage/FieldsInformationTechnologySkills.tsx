// react-hook-form
import { UseFormReturn, useFieldArray } from 'react-hook-form';

// material-ui
import { IconButton, Stack, TableCell, TableRow } from '@mui/material';

// project imports
import { Checkbox } from 'components/extended/Form';
import { EXPERT_LEVEL } from 'constants/Common';
import { Technologies } from 'containers/search';
import Skills from 'containers/search/Skills';
import { skillsDefaultValue } from 'pages/skills-manage/Config';
import ExpertLevel from './ExpertLevel';
import InputTable from './InputTable';
import { IOption } from 'types';

// assets
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DeleteTwoToneIcon } from 'assets/images/icons';

interface IFieldsInformationTechnologySkillsProps {
    indexTechnology: number;
    handleRemove: (index: number, techGroup?: any) => void;
    methods: UseFormReturn<any>;
    technologiesSelect: IOption[];
    handleChangeTech?: any;
    techName: string;
    techNameList?: { name: string; value: string; index?: number }[];
    setTechnologySkill?: React.Dispatch<React.SetStateAction<string[]>>;
    handleChangeMainSkill?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FieldsInformationTechnologySkills = (props: IFieldsInformationTechnologySkillsProps) => {
    const {
        indexTechnology,
        handleRemove,
        methods,
        handleChangeTech,
        techName,
        setTechnologySkill,
        technologiesSelect,
        handleChangeMainSkill
    } = props;

    const {
        fields: fieldsTechnologySkills,
        append: appendTechnologySkills,
        remove: removeTechnologySkills
    } = useFieldArray({
        control: methods.control,
        name: `technologySkill.${indexTechnology}.technologies`
    });

    const handleRemoveTechnologySkills = (index: number, idHexString?: string | null) => {
        idHexString && setTechnologySkill && setTechnologySkill((tech) => [...tech, idHexString]);
        removeTechnologySkills(index);
    };

    const handleChangeTechnologies = (e: any, index?: number) => {
        handleChangeTech(e, index);
        const technologiesArr = methods.getValues(`technologySkill.${indexTechnology}.technologies`);
        if (technologiesArr.length > 0) {
            methods.setValue(`technologySkill.${indexTechnology}.technologies`, skillsDefaultValue);
        }
    };

    return (
        <>
            <TableRow sx={{ position: 'relative' }}>
                <TableCell colSpan={9}>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '20%' }}>
                        <Technologies
                            isShowAll={false}
                            technologies={technologiesSelect}
                            handleChangeTechnologies={(e) => handleChangeTechnologies(e, indexTechnology)}
                            name={`technologySkill.${indexTechnology}.technologyName`}
                        />
                        <IconButton size="small" onClick={() => appendTechnologySkills(skillsDefaultValue)}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </Stack>
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            right: '-50px',
                            transform: 'translateY(-50%)'
                        }}
                        size="small"
                        onClick={() => handleRemove(indexTechnology)}
                    >
                        <DeleteTwoToneIcon fontSize="small" />
                    </IconButton>
                </TableCell>
            </TableRow>
            {fieldsTechnologySkills?.map((tech: any, index) => (
                <TableRow key={tech.id} sx={{ '& td': { textAlign: 'center', height: 0 }, position: 'relative' }}>
                    <TableCell>
                        <Checkbox
                            name={`technologySkill.${indexTechnology}.technologies.${index}.mainSkill`}
                            sx={{ '&': { margin: 0 } }}
                            handleChange={handleChangeMainSkill}
                        />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'left !important' }}>
                        <Skills name={`technologySkill.${indexTechnology}.technologies.${index}.techName`} techName={techName} />
                    </TableCell>
                    <TableCell>
                        <InputTable name={`technologySkill.${indexTechnology}.technologies.${index}.experiences`} textAlign="center" />
                    </TableCell>
                    <TableCell>
                        <InputTable name={`technologySkill.${indexTechnology}.technologies.${index}.lastedUsed`} textAlign="center" />
                    </TableCell>
                    <TableCell colSpan={5} sx={{ padding: 0 }}>
                        <ExpertLevel name={`technologySkill.${indexTechnology}.technologies.${index}.level`} options={EXPERT_LEVEL} />
                        <IconButton
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                right: '-50px',
                                transform: 'translateY(-50%)'
                            }}
                            size="small"
                            onClick={() => handleRemoveTechnologySkills(index, tech?.idHexString)}
                        >
                            <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                    </TableCell>
                </TableRow>
            ))}
            <TableRow>
                <TableCell colSpan={9}>&nbsp;</TableCell>
            </TableRow>
        </>
    );
};

export default FieldsInformationTechnologySkills;
