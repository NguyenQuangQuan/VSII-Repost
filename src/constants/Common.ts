// project imports
import { IOption, IPaginationParam, IPaginationResponse, ITreeItem, ITabs } from 'types';
import { PERMISSIONS } from './Permission';

// PERMISSION
const { weeklyEffort, monthlyEffort, nonBillable, listProjectTeam } = PERMISSIONS.report;

const { saleList } = PERMISSIONS.sale;

// LAYOUT
export const LAYOUT_CONST = {
    VERTICAL_LAYOUT: 'vertical',
    HORIZONTAL_LAYOUT: 'horizontal',
    DEFAULT_DRAWER: 'default',
    MINI_DRAWER: 'mini-drawer'
};

// THEME
export const THEME_CONST = {
    gridSpacing: 3,
    drawerWidth: 260,
    appDrawerWidth: 320
};

// pagination default
export const paginationResponseDefault: IPaginationResponse = {
    pageNumber: 0,
    pageSize: 10,
    totalElement: 0,
    totalPage: 0
};

export const paginationParamDefault: IPaginationParam = {
    page: 0,
    size: 10
};

// date format
export const DATE_FORMAT = {
    DDMMYYYY: 'DD/MM/YYYY', //default
    ddMMyyyy: 'dd/MM/yyyy',
    MMM: 'MMM', // 3 first letter of month
    MMMM: 'MMMM', // month
    DDMMYYYYHHmmss: 'DD/MM/YYYY HH:mm:ss',
    HHmmssDDMMYYYY: 'HH:mm:ss DD/MM/YYYY',
    DoMMMYY: 'Do MMM YY' // 13th Jul 2023
};

// search form
// defaultValue option
export const DEFAULT_VALUE_OPTION: IOption = { value: '', label: 'select-all' };
export const DEFAULT_VALUE_OPTION_SELECT: IOption = { value: '', label: 'select-option' };

// time status
export const TIME_STATUS: IOption[] = [
    { value: 'enough', label: 'enough' },
    { value: 'not-enough', label: 'not-enough' },
    { value: 'exceed', label: 'exceed' }
];

// time status
export const TIME_STATUS_BY_NON_BILL: IOption[] = [
    DEFAULT_VALUE_OPTION,
    { value: 'notLogtime', label: 'staff-no-logtime', color: '#ff9393' },
    { value: 'projectPRD', label: 'staff-join-PRD', color: '#A9D08E' },
    { value: 'timeEffort50', label: 'effort-of-staff-50', color: '#FFE699' },
    { value: 'timeEffort80', label: 'effort-of-staff-80', color: '#F8CBAD' }
];

// user status
export const STATUS: IOption[] = [DEFAULT_VALUE_OPTION, { value: '1', label: 'active' }, { value: '3', label: 'inactive' }];

export const STATUS_USER = {
    active: 1,
    inActive: 3
};

// period option
export const PERIOD: IOption[] = [
    { value: 'month', label: 'month' },
    { value: 'week', label: 'weeks' }
];

// user title
export const USER_TITLE: IOption[] = [
    { value: 'SEP', label: 'SEP' },
    { value: 'SSE', label: 'SSE' },
    { value: 'PRG', label: 'PRG' }
];

// user title
export const USER_LEVEL: IOption[] = [
    { value: 'SEP', label: 'SEP' },
    { value: 'SSE', label: 'SSE' },
    { value: 'PRG', label: 'PRG' }
];

// row color
export enum ROW_COLOR {
    ENOUGH = '#FFFFFF',
    NOT_ENOUGH = '#FEFFD9',
    EXCEED = '#FFDADA'
}

// effort report tabs
export const weeklyEffortReportTabs: ITabs[] = [
    { name: 'member', permission_key: weeklyEffort.viewMember, value: 0 },
    { name: 'project', permission_key: weeklyEffort.viewProject, value: 1 },
    { name: 'project-detail', permission_key: weeklyEffort.viewProjectDetail, value: 2 }
];

export const monthlyEffortReportTabs: ITabs[] = [
    { name: 'member', permission_key: monthlyEffort.viewDepartmentMember, value: 0 },
    { name: 'project', permission_key: monthlyEffort.viewDepartmentMember, value: 1 }
];

