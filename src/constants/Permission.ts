export const MAIN_FUNCTION_LIST: { name: string; functions: string[] }[] = [
    // Synchronize
    { name: 'SYNCHRONIZE', functions: ['SYNCHRONIZE_DATA'] },
    // System config
    { name: 'ADM_SYS_CONFIG', functions: ['ADM_SYS_CONFIG_VIEW', 'ADM_SYS_CONFIG_EDIT'] },
    // Email config
    { name: 'ADM_EMAIL_CONFIG', functions: ['ADM_EMAIL_CONFIG_VIEW', 'ADM_EMAIL_CONFIG_ADD', 'ADM_EMAIL_CONFIG_EDIT'] },
    // Manage project
    { name: 'ADM_PROJECT', functions: ['ADM_PROJECT_VIEW', 'ADM_PROJECT_ADD', 'ADM_PROJECT_EDIT'] },
    // Manage group
    { name: 'ADM_GROUP', functions: ['ADM_GROUP_VIEW', 'ADM_GROUP_ADD', 'ADM_GROUP_EDIT'] },
    // Manage holidays
    { name: 'ADM_HOL', functions: ['ADM_HOL_VIEW', 'ADM_HOL_ADD', 'ADM_HOL_EDIT'] },
    // Manage user
    { name: 'ADM_USER', functions: ['ADM_USER_VIEW', 'ADM_USER_ADD', 'ADM_USER_EDIT'] },
    // Mamage rank
    { name: 'ADM_RANK', functions: ['ADM_RANK_VIEW', 'ADM_RANK_EDIT'] },
    // Manage special hours
    { name: 'ADM_SPECIAL_HOURS', functions: ['ADM_SPECIAL_HOURS_VIEW', 'ADM_SPECIAL_HOURS_ADD', 'ADM_SPECIAL_HOURS_EDIT'] },
    // Weekly effort
    {
        name: 'RP_WER',
        functions: [
            'RP_WER_MEMBER_VIEW',
            'RP_WER_PROJECT_VIEW',
            'RP_WER_PROJECT_DETAIL_VIEW',
            'RP_WER_PROJECT_DETAIL_PM_VERIFY',
            'RP_WER_PROJECT_DETAIL_QA_VERIFY',
            'RP_WER_DOWNLOAD',
            'RP_WER_MEMBER_COMMENT'
        ]
    },
    // Non-billable
    {
        name: 'RP_NONBILL',
        functions: [
            'RP_NONBILL_MEMBER_VIEW',
            'RP_NONBILL_CHART_VIEW',
            'RP_NONBILL_DOWNLOAD',
            'RP_NONBILL_WARNING_MEMBER_VIEW',
            'RP_NONBILL_COMMENT',
            'RP_NONBILL_COMMENT_DETAIL'
        ]
    },
    // List project team
    {
        name: 'RP_LPJ',
        functions: ['RP_LPJ_LISTHC_VIEW', 'RP_LPJ_PJP_VIEW', 'RP_LPJ_DOWNLOAD', 'RP_LPJ_LISTHC_COMMENT', 'RP_LPJ_LISTHC_COMMENT_DETAIL']
    },
    // Cost monitoring
    { name: 'RP_WCR', functions: ['RP_WCR_MC_VIEW', 'RP_WCR_EFW_VIEW', 'RP_WCR_DOWNLOAD', 'RP_WCR_MC_COMMENT'] },
    {
        name: 'RP_MER',
        functions: [
            'RP_MER_SUM_VIEW',
            'RP_MER_SUM_EDIT',
            'RP_MER_PROJECT_VIEW',
            'RP_MER_MEMBER_VIEW',
            'RP_MER_DOWNLOAD',
            'RP_MER_PROJECT_COMMENT'
        ]
    },
    // Monthly project cost
    {
        name: 'RP_MPC',
        functions: [
            'RP_MPC_SUM_VIEW',
            'RP_MPC_DBM_VIEW',
            'RP_MPC_MCD_VIEW',
            'RP_MPC_DOWNLOAD',
            'RP_MPC_MCD_ADD',
            'RP_MPC_MCD_EDIT',
            'RP_MPC_MCD_DOWNLOAD_TEMPLATE',
            'RP_MPC_MCD_IMPORT_TEMPLATE'
        ]
    },
    // Sale
    {
        name: 'SALE_MONTHLY_PRODUCTION_PERFORMANCE',
        functions: [
            'SALE_MONTHLY_PRODUCTION_PERFORMANCE_VIEW',
            'SALE_MONTHLY_PRODUCTION_PERFORMANCE_ADD',
            'SALE_MONTHLY_PRODUCTION_PERFORMANCE_EDIT',
            'SALE_MONTHLY_PRODUCTION_PERFORMANCE_DOWNLOAD'
        ]
    },
    {
        name: 'SALE_SALE_LIST',
        functions: [
            'SALE_SALE_LIST_REQUEST_VIEW',
            'SALE_SALE_LIST_REQUEST_ADD',
            'SALE_SALE_LIST_REQUEST_EDIT',
            'SALE_SALE_LIST_REQUEST_DELETE',
            'SALE_SALE_LIST_REQUEST_DOWNLOAD',
            'SALE_SALE_LIST_SUPPLIER_VIEW',
            'SALE_SALE_LIST_SUPPLIER_ADD',
            'SALE_SALE_LIST_SUPPLIER_EDIT',
            'SALE_SALE_LIST_SUPPLIER_DELETE',
            'SALE_SALE_LIST_SUPPLIER_DOWNLOAD'
        ]
    },
    // Sale pipeline
    {
        name: 'SALE_SALEPIPELINE_SUMMARY',
        functions: ['SALE_SALEPIPELINE_SUMMARY_VIEW', 'SALE_SALEPIPELINE_SUMMARY_DOWNLOAD']
    },
    {
        name: 'SALE_SALEPIPELINE_ONGOING',
        functions: [
            'SALE_SALEPIPELINE_ONGOING_VIEW',
            'SALE_SALEPIPELINE_ONGOING_ADD',
            'SALE_SALEPIPELINE_ONGOING_EDIT',
            'SALE_SALEPIPELINE_ONGOING_DELETE'
        ]
    },
    {
        name: 'SALE_SALEPIPELINE_BIDDING',
        functions: [
            'SALE_SALEPIPELINE_BIDDING_VIEW',
            'SALE_SALEPIPELINE_BIDDING_ADD',
            'SALE_SALEPIPELINE_BIDDING_EDIT',
            'SALE_SALEPIPELINE_BIDDING_DELETE'
        ]
    },
    {
        name: 'SALE_SALEPIPELINE_BUDGETING',
        functions: ['SALE_SALEPIPELINE_BUDGETING_VIEW', 'SALE_SALEPIPELINE_BUDGETING_EDIT']
    },
    // Working calendar
    {
        name: 'HR_WORKING_CALENDAR',
        functions: [
            'HR_WORKING_CALENDAR_VIEW',
            'HR_WORKING_CALENDAR_EDIT',
            'HR_WORKING_CALENDAR_EXPORT',
            'HR_WORKING_CALENDAR_VERIFY',
            'HR_WORKING_CALENDAR_APROVE',
            'HR_WORKING_CALENDAR_CLOSING'
        ]
    },
    // Skill manage
    {
        name: 'SKILL_UPDATE',
        functions: [
            'SKILL_MANAGE_SKILL_UPDATE_VIEW',
            'SKILL_MANAGE_SKILL_UPDATE_ADD',
            'SKILL_MANAGE_SKILL_UPDATE_EDIT',
            'SKILL_MANAGE_SKILL_UPDATE_DOWNLOAD',
            'SKILL_MANAGE_SKILL_UPDATE_VIEWCV'
        ]
    },
    {
        name: 'SKILL_REPORT',
        functions: ['SKILL_MANAGE_SKILL_REPORT_VIEW', 'SKILL_MANAGE_SKILL_REPORT_DOWNLOAD']
    }
];

