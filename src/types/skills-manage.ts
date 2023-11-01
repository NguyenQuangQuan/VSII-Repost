// Skills report
export interface ITechnologySkill {
    id: string;
    memberCode: string;
    userName: string;
    techName: string;
    experiences: number;
    level: number;
    jobTitle: null;
    mainSkill: boolean;
}

export interface ISkillsReport {
    idHexString: string;
    memberCode: string;
    userName: string;
    fullNameVi: string;
    fullNameEn: string;
    title: string;
    department: string;
    status: string;
    degree: string;
    technologySkillResponse: ITechnologySkill[];
}

export interface ISkillsReportResponse {
    content: ISkillsReport[];
}

export interface ITechs {
    idHexString: string;
    name: string;
    type: string;
}

export interface ITechsResponse {
    content: ITechs[];
}

export interface ITitleCode {
    id: {
        timestamp: number;
        date: string;
    };
    titleCode: string;
    titleName: string;
    created: string;
    creator: string;
    lastUpdate: string;
    userUpdate: string;
}

export interface ITitleResponse {
    content: ITitleCode[];
}

// Skills update