// add/edit user tabs
export const addOrEditUserTabs: ITabs[] = [
    { name: 'user-info' },
    { name: 'group' },
    { name: 'on-outboard-info' },
    { name: 'title-user' },
    { name: 'billable' },
    { name: 'project-permission' }
];

// money format placehoder
export const MONEY_PLACEHOLDER = '0,XXX,XXX';

// project status
export const STATUS_PROJECT_OPTIONS: IOption[] = [
    DEFAULT_VALUE_OPTION,
    { value: '1', label: 'active' },
    { value: '5', label: 'closed' },
    { value: '9', label: 'archived' }
];

export const STATUS_PROJECT: any = {
    1: 'Active',
    5: 'Closed',
    9: 'Archived'
};

// 13th month salary
export const MONTH_SALARY_13TH_OPTION = { value: '13', label: '13th Month Salary' };

// group config checkbox
export const GROUP_OPTION_CONFIG = { value: 'groupId', label: 'groupName' };

// project config checkbox
export const PROJECT_OPTION_CONFIG = { value: 'projectId', label: 'projectName' };

// billable
export const BILLABLE_OPTIONS: IOption[] = [
    { value: 'billable', label: 'Billable' },
    { value: 'nonbillable', label: 'Nonbillable' }
];

// edit project tabs
export const projectEditTabs: ITabs[] = [{ name: 'project-info' }, { name: 'headcount' }, { name: 'quota-update-history' }];

// headcount
export const HEADCOUNT_OPTIONS: IOption[] = [
    { value: 'MainHC', label: 'Main HC' },
    { value: 'SubHC', label: 'Sub HC' }
];

// list project team tabs
export const listProjectTeamTabs: ITabs[] = [
    { name: 'list-project-team', permission_key: listProjectTeam.viewList, value: 0 },
    { name: 'joining-project', permission_key: listProjectTeam.viewRatioJoining, value: 1 }
];

// non-Billable tabs
export const nonBillMonitoringTabs: ITabs[] = [
    { name: 'non-billable-by-member', permission_key: nonBillable.viewMember, value: 0 },
    { name: 'warning-nonbillable-member', permission_key: nonBillable.viewWarning, value: 1 }
];

// status login
export enum ESTATUS_LOGIN {
    NOT_YET,
    SUCCESS
}

// public url
export const PUBLIC_URL = `${process.env.PUBLIC_URL}`;

// log time value
export enum E_IS_LOGTIME {
    YES = 'Yes',
    NO = 'No',
    ALL = ''
}

// percent format placeholder
export const PERCENT_PLACEHOLDER = 'XXX%';

// special hours type
export const TYPE_SPECIAL_HOURS_OPTIONS: IOption[] = [
    { value: '1', label: 'post-pregnancy' },
    { value: '2', label: 'maternity' },
    { value: '3', label: 'unpaid-leave' },
    { value: '4', label: 'other' }
];

//Manage holiday
export const TYPE_HOLIDAY_OPTIONS: IOption[] = [
    { value: '1', label: 'annual' },
    { value: '0', label: 'current-year' }
];
export const HOLIDAY_OPTIONS: IOption[] = [DEFAULT_VALUE_OPTION, { value: '1', label: 'Hàng năm' }, { value: '5', label: 'Năm hiện tại' }];

// saveOrUpdateGroup tabs
export const saveOrUpdateGroupTabs: ITabs[] = [{ name: 'group-info' }, { name: 'permission' }];
export const saveOrUpdateGroupAssignedUserTabs: ITabs[] = [{ name: 'group-info' }, { name: 'permission' }, { name: 'assigned-user' }];

// default permission
export const TREEITEM_DEFAULT_VALUE: ITreeItem = {
    value: 'ALL',
    name: 'all',
    children: []
};

// tree view
export const PERMISSION_EXPANDED_DEFAULT_VALUE = ['ALL', 'REPORT', 'ADMIN'];