// Permission
export const PERMISSIONS = {
    // Synchronize
    syn: {
        synchronize: 'SYNCHRONIZE_DATA'
    },
    // Admin
    admin: {
        userPermission: {
            add: 'ADM_USER_ADD',
            edit: 'ADM_USER_EDIT'
        },
        projectPermission: {
            edit: 'ADM_PROJECT_EDIT'
        },
        groupPermission: {
            add: 'ADM_GROUP_ADD',
            edit: 'ADM_GROUP_EDIT'
        },
        holidayPermission: {
            add: 'ADM_HOL_ADD',
            edit: 'ADM_HOL_EDIT'
        },
        rankPermission: {
            edit: 'ADM_RANK_EDIT'
        },
        systemConfigPermission: {
            edit: 'ADM_SYS_CONFIG_EDIT'
        },
        specialHoursPermission: {
            add: 'ADM_SPECIAL_HOURS_ADD',
            edit: 'ADM_SPECIAL_HOURS_EDIT'
        },
        emailConfigPermission: {
            add: 'ADM_EMAIL_CONFIG_ADD',
            edit: 'ADM_EMAIL_CONFIG_EDIT'
        }
    },
    // working calendar
    workingCalendar: {
        registerWorkingCalendar: {
            viewWorkingCalendar: 'HR_WORKING_CALENDAR_VIEW',
            editWorkingCalendar: 'HR_WORKING_CALENDAR_EDIT',
            exportWorkingCalendar: 'HR_WORKING_CALENDAR_EXPORT',
            verifyWorkingCalendar: 'HR_WORKING_CALENDAR_VERIFY',
            aproveWorkingCalendar: 'HR_WORKING_CALENDAR_APROVE',
            closingWorkingCalendar: 'HR_WORKING_CALENDAR_CLOSING'
        }
    },
    // Report
    report: {
        weeklyEffort: {
            viewMember: 'RP_WER_MEMBER_VIEW',
            viewProject: 'RP_WER_PROJECT_VIEW',
            viewProjectDetail: 'RP_WER_PROJECT_DETAIL_VIEW',
            pmVerify: 'RP_WER_PROJECT_DETAIL_PM_VERIFY',
            qaVerify: 'RP_WER_PROJECT_DETAIL_QA_VERIFY',
            download: 'RP_WER_DOWNLOAD',
            comment: 'RP_WER_MEMBER_COMMENT'
        },
        monthlyEffort: {
            viewSummary: 'RP_MER_SUM_VIEW',
            viewProject: 'RP_MER_PROJECT_VIEW',
            viewDepartmentMember: 'RP_MER_MEMBER_VIEW',
            editEffortPlan: 'RP_MER_SUM_EDIT',
            download: 'RP_MER_DOWNLOAD',
            comment: 'RP_MER_PROJECT_COMMENT'
        },
        nonBillable: {
            viewMember: 'RP_NONBILL_MEMBER_VIEW',
            viewChart: 'RP_NONBILL_CHART_VIEW',
            viewWarning: 'RP_NONBILL_WARNING_MEMBER_VIEW',
            download: 'RP_NONBILL_DOWNLOAD',
            comment: 'RP_NONBILL_COMMENT',
            commentDetail: 'RP_NONBILL_COMMENT_DETAIL'
        },
        listProjectTeam: {
            viewList: 'RP_LPJ_LISTHC_VIEW',
            viewRatioJoining: 'RP_LPJ_PJP_VIEW',
            download: 'RP_LPJ_DOWNLOAD',
            comment: 'RP_LPJ_LISTHC_COMMENT',
            commentDetail: 'RP_LPJ_LISTHC_COMMENT_DETAIL'
        },
        costMonitoring: {
            download: 'RP_WCR_DOWNLOAD',
            comment: 'RP_WCR_MC_COMMENT'
        },
        monthlyProjectCost: {
            addCost: 'RP_MPC_MCD_ADD',
            download: 'RP_MPC_DOWNLOAD',
            downloadTemplate: 'RP_MPC_MCD_DOWNLOAD_TEMPLATE',
            importTemplate: 'RP_MPC_MCD_IMPORT_TEMPLATE'
        },
        skillManage: {
            skillsUpdate: {
                view: 'SKILL_MANAGE_SKILL_UPDATE_VIEW',
                add: 'SKILL_MANAGE_SKILL_UPDATE_ADD',
                edit: 'SKILL_MANAGE_SKILL_UPDATE_EDIT',
                download: 'SKILL_MANAGE_SKILL_UPDATE_DOWNLOAD',
                viewCV: 'SKILL_MANAGE_SKILL_UPDATE_VIEWCV'
            },
            skillsReportPermission: {
                view: 'SKILL_MANAGE_SKILL_REPORT_VIEW',
                download: 'SKILL_MANAGE_SKILL_REPORT_DOWNLOAD'
            }
        }
    },
    // Sale
    sale: {
        saleList: {
            viewRequests: 'SALE_SALE_LIST_REQUEST_VIEW',
            addRequest: 'SALE_SALE_LIST_REQUEST_ADD',
            editRequest: 'SALE_SALE_LIST_REQUEST_EDIT',
            downloadRequest: 'SALE_SALE_LIST_REQUEST_DOWNLOAD',
            viewSupplier: 'SALE_SALE_LIST_SUPPLIER_VIEW',
            addSupplier: 'SALE_SALE_LIST_SUPPLIER_ADD',
            editSupplier: 'SALE_SALE_LIST_SUPPLIER_EDIT',
            downloadSupplier: 'SALE_SALE_LIST_SUPPLIER_DOWNLOAD'
        },
        monthlyProductionPerformancePermission: {
            view: 'SALE_MONTHLY_PRODUCTION_PERFORMANCE_VIEW',
            add: 'SALE_MONTHLY_PRODUCTION_PERFORMANCE_ADD',
            edit: 'SALE_MONTHLY_PRODUCTION_PERFORMANCE_EDIT',
            delete: 'SALE_MONTHLY_PRODUCTION_PERFORMANCE_DELETE',
            download: 'SALE_MONTHLY_PRODUCTION_PERFORMANCE_DOWNLOAD'
        },
        salePipeline: {
            summaryPermission: {
                view: 'SALE_SALEPIPELINE_SUMMARY_VIEW',
                download: 'SALE_SALEPIPELINE_SUMMARY_DOWNLOAD'
            },
            onGoingPermission: {
                view: 'SALE_SALEPIPELINE_ONGOING_VIEW',
                add: 'SALE_SALEPIPELINE_ONGOING_ADD',
                edit: 'SALE_SALEPIPELINE_ONGOING_EDIT',
                delete: 'SALE_SALEPIPELINE_ONGOING_DELETE'
            },
            biddingPermission: {
                view: 'SALE_SALEPIPELINE_BIDDING_VIEW',
                add: 'SALE_SALEPIPELINE_BIDDING_ADD',
                edit: 'SALE_SALEPIPELINE_BIDDING_EDIT',
                delete: 'SALE_SALEPIPELINE_BIDDING_DELETE'
            },
            budgetingPermission: {
                view: 'SALE_SALEPIPELINE_BUDGETING_VIEW',
                edit: 'SALE_SALEPIPELINE_BUDGETING_EDIT'
            }
        }
    }
};

