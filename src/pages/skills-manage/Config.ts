// yup
import * as yup from 'yup';

// project imports
import { IOption, IPaginationParam } from 'types';
import { paginationParamDefault } from 'constants/Common';
import { VALIDATE_MESSAGES } from 'constants/Message';

// Skills Update
export interface ISkillsUpdateSearchConfig extends IPaginationParam {
    userName: IOption | null;
    titleCode: IOption | null;
    departmentId: string;
    status: string;
}

export const skillsUpdateSearchConfig: ISkillsUpdateSearchConfig = {
    ...paginationParamDefault,
    userName: null,
    titleCode: null,
    departmentId: '',
    status: ''
};

export const skillsUpdateSearchSchema = yup.object().shape({
    userName: yup
        .object()
        .shape({
            value: yup.string().nullable(),
            label: yup.string()
        })
        .nullable(),
    titleCode: yup
        .object()
        .shape({
            value: yup.string(),
            label: yup.string()
        })
        .nullable(),
    departmentId: yup.string().nullable(),
    status: yup.string().nullable()
});

export const educationHistoryDefaultValue = [
    {
        idHexString: null,
        fromDate: '',
        toDate: '',
        school: '',
        qualification: ''
    }
];

export const coursesAttendedDefaultValue = [
    {
        idHexString: null,
        fromDate: '',
        toDate: '',
        schoolCollege: '',
        name: '',
        qualification: ''
    }
];

export const certificatesDefaultValue = [
    {
        idHexString: null,
        fromDate: '',
        toDate: '',
        organization: '',
        name: '',
        qualification: ''
    }
];

export const employmentsHistoryDefaultValue = [
    {
        idHexString: null,
        fromDate: '',
        toDate: '',
        company: '',
        jobTitle: '',
        jobDescription: ''
    }
];

export const attendedProjectsDefaultValue = [
    {
        idHexString: null,
        fromDate: '',
        toDate: '',
        projectName: '',
        company: '',
        client: '',
        projectSize: '',
        position: '',
        responsibilities: '',
        description: '',
        languages: '',
        technologies: ''
    }
];

export const skillsDefaultValue = [
    {
        idHexString: null,
        techName: '',
        experiences: '',
        lastedUsed: '',
        level: 1,
        mainSkill: false
    }
];

export const technologySkillsDefaultValue = [
    {
        technologyName: '',
        technologies: []
    }
];

export const foreignLanguageDefaultValue = [
    {
        idHexString: null,
        name: '',
        experiences: '',
        lastedUsed: '',
        level: 1
    }
];

export const cvDefaultValues = {
    personalDetail: {
        fullname: '',
        jobTitle: '',
        dateOfBirth: '',
        placeOfBirth: '',
        gender: '',
        maritalStatus: '',
        mobile: '(+8424)37280366',
        email: '',
        degree: '',
        userName: '',
        firstName: '',
        lastName: '',
        memberCode: '',
        department: '',
        status: '',
        title: '',
        summaryInformation: '',
        idHexStringUser: null,
        referenceIdHexString: null
    },
    educationHistory: [],
    coursesAttended: [],
    certificates: [],
    employmentsHistory: [],
    references: {
        fullName: '',
        organization: '',
        position: '',
        address: '',
        phoneNumber: '',
        email: ''
    },
    attendedProjects: [],
    technologySkill: [],
    foreignLanguage: []
};

export const cvSchema = yup.object().shape({
    personalDetail: yup.object().shape({
        fullname: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
        jobTitle: yup.string().nullable(),
        dateOfBirth: yup.string().nullable(),
        placeOfBirth: yup.string().nullable(),
        gender: yup.string().nullable(),
        maritalStatus: yup.string().nullable(),
        mobile: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
        email: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
        summaryInformation: yup.string().nullable(),
        referenceIdHexString: yup
            .object()
            .shape({
                value: yup.string().nullable(),
                label: yup.string().nullable()
            })
            .nullable()
            .required(),
        idHexStringUser: yup
            .object()
            .shape({
                value: yup.string().nullable(),
                label: yup.string().nullable()
            })
            .required(VALIDATE_MESSAGES.REQUIRED)
    }),
    educationHistory: yup.array().of(
        yup.object().shape({
            fromDate: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
            toDate: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
            school: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
            qualification: yup.string().nullable()
        })
    ),
    coursesAttended: yup.array().of(
        yup.object().shape({
            fromDate: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
            toDate: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
            schoolCollege: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
            name: yup.string().nullable(),
            qualification: yup.string().nullable()
        })
    ),
    certificates: yup.array().of(
        yup.object().shape({
            fromDate: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
            toDate: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
            organization: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
            name: yup.string().nullable(),
            qualification: yup.string().nullable()
        })
    ),
    employmentsHistory: yup.array().of(
        yup.object().shape({
            fromDate: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
            toDate: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
            company: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
            jobTitle: yup.string().nullable(),
            jobDescription: yup.string().nullable()
        })
    ),
    references: yup.object().shape({
        fullname: yup.string().nullable(),
        organization: yup.string().nullable(),
        position: yup.string().nullable(),
        address: yup.string().nullable(),
        phoneNumber: yup.string().nullable(),
        email: yup.string().nullable()
    }),
    attendedProjects: yup.array().of(
        yup.object().shape({
            fromDate: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
            toDate: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
            projectName: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
            company: yup.string().nullable(),
            client: yup.string().nullable(),
            projectSize: yup.string().nullable(),
            position: yup.string().nullable(),
            responsibilities: yup.string().nullable(),
            description: yup.string().nullable(),
            languages: yup.string().nullable(),
            technologies: yup.string().nullable()
        })
    ),
    technologySkill: yup.array().of(
        yup.object().shape({
            technologyName: yup.string().nullable(),
            technologies: yup.array().of(
                yup.object().shape({
                    techName: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
                    experiences: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
                    lastedUsed: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
                    level: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED)
                })
            )
        })
    ),
    foreignLanguage: yup.array().of(
        yup.object().shape({
            name: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
            experiences: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
            lastedUsed: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
            level: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED)
        })
    )
});

// Skills Report
export interface ISkillsReportSearchDefaultValue extends IPaginationParam {
    userName: IOption | null;
    skill: string[];
    level: string[];
    degree: string[];
    titleCode: IOption | null;
}

export const skillsReportSearchDefaultValue: ISkillsReportSearchDefaultValue = {
    ...paginationParamDefault,
    level: [],
    userName: null,
    titleCode: null,
    skill: [],
    degree: []
};

export const skillsReportSearchDefaultValueSchema = yup.object().shape({
    titleCode: yup
        .object()
        .shape({
            value: yup.string(),
            label: yup.string()
        })
        .nullable(),
    userName: yup
        .object()
        .shape({
            value: yup.string().nullable(),
            label: yup.string()
        })
        .nullable(),
    skill: yup.array().nullable(),
    level: yup.array().nullable(),
    degree: yup.array().nullable()
});