// Month list
export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Productivity type
export const PRODUCTIVITY_TYPE: IOption[] = [
    { value: 'ITO', label: 'ITO - Outsource trong nước' },
    { value: 'O.ITO', label: 'O.ITO - Outsource nước ngoài' },
    { value: 'SI', label: 'SI - Tích hợp phần mềm' },
    { value: 'Product', label: 'Product - Dự án sản phẩm' },
    { value: 'MTN.App', label: 'MTN.App - Bảo trì ứng dụng' },
    { value: 'MTN.Lic', label: 'MTN.Lic - Bảo trì License' }
];

// Contract Type
export const CONTRACT_TYPE: IOption[] = [
    { value: 'TM', label: 'TM' },
    { value: 'Fix Cost', label: 'Fix Cost' }
];

// Role Type
export const ROLE_TYPE: IOption[] = [
    { value: 'PM', label: 'PM' },
    { value: 'Team Lead', label: 'Team Lead' },
    { value: 'SSE', label: 'SSE' },
    { value: 'SE', label: 'SE' },
    { value: 'BA', label: 'BA' },
    { value: 'Tester', label: 'Tester' },
    { value: 'Others', label: 'Others' }
];

// Payment Term
export const PAYMENT_TERM: IOption[] = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' }
];

export const MONTHLY_BILLABLE: IOption[] = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' }
];

// report type
export enum REPORT_TYPE {
    RP_MONTHLY = 'RP_MONTHLY',
    RP_WEEK = 'RP_WEEK',
    RP_NON_BILLABLE_MONITORING = 'RP_NON_BILLABLE_MONITORING',
    RP_LIST_PROJECT_TEAM = 'RP_LIST_PROJECT_TEAM',
    RP_WEEKLY_COST_MONITORING = 'RP_WEEKLY_COST_MONITORING',
    RRP_MONTHLY_COST_MONITORING = 'RP_MONTHLY_COST_MONITORING'
}

//sales lead
export const STATUS_REQUESTS_CHECKING: IOption[] = [
    { value: 'Not Start', label: 'not-start' },
    { value: 'Inprogress', label: 'inprogress' },
    { value: 'Stop', label: 'stop' }
];

export const POSSIBILITY: IOption[] = [
    { value: 'High', label: 'high' },
    { value: 'Normal', label: 'normal' },
    { value: 'Low', label: 'low' }
];

export const WORK_TYPE: IOption[] = [
    { value: 'Remote', label: 'remote' },
    { value: 'Onsite', label: 'onsite' }
];

export const saleListTabs: ITabs[] = [
    { name: 'requests-checking', permission_key: saleList.viewRequests, value: 0 },
    { name: 'supplier-checking', permission_key: saleList.viewSupplier, value: 1 }
];

// search params key
export const SEARCH_PARAM_KEY = {
    // ====== Common =======
    tab: 'tab',
    page: 'page',
    size: 'size',
    year: 'year',
    month: 'month',
    week: 'week',
    fromDate: 'fromDate',
    toDate: 'toDate',
    supplierName: 'supplierName',
    partnerName: 'partnerName',
    picUserName: 'picUserName',
    receivedDate: 'receivedDate',
    departmentId: 'departmentId',
    timeStatus: 'timeStatus',
    status: 'status',
    type: 'type',
    titleCode: 'titleCode',
    titleName: 'titleName',
    // ====== Project =======
    projectType: 'projectType',
    projectId: 'projectId',
    projectName: 'projectName',
    projectManager: 'projectManager',
    // ====== User =======
    userId: 'userId',
    fullname: 'fullname',
    userName: 'userName',
    memberCode: 'memberCode',
    contractor: 'contractor',
    idHexString: 'idHexString',
    // ====== Group =======
    groupCode: 'code',
    groupName: 'name',
    // ====== Holiday =======
    holidayType: 'type',
    specialHoursType: 'type',
    // ====== Sale - Ongoing ======
    productionPerformanceIdHexString: 'productionPerformanceIdHexString',
    // ===== Skills manage =====
    skill: 'skill',
    level: 'level',
    degree: 'degree'
};

export const FIELD_BY_TAB_USERS = [
    {
        tabValue: 0,
        fields: ['departmentId', 'firstName', 'lastName', 'memberCode', 'userName']
    },
    {
        tabValue: 2,
        fields: ['userOnboardHistoryList']
    },
    {
        tabValue: 3,
        fields: ['userRankHistoryList']
    },
    {
        tabValue: 4,
        fields: ['userBillableHistoryList']
    }
];

