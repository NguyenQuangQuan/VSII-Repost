/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState } from 'react';

// react-hook-form
import { useFieldArray, useForm } from 'react-hook-form';

// third party
import { yupResolver } from '@hookform/resolvers/yup';
import { FormattedMessage } from 'react-intl';
import { useNavigate, useSearchParams } from 'react-router-dom';

// project imports
import MainCard from 'components/cards/MainCard';
import { FormProvider, Radio } from 'components/extended/Form';
import { Table } from 'components/extended/Table';
import { DEFAULT_IMAGE_IMAGE_JPG_BASE64, DEGREE_OPTION_RADIO, SEARCH_PARAM_KEY } from 'constants/Common';
import { ROUTER } from 'constants/Routers';
import {
    FieldsAttendedProjects,
    FieldsCertificates,
    FieldsCoursesAttended,
    FieldsEducationHistory,
    FieldsEmploymentsHistory,
    FieldsForeignLanguage,
    FieldsInformationTechnologySkills,
    ForeignLanguagePoint,
    InfomationTechnologySkillsPoint,
    InputTable,
    PersonalDetailTBody,
    ReferencesTBody,
    SignatureTBody,
    SummaryInformationTBody,
    UserInfo
} from 'containers/skills-manage';
import SkeletonSummaryCard from 'components/cards/Skeleton/SummaryCard';
import Api from 'constants/Api';
import sendRequest from 'services/ApiService';
import { convertFileToBase64, getBase64fromReaderResult, getSearchParam, isEmpty } from 'utils/common';
import { getUserInfoCookies } from 'utils/cookies';
import { dateFormat } from 'utils/date';
import {
    attendedProjectsDefaultValue,
    certificatesDefaultValue,
    coursesAttendedDefaultValue,
    cvDefaultValues,
    cvSchema,
    educationHistoryDefaultValue,
    employmentsHistoryDefaultValue,
    foreignLanguageDefaultValue,
    technologySkillsDefaultValue
} from './Config';
import { openSnackbar } from 'store/slice/snackbarSlice';
import { useAppDispatch } from 'app/hooks';
import { IOption } from 'types';

