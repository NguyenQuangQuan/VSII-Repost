import { IComment } from './comment';

// list project team
export interface IProjectTeam {
    id: string;
    userId: string;
    userName: string;
    userType?: any;
    lastName: string;
    firstName: string;
    userDept: string;
    created: string;
    userTitle: string;
    userRank: string;
    memberCode: string;
    ratioJoinProject?: any;
    ratioForgetLogTime?: any;
    mainHeadCount: string;
    subHeadCount: string;
    projectNonBillable: string;
    notLogTime: boolean;
    comment: IComment;
}

export interface IProjectTeamList {
    content: IProjectTeam[];
}

// Ratio joining project
export interface IRatioJoiningProject {
    id: string;
    userId: number;
    userName: string;
    userType?: any;
    lastName: string;
    firstName: string;
    userDept: string;
    created: string;
    userTitle: string;
    userRank: string;
    memberCode: string;
    ratioJoinProject: string;
    ratioForgetLogTime: string;
}

export interface IRatioJoiningProjectList {
    content: IRatioJoiningProject[];
}