export const FIELD_BY_TAB_ONGOING = [
    {
        tabValue: 0,
        fields: ['projectInfo.status', 'projectInfo.productionPerformanceIdHexString']
    }
];
export const FIELD_BY_TAB_BIDDING = [
    {
        tabValue: 0,
        fields: ['contractType', 'projectName', 'serviceType', 'status']
    },
    {
        tabValue: 1,
        fields: ['currency']
    }
];

// group color
export const GROUP_COLOR_MONTH = '#fff2f2';

// Day list
export const DAY_LIST = [
    { value: 'MON', label: 'Monday' },
    { value: 'TUE', label: 'Tueday' },
    { value: 'WED', label: 'Wednesday' },
    { value: 'THU', label: 'Thursday' },
    { value: 'FRI', label: 'Friday' },
    { value: 'SAT', label: 'Saturday' },
    { value: 'SUN', label: 'Sunday' }
];

// Email type
export enum EMAIL_TYPE {
    RP_WEEK = 'RP_WEEK',
    RP_MONTH = 'RP_MONTH'
}

export const EMAIL_TYPE_OPTIONS: IOption[] = [
    { value: EMAIL_TYPE.RP_WEEK, label: 'week' },
    { value: EMAIL_TYPE.RP_MONTH, label: 'month' }
];
// groupType select

export const GROUP_TYPE: IOption[] = [
    {
        value: 'BOD',
        label: 'BOD'
    },
    {
        value: 'HRD',
        label: 'HRD'
    },
    {
        value: 'PM',
        label: 'PM'
    }
];

// contractor select
export const CONTRACTOR: IOption[] = [
    { value: 'Yes', label: 'contractor-yes' },
    { value: 'No', label: 'contractor-no' }
];

// project permission options
export const PROJECT_PERMISSION_OPTIONS: IOption[] = [
    { value: 'Assigned', label: 'detail-by-project' },
    { value: 'All', label: 'all' }
];

// Email config options
export const EMAIL_CONFIG_OPTIONS: IOption[] = [
    { value: 'ACTIVE', label: 'Active' },
    { value: 'INACTIVE', label: 'Inactive' }
];

// Register working calendar
export const REGISTER_WORKING_CALENDAR_TYPE: IOption[] = [
    { value: 'WAO', label: 'work-at-office', color: '#FFC000' },
    { value: 'OS', label: 'onsite', color: '#E6EF17 ' },
    { value: 'X/2', label: 'half-day-leave', color: '#DCBEB2' },
    { value: 'TS', label: 'maternity-leave', color: '#C55A11' },
    { value: 'NC', label: 'wedding-vacation', color: '#D77B43' },
    { value: 'WFH', label: 'work-from-home', color: '#77A348' },
    { value: 'X', label: 'full-day-leave', color: '#E8CAAC' },
    { value: 'O', label: 'sick-leave', color: '#E70A17' },
    { value: 'NL', label: 'holiday', color: '#7C91BF' },
    { value: 'NB', label: 'compensatory-leave', color: '#979797' }
];
// sale pipeline ongoing type options
export const SALE_PIPELINE_ONGOING_TYPE: IOption[] = [
    { value: 'Service-Sale', label: 'scs-service-prd-sales' },
    {
        value: 'I.ITO',
        label: 'international-ito'
    }
];

// sale pipe ongoing status options
export const SALE_PIPELINE_ONGOING_STATUS: IOption[] = [
    { value: 'On-going', label: 'on-going' },
    { value: 'Done', label: 'done' },
    { value: 'Pending', label: 'pending' },
    { value: 'NPL', label: 'npl' }
];

// sale pipeline ongoing add of edit tabs
export const AddOrEditOnGoingTabs: ITabs[] = [
    { name: 'project-info', value: 0 },
    { name: 'financial-info', value: 1 },
    { name: 'hc-info', value: 2 },
    { name: 'other-info', value: 3 }
];