// VIEW
export const MAIN_FUNCTIONS = {
    // Synchronize
    syn: {
        root: ['SYNCHRONIZE_DATA']
    },
    // Admin
    admin: {
        root: [
            'ADM_PROJECT_VIEW',
            'ADM_GROUP_VIEW',
            'ADM_HOL_VIEW',
            'ADM_USER_VIEW',
            'ADM_RANK_VIEW',
            'ADM_SYS_CONFIG_VIEW',
            'ADM_SPECIAL_HOURS_VIEW',
            'ADM_EMAIL_CONFIG_VIEW'
        ],
        project: ['ADM_PROJECT_VIEW'],
        group: ['ADM_GROUP_VIEW'],
        holidays: ['ADM_HOL_VIEW'],
        user: ['ADM_USER_VIEW'],
        rank: ['ADM_RANK_VIEW'],
        systemConfig: ['ADM_SYS_CONFIG_VIEW'],
        emailConfig: ['ADM_EMAIL_CONFIG_VIEW'],
        specialHours: ['ADM_SPECIAL_HOURS_VIEW']
    },
    // Working calendar
    workingCalendar: {
        registerWorkingCalendar: ['HR_WORKING_CALENDAR_VIEW']
    },
    // Report
    reports: {
        root: [
            'RP_WER_MEMBER_VIEW',
            'RP_WER_PROJECT_VIEW',
            'RP_WER_PROJECT_DETAIL_VIEW',
            'RP_MER_SUM_VIEW',
            'RP_MER_PROJECT_VIEW',
            'RP_MER_MEMBER_VIEW',
            'RP_NONBILL_MEMBER_VIEW',
            'RP_NONBILL_CHART_VIEW',
            'RP_NONBILL_WARNING_MEMBER_VIEW',
            'RP_LPJ_LISTHC_VIEW',
            'RP_LPJ_PJP_VIEW',
            'RP_WCR_MC_VIEW',
            'RP_WCR_EFW_VIEW',
            'RP_MPC_SUM_VIEW',
            'RP_MPC_DBM_VIEW',
            'RP_MPC_MCD_VIEW',
            'SALE_MONTHLY_PRODUCTION_PERFORMANCE_VIEW',
            'SALE_SALE_LIST_REQUEST_VIEW',
            'SALE_SALE_LIST_SUPPLIER_VIEW',
            'SALE_SALEPIPELINE_SUMMARY_VIEW',
            'SALE_SALEPIPELINE_ONGOING_VIEW',
            'SALE_SALEPIPELINE_BIDDING_VIEW',
            'SALE_SALEPIPELINE_BUDGETING_VIEW',
            'SKILL_MANAGE_SKILL_UPDATE_VIEW',
            'SKILL_MANAGE_SKILL_REPORT_VIEW'
        ],
        weeklyEffort: {
            root: ['RP_WER_MEMBER_VIEW', 'RP_WER_PROJECT_VIEW', 'RP_WER_PROJECT_DETAIL_VIEW'],
            member: ['RP_WER_MEMBER_VIEW'],
            project: ['RP_WER_PROJECT_VIEW'],
            projectDetail: ['RP_WER_PROJECT_DETAIL_VIEW']
        },
        monthlyEffort: {
            root: ['RP_MER_SUM_VIEW', 'RP_MER_PROJECT_VIEW', 'RP_MER_MEMBER_VIEW'],
            summary: ['RP_MER_SUM_VIEW'],
            project: ['RP_MER_PROJECT_VIEW'],
            member: ['RP_MER_MEMBER_VIEW']
        },
        nonBillable: {
            root: ['RP_NONBILL_MEMBER_VIEW', 'RP_NONBILL_CHART_VIEW', 'RP_NONBILL_WARNING_MEMBER_VIEW'],
            nonBillMember: ['RP_NONBILL_MEMBER_VIEW', 'RP_NONBILL_WARNING_MEMBER_VIEW'],
            nonBillChart: ['RP_NONBILL_CHART_VIEW']
        },
        listProjectTeam: ['RP_LPJ_LISTHC_VIEW', 'RP_LPJ_PJP_VIEW'],
        costMonitoring: { root: ['RP_WCR_MC_VIEW', 'RP_WCR_EFW_VIEW'], monthlyCost: ['RP_WCR_MC_VIEW'], weeklyCost: ['RP_WCR_EFW_VIEW'] },
        monthlyProjectCost: {
            root: ['RP_MPC_SUM_VIEW', 'RP_MPC_DBM_VIEW', 'RP_MPC_MCD_VIEW'],
            summary: ['RP_MPC_SUM_VIEW'],
            detailByMonth: ['RP_MPC_DBM_VIEW'],
            monthlyCost: ['RP_MPC_MCD_VIEW']
        },
        skillManage: {
            root: ['SKILL_MANAGE_SKILL_UPDATE_VIEW', 'SKILL_MANAGE_SKILL_REPORT_VIEW'],
            skillsUpdate: ['SKILL_MANAGE_SKILL_UPDATE_VIEW'],
            skillsReport: ['SKILL_MANAGE_SKILL_REPORT_VIEW']
        }
    },
    // Sale
    sale: {
        root: [
            'SALE_MONTHLY_PRODUCTION_PERFORMANCE_VIEW',
            'SALE_SALE_LIST_REQUEST_VIEW',
            'SALE_SALE_LIST_SUPPLIER_VIEW',
            'SALE_SALEPIPELINE_SUMMARY_VIEW',
            'SALE_SALEPIPELINE_ONGOING_VIEW',
            'SALE_SALEPIPELINE_BIDDING_VIEW',
            'SALE_SALEPIPELINE_BUDGETING_VIEW'
        ],
        saleLead: ['SALE_SALE_LIST_REQUEST_VIEW', 'SALE_SALE_LIST_SUPPLIER_VIEW'],
        monthlyProductionPerformance: ['SALE_MONTHLY_PRODUCTION_PERFORMANCE_VIEW'],
        salePipeline: {
            root: [
                'SALE_SALEPIPELINE_SUMMARY_VIEW',
                'SALE_SALEPIPELINE_ONGOING_VIEW',
                'SALE_SALEPIPELINE_BIDDING_VIEW',
                'SALE_SALEPIPELINE_BUDGETING_VIEW'
            ],
            summary: ['SALE_SALEPIPELINE_SUMMARY_VIEW'],
            onGoing: ['SALE_SALEPIPELINE_ONGOING_VIEW'],
            bidding: ['SALE_SALEPIPELINE_BIDDING_VIEW'],
            budget: ['SALE_SALEPIPELINE_BUDGETING_VIEW']
        }
    }
};