// marterial-ui
import { LoadingButton } from '@mui/lab';
import { Button, IconButton, Stack, TableBody, TableCell, TableHead, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material';

// assets
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const tableStyle = {
    marginBottom: '15px',
    overflow: 'unset',
    '& table': {
        borderCollapse: 'collapse'
    },
    '& td, th': {
        border: '1px solid #797979',
        color: '#000'
    }
};

// ==============================|| Skills Update ||============================== //
/**
 * URL Params
 * memberCode
 * userName
 */
const CV = () => {
    // URL Params
    const [searchParams] = useSearchParams();
    const keyParams = [SEARCH_PARAM_KEY.memberCode, SEARCH_PARAM_KEY.userName];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams);

    // Variable, Hooks, State
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const today = dateFormat(new Date());
    const userNameCreateOrUpdate = getUserInfoCookies()?.userName;
    const [lastUpdate, setLastUpdate] = useState<any>(dateFormat(new Date()));
    const [techNameList, setTechNameList] = useState<{ name: string; value: string; index?: number }[]>([]);
    const [loadingDetailCv, setLoadingDetailCv] = useState<boolean>(false);
    const [loadingAction, setLoadingAction] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const [mainSkill, setMainSkill] = useState<any[]>([])

    // ============ Update ============
    const [attendedProjects, setAttendedProjects] = useState<string[]>([]);
    const [certificates, setCertificates] = useState<string[]>([]);
    const [coursesAttendend, setCoursesAttendend] = useState<string[]>([]);
    const [educationHistory, setEducationHistory] = useState<string[]>([]);
    const [employmentsHistory, setEmploymentsHistory] = useState<string[]>([]);
    const [foreignLanguage, setForeignLanguage] = useState<string[]>([]);
    const [technologySkill, setTechnologySkill] = useState<string[]>([]);
    const [fileDocument, setFileDocument] = useState<{
        department?: string
        userName?: string,
        memberCode?: string,
        avatar?: string,
        signature?: string
    }>()

    // ============ Methods ============
    const methods = useForm({ defaultValues: cvDefaultValues, resolver: yupResolver(cvSchema), mode: 'all' });

    // ============ File ============
    const [avatarPreview, setAvatarPreview] = useState<string | undefined>(undefined);
    const [avatarBase64, setAvatarBase64] = useState<string>('');
    const avatarRef: any = useRef(null);
    const [signaturePreview, setSignaturePreview] = useState<string | undefined>(undefined);
    const [signatureBase64, setSignatureBase64] = useState<string>('');
    const signatureRef: any = useRef(null);

    // ============ Select Option ============
    const [technologiesSelect, setTechnologiesSelect] = useState<IOption[]>([]);
    // const [technologiesSelected, setTechlogiesSelected] = useState<IOption[]>([]);
    const [languageSelect, setLanguageSelect] = useState<IOption[]>([]);
    const [languageSelected, setLanguageSelected] = useState<IOption[]>([]);

    // ============ Use Field Array ============
    // EducationHistory
    const {
        fields: fieldsEducationHistory,
        append: appendEducationHistory,
        remove: removeEducationHistory
    } = useFieldArray({
        control: methods.control,
        name: 'educationHistory'
    } as any);

    const handleRemoveEducationHistory = (index: number, idHexString?: string | null) => {
        idHexString && setEducationHistory((edu) => [...edu, idHexString]);
        removeEducationHistory(index);
    };

    // CoursesAttendend
    const {
        fields: fieldsCoursesAttendend,
        append: appendCoursesAttendend,
        remove: removeCoursesAttendend
    } = useFieldArray({
        control: methods.control,
        name: 'coursesAttended'
    } as any);

    const handleRemoveCoursesAttendend = (index: number, idHexString?: string | null) => {
        idHexString && setCoursesAttendend((cou) => [...cou, idHexString]);
        removeCoursesAttendend(index);
    };

    // Certificates
    const {
        fields: fieldsCertificates,
        append: appendCertificates,
        remove: removeCertificates
    } = useFieldArray({
        control: methods.control,
        name: 'certificates'
    } as any);

    const handleRemoveCertificates = (index: number, idHexString?: string | null) => {
        idHexString && setCertificates((cer) => [...cer, idHexString]);
        removeCertificates(index);
    };

    // EmploymentsHistory
    const {
        fields: fieldsEmploymentsHistory,
        append: appendEmploymentsHistory,
        remove: removeEmploymentsHistory
    } = useFieldArray({
        control: methods.control,
        name: 'employmentsHistory'
    } as any);

    const handleRemoveEmploymentsHistory = (index: number, idHexString?: string | null) => {
        idHexString && setEmploymentsHistory((emp) => [...emp, idHexString]);
        removeEmploymentsHistory(index);
    };

    // AttendedProjects
    const {
        fields: fieldsAttendedProjects,
        append: appendAttendedProjects,
        remove: removeAttendedProjects
    } = useFieldArray({
        control: methods.control,
        name: 'attendedProjects'
    } as any);

    const handleRemoveAttendedProjects = (index: number, idHexString?: string | null) => {
        idHexString && setAttendedProjects((att) => [...att, idHexString]);
        removeAttendedProjects(index);
    };

    // InformationTechnologySkills
    const {
        fields: fieldsInformationTechnologySkills,
        append: appendInformationTechnologySkills,
        remove: removeInformationTechnologySkills
    } = useFieldArray({
        control: methods.control,
        name: 'technologySkill'
    } as any);

    const handleRemoveInformationTechnologySkills = (index: number, techGroup?: any) => {
        removeInformationTechnologySkills(index);
        if (techGroup) {
            const { technologies } = techGroup;
            technologies?.forEach((tech: any) => {
                tech?.idHexString && setTechnologySkill((prv) => [...prv, tech.idHexString]);
            });
        }
    };

    // ForeignLanguage
    const {
        fields: fieldsForeignLanguage,
        append: appendForeignLanguage,
        remove: removeForeignLanguage
    } = useFieldArray({
        control: methods.control,
        name: 'foreignLanguage'
    } as any);

    const handleRemoveForeignLanguage = (index: number, foreignLg: any) => {
        foreignLg.idHexString && setForeignLanguage((foreign) => [...foreign, foreignLg.idHexString]);
        if (foreignLg.id) {
            const updateArr = languageSelected.filter((x) => {
                return x.id !== foreignLg.id;
            });
            setLanguageSelected(updateArr);
            const updateArrLanguage = languageSelect.map((x) => {
                return { ...x, disabled: updateArr.some((y: any) => x.value === y.value) };
            });
            setLanguageSelect(updateArrLanguage);
        }
        removeForeignLanguage(index);
    };

    // ============ FUNCTION ============

    // Disabled option language when update
    const disabledLanguageOption = () => {
        if (fieldsForeignLanguage.length > 0) {
            const cloneArrLgSelected: any = [];
            fieldsForeignLanguage.forEach((x: any) => {
                let option: IOption = {
                    value: x.name,
                    label: x.name,
                    id: x.id
                };
                cloneArrLgSelected.push(option);
            });
            setLanguageSelected(cloneArrLgSelected);
            setLanguageSelect((prv) =>
                prv.map((x) => {
                    return { ...x, disabled: cloneArrLgSelected.some((y: any) => x.value === y.value) };
                })
            );
        }
    };

    // Get detail CV
    const getDetailAndResetForm = async () => {
        setLoadingDetailCv(true);
        const response = await sendRequest(Api.skills_manage.getDetailCv, params);
        if (response?.status) {
            const { content } = response.result;
            if (!isEmpty(content)) {
                const { personalDetail, references, fileDocument } = content;
                methods.reset({
                    ...content,
                    personalDetail: {
                        ...personalDetail,
                        fullname: personalDetail.fullNameVi,
                        idHexStringUser: { value: personalDetail.idHexStringUser, label: `${personalDetail.firstName} ${personalDetail.lastName}` },
                        referenceIdHexString: references?.idHexString ? { value: references.idHexString, label: references.fullName } : null
                    }
                });
                if (!isEmpty(content.technologySkill)) {
                    const { technologySkill } = content
                    technologySkill.forEach((tech: any, techIndex: number) => {
                        tech.technologies.forEach((skill: any, skillIndex: number) => {
                            if (skill.mainSkill) {
                                const fieldName = `technologySkill.${techIndex}.technologies.${skillIndex}.mainSkill`
                                setMainSkill([fieldName])
                            }
                        })
                    })
                }
                personalDetail?.lastUpdate && setLastUpdate(personalDetail.lastUpdate);
                if (fileDocument.avatar) {
                    setAvatarPreview(DEFAULT_IMAGE_IMAGE_JPG_BASE64 + fileDocument.avatar);
                    setAvatarBase64(fileDocument.avatar);
                }
                if (fileDocument.signature) {
                    setSignaturePreview(DEFAULT_IMAGE_IMAGE_JPG_BASE64 + fileDocument.signature);
                    setSignatureBase64(fileDocument.signature);
                }
            }
        }
        setLoadingDetailCv(false);
    };

    // Create cv
    const postCreateCv = async (payload: any) => {
        setLoadingAction(true);
        const response = await sendRequest(Api.skills_manage.createSkillsUpdate, payload);
        if (response?.status) {
            const { content } = response.result;
            if (content.status) {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Create CV success',
                        variant: 'alert',
                        alert: { color: 'success' }
                    })
                );
                setLoadingAction(false);
                handleCloseCVForm();
            } else {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: content.message,
                        variant: 'alert',
                        alert: { color: 'error' }
                    })
                );
                setLoadingAction(false);
            }
        }
    };

    // Update CV
    const postUpdateCv = async (payload: any) => {
        setLoadingAction(true);
        const response = await sendRequest(Api.skills_manage.updateCV, payload);
        if (response?.status) {
            const { content } = response.result;
            if (content.status) {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Update CV success',
                        variant: 'alert',
                        alert: { color: 'success' }
                    })
                );
                setLoadingAction(false);
            } else {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: content.message,
                        variant: 'alert',
                        alert: { color: 'error' }
                    })
                );
                setLoadingAction(false);
            }
        }
    };

    // Get all language
    const getAllLanguage = async () => {
        const response = await sendRequest(Api.master.getAllLanguage);
        if (response?.status) {
            const arrLanguage: IOption[] = [];
            const { result } = response;
            result.content.forEach((lg: any) => {
                let lgOption: IOption = {
                    value: lg.name,
                    label: lg.name
                };
                arrLanguage.push(lgOption);
            });
            setLanguageSelect(arrLanguage);
        } else return;
    };

    // Get all technology
    const getAllTechnologies = async () => {
        const response = await sendRequest(Api.skills_manage.getTechnologies);

        if (response?.status) {
            const { result } = response;
            const arrTech: IOption[] = [];
            result.content.forEach((item: { type: string }) => {
                let techOption: IOption = {
                    value: item.type,
                    label: item.type
                };
                arrTech.push(techOption);
            });
            setTechnologiesSelect(arrTech);
        } else return;
    };

    // ============ Event ============
    // Handle change avatar
    const handleChangeAvatar = (e: any) => {
        const avatar = e.target.files[0];

        if (!avatar.name.match(/\.(jpg)$/)) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Avatar must be file jpg',
                    variant: 'alert',
                    alert: { color: 'error' }
                })
            );
            return;
        }
        setAvatarPreview(URL.createObjectURL(avatar));
        convertFileToBase64(avatar).then((result) => {
            setAvatarBase64(getBase64fromReaderResult(result));
        });
    };

    // Handle remove avatar
    const handleRemoveAvatar = () => {
        setAvatarPreview(undefined);
        setAvatarBase64('');
        avatarRef.current.value = null;
    };

    // Handle change signature
    const handleChangeSignature = (e: any) => {
        const signature = e.target.files[0];
        if (!signature.name.match(/\.(jpg)$/)) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Signature must be file jpg',
                    variant: 'alert',
                    alert: { color: 'error' }
                })
            );
            return;
        }
        setSignaturePreview(URL.createObjectURL(signature));
        convertFileToBase64(signature).then((result) => {
            setSignatureBase64(getBase64fromReaderResult(result));
        });
    };

    // Handle remove signature
    const handleRemoveSignature = () => {
        setSignaturePreview(undefined);
        setSignatureBase64('');
        signatureRef.current.value = null;
        isUpdate && setFileDocument(prv => ({ ...prv, signature: 'YES' }))
    };

    // Handle close CV form
    const handleCloseCVForm = () => {
        navigate(`/${ROUTER.reports.skills_manage.index}/${ROUTER.reports.skills_manage.skills_update}`);
    };

    /**
     * Handle change tech
     * @param e
     * @param indexTechGr
     * @param techGr
     */
    const handleChangeTech = (e?: any, indexTechGr?: number, techGr?: any) => {
        const name = e?.target.name;
        const value = e?.target.value;
        // Tạo ra mảng mới kế thừa lại các giá trị của mảng trước
        const cloneArr = [...techNameList];
        const techNameOption = {
            name,
            value,
            index: indexTechGr
        };
        const index = cloneArr.findIndex((it) => it.name === name);
        if (techGr) {
            // Nếu change tech group thì thêm các idHexString skill của tech group đó vào mảng technologySkill
            // để hiểu đó là xóa các skill trước của tech group
            const { technologies } = techGr;
            technologies?.forEach((tech: any) => {
                tech?.idHexString && setTechnologySkill((prv) => [...prv, tech.idHexString]);
            });
        }
        // index === -1 thì thêm vào mảng
        if (index === -1) {
            cloneArr.push(techNameOption);
            setTechNameList(cloneArr);
        } else {
            if (value !== '') {
                const updateArr = cloneArr.map((it) => {
                    if (techNameOption.name === it.name) {
                        return techNameOption;
                    }
                    return it;
                });
                setTechNameList(updateArr);
            } else {
                const updateArr = cloneArr.filter((it) => {
                    return it.name !== name;
                });
                setTechNameList(updateArr);
            }
        }
    };

    /**
     * Handle change language
     * @param e
     * @param foreign
     */
    const handleChangeLanguage = (e: any, foreign?: any) => {
        // Value & Id on change
        const value = e.target.value;
        const id = foreign.id;
        // Tạo ra mảng mới kế thừa lại các giá trị của mảng trước
        const cloneArrLanguage = [...languageSelect];
        const cloneArrLanguageSelected = [...languageSelected];

        // Tìm phần tử trong mảng
        const index = cloneArrLanguageSelected.findIndex((it) => it.id === id);

        if (index === -1) {
            // Không tìm thấy phần tử trong mảng, tạo ra object kèm id
            // để kiểm soát cập nhật hoặc xóa
            const addOption: any = {
                ...cloneArrLanguage.find((x) => {
                    return x.value === value;
                }),
                id
            };
            cloneArrLanguageSelected.push(addOption);
            setLanguageSelected(cloneArrLanguageSelected);
            // Update lại các phần tử cần disabled của select language
            const updateArrLanguage = cloneArrLanguage.map((x) => {
                return { ...x, disabled: cloneArrLanguageSelected.some((y) => x.value === y.value) };
            });
            setLanguageSelect(updateArrLanguage);
        } else {
            // Update lại giá trị của giá trị được chọn
            const updateArrSelected: any = cloneArrLanguageSelected.map((x) => {
                if (x.id === id) {
                    return { ...x, value };
                }
                return x;
            });
            setLanguageSelected(updateArrSelected);
            const updateArrLanguage = cloneArrLanguage.map((x) => {
                return { ...x, disabled: updateArrSelected.some((y: any) => x.value === y.value) };
            });
            setLanguageSelect(updateArrLanguage);
        }
    };


    /**
     * handle change main skill
     * @param e 
     */
    const handleChangeMainSkill = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { setValue } = methods
        const id: any = e.target.id;
        if (mainSkill.includes(id)) {
            setMainSkill(mainSkill.filter((skId) => skId !== id))
            setValue(id, false)
        }
        else {
            setMainSkill([id])
            mainSkill.forEach(skId => {
                setValue(skId, false)
            })
        }
    };



    // ============ Submit ============
    const handleSubmit = (values: any) => {
        const { personalDetail } = values;

        if (avatarBase64 === '') {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Avatar is required',
                    variant: 'alert',
                    alert: { color: 'error' }
                })
            );
            return;
        }

        // dateCreate & userCreate
        const createDefaultValue = {
            userCreate: userNameCreateOrUpdate,
            dateCreate: today,
            memberCode: personalDetail.memberCode,
            userName: personalDetail.userName
        };

        const updateDefaultValue = {
            userUpdate: userNameCreateOrUpdate,
            lastUpdate
        };

        // personalDetail
        const { fullname, referenceIdHexString, ...clonePersonalDetail } = values.personalDetail;

        // educationHistory
        const educationHistoryPayload = values.educationHistory.map((edu: any) =>
            edu.idHexString ? { ...edu, ...updateDefaultValue } : { ...edu, ...createDefaultValue }
        );

        // coursesAttendend
        const coursesAttendendPayload = values.coursesAttended.map((course: any) =>
            course.idHexString ? { ...course, ...updateDefaultValue } : { ...course, ...createDefaultValue }
        );

        // certificates
        const certificatesPayload = values.certificates.map((cer: any) =>
            cer.idHexString ? { ...cer, ...updateDefaultValue } : { ...cer, ...createDefaultValue }
        );

        // employmentsHistory
        const employmentsHistoryPayload = values.employmentsHistory.map((emp: any) =>
            emp.idHexString ? { ...emp, ...updateDefaultValue } : { ...emp, ...createDefaultValue }
        );

        // attendedProjects
        const attendedProjectsPayload = values.attendedProjects.map((pro: any) =>
            pro.idHexString ? { ...pro, ...updateDefaultValue } : { ...pro, ...createDefaultValue }
        );

        // informationTechnologySkills
        const informationTechnologySkillsPayload = values.technologySkill.flatMap((skill: any) =>
            skill.technologies.map((sk: any) => (sk.idHexString ? { ...sk, ...updateDefaultValue } : { ...sk, ...createDefaultValue }))
        );

        // foreignLanguage
        const foreignLanguagePayload = values.foreignLanguage.map((lg: any) =>
            lg.idHexString ? { ...lg, ...updateDefaultValue } : { ...lg, ...createDefaultValue }
        );

        // final formatPayload
        const formatPayload = {
            fileDocument: {
                department: personalDetail.department,
                userName: personalDetail.userName?.value,
                memberCode: personalDetail.memberCode,
                fullNameEn: clonePersonalDetail.fullNameEn,
                avatar: avatarBase64,
                signature: signatureBase64
            },
            personalDetail: {
                ...clonePersonalDetail,
                fullNameVi: fullname,
                referenceIdHexString: referenceIdHexString?.value,
                lastUpdate: today,
                ...createDefaultValue
            },
            educationHistory: educationHistoryPayload,
            coursesAttendend: coursesAttendendPayload,
            certificates: certificatesPayload,
            employmentsHistory: employmentsHistoryPayload,
            attendedProjects: attendedProjectsPayload,
            technologySkill: informationTechnologySkillsPayload,
            foreignLanguage: foreignLanguagePayload
        };

        const formatPayloadUpdate = {
            dataUpdate: {
                ...formatPayload
            },
            dataDelete: {
                fileDocument: {
                    ...fileDocument,
                    department: personalDetail.department,
                    userName: personalDetail.userName?.value,
                    fullNameEn: clonePersonalDetail.fullNameEn,
                    memberCode: personalDetail.memberCode,
                },
                educationHistory,
                coursesAttendend,
                certificates,
                employmentsHistory,
                attendedProjects,
                technologySkill: Array.from(new Set(technologySkill)),
                foreignLanguage
            }
        };
        !isUpdate && postCreateCv(formatPayload);
        isUpdate && postUpdateCv(formatPayloadUpdate);
    };

    // ============ useEffect ============
    useEffect(() => {
        getAllTechnologies();
        getAllLanguage();
        if (params.memberCode || params.userName) {
            setIsUpdate(true);
            getDetailAndResetForm();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        isUpdate && disabledLanguageOption();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fieldsForeignLanguage]);

    return loadingDetailCv ? (
        <SkeletonSummaryCard isMoreLoading />
    ) : (
        <>
            <FormProvider formReturn={methods} onSubmit={handleSubmit}>
                {/* ================ USER INFO ================ */}
                <UserInfo isUpdate={isUpdate} />
                <MainCard
                    sx={
                        matches
                            ? {
                                overflowX: 'scroll',
                                padding: '40px',
                                '& .mainCardContent': {
                                    width: '1400px'
                                }
                            }
                            : {
                                width: '100%',
                                padding: '40px'
                            }
                    }
                >
                    {/* ================ PERSONAL DETAIL ================ */}
                    <Stack justifyContent="center" direction="column" sx={{ marginBottom: '25px' }} alignItems="center">
                        <Typography
                            sx={{
                                color: '#2548A1 !important',
                                fontWeight: '600'
                            }}
                        >
                            CURRICULUM VITAE
                        </Typography>
                        <InputTable name="personalDetail.fullname" textAlign="center" placeholder="Fill fullname" />
                    </Stack>
                    <Table
                        sx={tableStyle}
                        heads={
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={3}>PERSONAL DETAIL</TableCell>
                                </TableRow>
                            </TableHead>
                        }
                    >
                        <PersonalDetailTBody
                            avatarPreview={avatarPreview}
                            ref={avatarRef}
                            handleChangeAvatar={handleChangeAvatar}
                            handleRemoveAvatar={handleRemoveAvatar}
                        />
                    </Table>
                    {/* ================ SUMMARY INFORMATION ================ */}
                    <Table
                        sx={tableStyle}
                        heads={
                            <TableHead>
                                <TableRow>
                                    <TableCell>SUMMARY INFORMATION</TableCell>
                                </TableRow>
                            </TableHead>
                        }
                    >
                        <SummaryInformationTBody />
                    </Table>
                    {/* ================ EDUCATION HISTORY ================ */}
                    <Table
                        sx={tableStyle}
                        maxHeight="auto"
                        heads={
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={2}>
                                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <span>EDUCATION HISTORY</span>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => appendEducationHistory(educationHistoryDefaultValue)}
                                                >
                                                    <AddCircleOutlineIcon />
                                                </IconButton>
                                            </Stack>
                                            <Radio name="personalDetail.degree" options={DEGREE_OPTION_RADIO} isMultiLanguage={false} />
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                        }
                    >
                        <TableBody>
                            {fieldsEducationHistory?.map((edu: any, index) => (
                                <FieldsEducationHistory
                                    index={index}
                                    key={edu.id}
                                    handleRemove={handleRemoveEducationHistory}
                                    idHexString={edu?.idHexString}
                                />
                            ))}
                        </TableBody>
                    </Table>
                    {/* ================ COURSES ATTENDED ================ */}
                    <Table
                        sx={tableStyle}
                        maxHeight="auto"
                        heads={
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={2}>
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            <span>COURSES ATTENDED</span>
                                            <IconButton size="small" onClick={() => appendCoursesAttendend(coursesAttendedDefaultValue)}>
                                                <AddCircleOutlineIcon />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                        }
                    >
                        <TableBody>
                            {fieldsCoursesAttendend?.map((cou: any, index) => (
                                <FieldsCoursesAttended
                                    key={cou.id}
                                    index={index}
                                    handleRemove={handleRemoveCoursesAttendend}
                                    idHexString={cou?.idHexString}
                                />
                            ))}
                        </TableBody>
                    </Table>
                    {/* ================ CERTIFICATES ================ */}
                    <Table
                        sx={tableStyle}
                        maxHeight="auto"
                        heads={
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={2}>
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            <span>CERTIFICATES</span>
                                            <IconButton size="small" onClick={() => appendCertificates(certificatesDefaultValue)}>
                                                <AddCircleOutlineIcon />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                        }
                    >
                        <TableBody>
                            {fieldsCertificates?.map((cer: any, index) => (
                                <FieldsCertificates
                                    key={cer.id}
                                    index={index}
                                    handleRemove={handleRemoveCertificates}
                                    idHexString={cer?.idHexString}
                                />
                            ))}
                        </TableBody>
                    </Table>
                    {/* ================ EMPLOYMENTS HISTORY ================ */}
                    <Table
                        sx={tableStyle}
                        maxHeight="auto"
                        heads={
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={2}>
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            <span>EMPLOYMENTS HISTORY</span>
                                            <IconButton
                                                size="small"
                                                onClick={() => appendEmploymentsHistory(employmentsHistoryDefaultValue)}
                                            >
                                                <AddCircleOutlineIcon />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                        }
                    >
                        <TableBody>
                            {fieldsEmploymentsHistory?.map((emp: any, index) => (
                                <FieldsEmploymentsHistory
                                    key={emp.id}
                                    index={index}
                                    handleRemove={handleRemoveEmploymentsHistory}
                                    idHexString={emp?.idHexString}
                                />
                            ))}
                        </TableBody>
                    </Table>
                    {/* ================ REFERENCES ================ */}
                    <Table
                        sx={tableStyle}
                        heads={
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={3}>REFERENCES</TableCell>
                                </TableRow>
                            </TableHead>
                        }
                    >
                        <ReferencesTBody />
                    </Table>
                    {/* ================ SIGNATURE ================ */}
                    <Table
                        sx={tableStyle}
                        heads={
                            <TableHead>
                                <TableRow>
                                    <TableCell>SIGNATURE</TableCell>
                                </TableRow>
                            </TableHead>
                        }
                    >
                        <SignatureTBody
                            signaturePreview={signaturePreview}
                            ref={signatureRef}
                            handleChangeSignature={handleChangeSignature}
                            handleRemoveSignature={handleRemoveSignature}
                            date={lastUpdate}
                        />
                    </Table>
                    {/* ================ ATTENDED PROJECTS ================ */}

                    <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>APPENDIX - PROJECT REFERENCE AND SKILL SET</Typography>
                    <Table
                        sx={tableStyle}
                        maxHeight="auto"
                        heads={
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            <span>ATTENDED PROJECTS</span>
                                            <IconButton size="small" onClick={() => appendAttendedProjects(attendedProjectsDefaultValue)}>
                                                <AddCircleOutlineIcon />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                        }
                    >
                        <TableBody>
                            {fieldsAttendedProjects?.map((att: any, index) => (
                                <FieldsAttendedProjects
                                    key={att.id}
                                    index={index}
                                    handleRemove={handleRemoveAttendedProjects}
                                    idHexString={att?.idHexString}
                                />
                            ))}
                        </TableBody>
                    </Table>
                    {/* ================ INFORMATION TECHNOLOGY SKILLS ================ */}
                    <Table
                        sx={tableStyle}
                        maxHeight="auto"
                        heads={
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={9}>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <span>INFORMATION TECHNOLOGY SKILLS</span>
                                            <IconButton
                                                size="small"
                                                onClick={() => appendInformationTechnologySkills(technologySkillsDefaultValue)}
                                            >
                                                <AddCircleOutlineIcon />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                        }
                    >
                        <TableBody>
                            <InfomationTechnologySkillsPoint />
                            {fieldsInformationTechnologySkills?.map((techGroup, index) => (
                                <FieldsInformationTechnologySkills
                                    key={techGroup.id}
                                    indexTechnology={index}
                                    technologiesSelect={technologiesSelect}
                                    methods={methods}
                                    handleChangeMainSkill={handleChangeMainSkill}
                                    handleRemove={() => handleRemoveInformationTechnologySkills(index, techGroup)}
                                    handleChangeTech={(e: any) => handleChangeTech(e, index, techGroup)}
                                    techName={methods.getValues(`technologySkill.${index}.technologyName` as any)}
                                    techNameList={techNameList}
                                />
                            ))}
                        </TableBody>
                    </Table>
                    {/* ================ FOREIGN LANGUAGE ================ */}
                    <Table
                        sx={tableStyle}
                        maxHeight="auto"
                        heads={
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={9}>
                                        <Stack direction="row" spacing={2}>
                                            <span>FOREIGN LANGUAGE</span>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                        }
                    >
                        <TableBody>
                            <ForeignLanguagePoint />
                            <TableRow>
                                <TableCell colSpan={9}>
                                    <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '20%' }}>
                                        <span>Languages</span>
                                        {fieldsForeignLanguage?.length < languageSelect?.length && (
                                            <IconButton size="small" onClick={() => appendForeignLanguage(foreignLanguageDefaultValue)}>
                                                <AddCircleOutlineIcon />
                                            </IconButton>
                                        )}
                                    </Stack>
                                </TableCell>
                            </TableRow>
                            {fieldsForeignLanguage?.map((foreign: any, index) => (
                                <FieldsForeignLanguage
                                    key={foreign.id}
                                    index={index}
                                    handleRemove={() => handleRemoveForeignLanguage(index, foreign)}
                                    idHexString={foreign?.idHexString}
                                    languageSelect={languageSelect}
                                    handleChangeLanguage={(e) => handleChangeLanguage(e, foreign)}
                                />
                            ))}
                        </TableBody>
                    </Table>
                    {/* ================ END CV ================ */}
                    <Typography sx={{ fontSize: '12px', fontWeight: 500, mb: '15px' }}>END OF MY CV HERE.</Typography>
                    {/* ================ ACTION ================ */}
                    <Stack direction="row" justifyContent="center" spacing={2}>
                        <Button disabled={loadingAction} color="error" onClick={handleCloseCVForm}>
                            <FormattedMessage id="cancel" />
                        </Button>
                        <LoadingButton loading={loadingAction} variant="contained" type="submit">
                            <FormattedMessage id="submit" />
                        </LoadingButton>
                    </Stack>
                </MainCard>
            </FormProvider>
        </>
    );
};

export default CV;