// month of year
export const MONTHS_OF_YEAR: any = {
    1: 'jan',
    2: 'feb',
    3: 'mar',
    4: 'apr',
    5: 'may',
    6: 'jun',
    7: 'jul',
    8: 'aug',
    9: 'sep',
    10: 'oct',
    11: 'nov',
    12: 'dec'
};

// sale pipe budgeting plan service type
export const SALE_PIPELINE_BUDGETING_PLAN_SERVICE_TYPE: IOption[] = [
    { value: 'ITO', label: 'ito' },
    { value: 'O.ITO', label: 'o-ito' },
    { value: 'SI', label: 'si' },
    { value: 'MTN.App', label: 'mtn-app' },
    { value: 'MTN.Lic', label: 'mtn-lic' },
    { value: 'Product', label: 'product' }
];

// sale pipeline budgeting edit tabs
export const EditBudgetingPlanTabs: ITabs[] = [
    { name: 'project-info', value: 0 },
    { name: 'project-KPI-score', value: 1 },
    { name: 'project-KPI-bonus', value: 2 }
];

export const FIELD_BY_TAB_BUDGETING_PLAN = [
    {
        tabValue: 0,
        fields: ['project-info', 'project-KPI-score', 'project-KPI-bonus']
    }
];

// riskFactor format placeholder
export const RISK_FACTOR_PLACEHOLDER = 'XX%';

//bidding
export const addOrEditBiddingTabs: ITabs[] = [
    { name: 'project-info', value: 0 },
    { name: 'financial-info', value: 1 },
    { name: 'hc-info', value: 2 },
    { name: 'other-info', value: 3 }
];

export const BIDDING_TYPE: IOption[] = [
    { value: 's123', label: 'SCS service and PRD sales' },
    { value: 'International ITO', label: 'International ITO' }
];

export const SERVICE_TYPE: IOption[] = [
    { value: 'SI', label: 'SI' },
    { value: 'ITO', label: 'ITO' },
    { value: 'O.ITO', label: 'O.ITO' },
    { value: 'Product', label: 'Product' },
    { value: 'MTN.App', label: 'MTN.App' },
    { value: 'MTN.Lic', label: 'MTN.Lic' }
];

export const BIDDING_STATUS: IOption[] = [
    { value: 'Bidding', label: 'bidding' },
    { value: 'Contract', label: 'contract' },
    { value: 'Loss', label: 'loss' },
    { value: 'Failed', label: 'failed' }
];

export const CURRENCY: IOption[] = [
    { value: 'USD', label: 'USD' },
    { value: 'VND', label: 'VND' },
    { value: 'JPY', label: 'JPY' }
];

export enum DEPARTMENTS {
    SCS = 'SCS',
    PRD = 'PRD',
    SMD = 'SMD'
}

export enum CONTRACT_TYPE_SALE_REPORT {
    TM = 'TM',
    FIX_COST = 'FIX_COST',
    FIX_COST_BIDDING = 'Fix Cost'
}
export const ADDED_EBITDA: IOption[] = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' }
];

// skill report
export const SKILL: IOption[] = [
    { value: 'Test', label: 'Test' },
    { value: '.NET', label: '.NET' },
    { value: 'Analysis', label: 'Analysis' }
];

// Data source
export const DATA_SOURCE: IOption[] = [
    { value: 'redmine', label: 'Redmine' },
    { value: 'excel', label: 'Excel' }
];

export const LEVEL: IOption[] = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' }
];

export const DEGREE: IOption[] = [
    { value: 'diploma-degree', label: 'diploma-degree' },
    { value: 'college-degree', label: 'college-degree' },
    { value: 'post-graduated', label: 'post-graduated' },
    { value: 'other', label: 'other' }
];

export const EXPERT_LEVEL: IOption[] = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' }
];

export const DEGREE_OPTION_RADIO: IOption[] = [
    {
        value: 'diploma-degree',
        label: 'Diploma degree'
    },
    {
        value: 'college-degree',
        label: 'College degree'
    },
    {
        value: 'post-graduated-degree',
        label: 'Post graduated'
    },
    {
        value: 'other',
        label: 'Other'
    }
];

export const DEFAULT_IMAGE_IMAGE_JPG_BASE64 = 'data:image/jpg;base64,';
