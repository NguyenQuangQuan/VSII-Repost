const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH'
};

const Api = {
    auth: {
        login: {
            method: METHOD.POST,
            url: 'authen',
            dontNeedToken: true
        },
        refreshToken: {
            method: METHOD.POST,
            url: 'refreshToken',
            dontNeedToken: true
        },
        getUserInfo: {
            method: METHOD.GET,
            url: 'me',
            dontNeedToken: false
        }
    },
    master: {
        getAllTitle: {
            method: METHOD.GET,
            url: 'master/titleAll',
            dontNeedToken: false
        },
        getAllRank: {
            method: METHOD.GET,
            url: 'master/rankAll',
            dontNeedToken: false
        },
        getAllGroup: {
            method: METHOD.GET,
            url: 'master/groupAll',
            dontNeedToken: false
        },
        getProjectType: {
            method: METHOD.GET,
            url: 'master/projectTypeAll',
            dontNeedToken: false
        },
        findAllUserLoginTime: {
            method: METHOD.GET,
            url: 'master/findUserLogtime',
            dontNeedToken: false
        },
        getFunctionAll: {
            method: METHOD.GET,
            url: 'master/functionAll',
            dontNeedToken: false
        },
        getProductionPerformanceAll: {
            method: METHOD.GET,
            url: 'master/productionPerformanceAllVND',
            dontNeedToken: false
        },
        getAllLanguage: {
            method: METHOD.GET,
            url: 'master/languageAll',
            dontNeedToken: false
        }
    },
    synchronize: {
        getDownloadTemplate: {
            method: METHOD.GET,
            url: 'master/excel/download',
            dontNeedToken: false
        },
        postImportExcel: {
            method: METHOD.POST,
            url: 'sync/manual/import/excel',
            dontNeedToken: false
        }
    },
    weekly_efford: {
        getMember: {
            method: METHOD.GET,
            url: 'week/member',
            dontNeedToken: false
        },
        getProject: {
            method: METHOD.GET,
            url: 'week/project',
            dontNeedToken: false
        },
        getProjectDetail: {
            method: METHOD.GET,
            url: 'week/projectDetail',
            dontNeedToken: false
        },
        postVerified: {
            method: METHOD.POST,
            url: 'week/projectDetailVerified',
            dontNeedToken: false
        },
        getDownload: {
            method: METHOD.GET,
            url: 'week/download',
            dontNeedToken: false
        }
    },
    monthly_efford: {
        postUpdateEffordPlan: {
            method: METHOD.POST,
            url: 'month/saveOrUpdateEffortPlan',
            dontNeedToken: false
        },
        getSummary: {
            method: METHOD.GET,
            url: 'month/summary',
            dontNeedToken: false
        },
        getProject: {
            method: METHOD.GET,
            url: 'month/project',
            dontNeedToken: false
        },
        getMember: {
            method: METHOD.GET,
            url: 'month/member',
            dontNeedToken: false
        },
        getMemberProject: {
            method: METHOD.GET,
            url: 'month/memberProject',
            dontNeedToken: false
        },
        getDownload: {
            method: METHOD.GET,
            url: 'month/download',
            dontNeedToken: false
        }
    },
    list_project_team: {
        getListProjectTeam: {
            method: METHOD.GET,
            url: 'project/team',
            dontNeedToken: false
        },
        getRatioJoiningProject: {
            method: METHOD.GET,
            url: 'project/ratio/join',
            dontNeedToken: false
        },
        getDownload: {
            method: METHOD.GET,
            url: 'project/download',
            dontNeedToken: false
        }
    },
    non_billable_monitoring: {
        getAll: {
            method: METHOD.GET,
            url: 'nonbill/nonBillAble',
            dontNeedToken: false
        },
        getDownload: {
            method: METHOD.GET,
            url: 'nonbill/download',
            dontNeedToken: false
        },
        getCostByWeek: {
            method: METHOD.GET,
            url: 'nonbill/costByWeek',
            dontNeedToken: false
        },
        getWarningNonbillable: {
            method: METHOD.GET,
            url: 'nonbill/warningNonbillable',
            dontNeedToken: false
        }
    },
    monthly_project_cost: {
        getSummary: {
            method: METHOD.GET,
            url: 'monthlyProjectCost/summary',
            dontNeedToken: false
        },
        getDownload: {
            method: METHOD.GET,
            url: 'monthlyProjectCost/download',
            dontNeedToken: false
        },
        getDetailReportByMonth: {
            method: METHOD.GET,
            url: 'monthlyProjectCost/detailMonth',
            dontNeedToken: false
        },
        getMonthlyCost: {
            method: METHOD.GET,
            url: 'monthlyProjectCost/monthlyCost',
            dontNeedToken: false
        },
        getFindProjectCost: {
            method: METHOD.GET,
            url: 'monthlyProjectCost/findProjectCost',
            dontNeedToken: false
        },
        getDownloadTemplateMonthlyCost: {
            method: METHOD.GET,
            url: 'monthlyProjectCost/downloadTemplate',
            dontNeedToken: false
        },
        postImportTemplateMonthlyCost: {
            method: METHOD.POST,
            url: 'monthlyProjectCost/importTemplate',
            upload: true,
            dontNeedToken: false
        },
        postSaveOrUpdateActualCost: {
            method: METHOD.POST,
            url: 'monthlyProjectCost/saveOrUpdateActualCost',
            dontNeedToken: false
        },
        deleteActualCost: {
            method: METHOD.DELETE,
            url: 'monthlyProjectCost/delete',
            dontNeedToken: false
        }
    },
    cost_monitoring: {
        getAll: {
            method: METHOD.GET,
            url: 'month/costMonitoring/index',
            dontNeedToken: false
        },
        getDownload: {
            method: METHOD.GET,
            url: 'month/costMonitoring/download',
            dontNeedToken: false
        },
        getEffortByWeek: {
            method: METHOD.GET,
            url: 'month/costMonitoring/effortByWeek',
            dontNeedToken: false
        }
    },
    member: {
        getAll: {
            method: METHOD.GET,
            url: 'user/findAllUser',
            dontNeedToken: false
        },
        postSaveOrUpdate: {
            method: METHOD.POST,
            url: 'user/saveOrUpdateUser',
            dontNeedToken: false
        }
    },
    department: {
        getAll: {
            method: METHOD.GET,
            url: 'getAllDepartment',
            dontNeedToken: false
        }
    },
    project: {
        getAll: {
            method: METHOD.GET,
            url: 'project/getAllProject',
            dontNeedToken: false
        },
        getDetail: {
            method: METHOD.GET,
            url: 'project/getInfoProjectDetail',
            dontNeedToken: false
        },
        getQuotaUpdateHistory: {
            method: METHOD.GET,
            url: 'project/getInfoProjectQuotaHistory',
            dontNeedToken: false
        },
        saveOrUpdate: {
            method: METHOD.POST,
            url: 'project/saveOrUpdate',
            dontNeedToken: false
        },
        saveOrUpdateProjectUser: {
            method: METHOD.POST,
            url: 'project/saveOrUpdateProjectUser',
            dontNeedToken: false
        },
        deleteProjectUser: {
            method: METHOD.DELETE,
            url: 'project/deleteProjectUser',
            dontNeedToken: false
        },
        getDownload: {
            method: METHOD.GET,
            url: 'project/export',
            dontNeedToken: false
        }
    },
    special_hours: {
        getAll: {
            method: METHOD.GET,
            url: 'special/getAllSpecialHour',
            dontNeedToken: false
        },
        postSaveOrUpdateSpecialHours: {
            method: METHOD.POST,
            url: 'special/saveOrUpdate',
            dontNeedToken: false
        }
    },
    system_config: {
        getAll: {
            method: METHOD.GET,
            url: 'master/systemConfigAll',
            dontNeedToken: false
        },
        postUpdateConfig: {
            method: METHOD.POST,
            url: 'systemConfig/saveOrUpdate',
            dontNeedToken: false
        }
    },
    email_config: {
        getAll: {
            method: METHOD.GET,
            url: 'master/emailConfigAll',
            dontNeedToken: false
        },
        postSaveOrUpdateEmailConfig: {
            method: METHOD.POST,
            url: 'email/saveOrUpdate',
            dontNeedToken: false
        }
    },
    holiday: {
        getAll: {
            method: METHOD.GET,
            url: 'holiday/getAll',
            dontNeedToken: false
        },
        postSaveOrUpdateHoliday: {
            method: METHOD.POST,
            url: 'holiday/saveOrUpdate',
            dontNeedToken: false
        },
        delete: {
            method: METHOD.DELETE,
            url: 'holiday/delete',
            dontNeedToken: false
        }
    },
    rank: {
        getAll: {
            method: METHOD.GET,
            url: 'rank/rankAll',
            dontNeedToken: false
        },
        postUpdateRank: {
            method: METHOD.POST,
            url: 'rank/createOrUpdateRank',
            dontNeedToken: false
        }
    },
    group: {
        getAll: {
            method: METHOD.GET,
            url: 'group/getGroupAll',
            dontNeedToken: false
        },
        postSaveOrUpdate: {
            method: METHOD.POST,
            url: 'group/saveOrUpdate',
            dontNeedToken: false
        }
    },
    sale_productivity: {
        getAll: {
            method: METHOD.GET,
            url: 'sales/productivityProject',
            dontNeedToken: false
        },
        getDetail: {
            method: METHOD.GET,
            url: 'sales/productivityProject/getDetail',
            dontNeedToken: false
        },
        postCreateOrUpdate: {
            method: METHOD.POST,
            url: 'sales/productivityProject/createOrUpdate',
            dontNeedToken: false
        },
        delete: {
            method: METHOD.DELETE,
            url: 'sales/productivityProject/delete',
            dontNeedToken: false
        },
        getDownload: {
            method: METHOD.GET,
            url: 'sales/productivityProject/download',
            dontNeedToken: false
        },
        postUpdateHeadCount: {
            method: METHOD.POST,
            url: 'sales/productivityProject/updateHeadcount',
            dontNeedToken: false
        },
        getDetailHeadCountByMonth: {
            method: METHOD.GET,
            url: 'sales/productivityProject/findHeadcount',
            dontNeedToken: false
        },
        postComment: {
            method: METHOD.POST,
            url: 'sales/productivityProject/comment',
            dontNeedToken: false
        },
        getStandardWorkingDay: {
            method: METHOD.GET,
            url: 'sales/productivityProject/standardWorkingDay',
            dontNeedToken: false
        },
        getExchangeRate: {
            method: METHOD.GET,
            url: 'sales/productivityProject/exchangeRate',
            dontNeedToken: false
        },
        getExchangeRateVND: {
            method: METHOD.GET,
            url: 'sales/productivityProject/convertExchangeVND',
            dontNeedToken: false
        }
    },
    comment: {
        getFindComment: {
            method: METHOD.GET,
            url: 'comment/findComment',
            dontNeedToken: false
        },
        postSaveOrUpdateComment: {
            method: METHOD.POST,
            url: 'comment/saveOrUpdate',
            dontNeedToken: false
        },
        getFindCommentDetail: {
            method: METHOD.GET,
            url: 'commentDetail/findComment',
            dontNeedToken: false
        },
        postSaveOrUpdateCommentDetail: {
            method: METHOD.POST,
            url: 'commentDetail/saveOrUpdate',
            dontNeedToken: false
        }
    },
    sale_list: {
        getRequestAll: {
            method: METHOD.GET,
            url: 'sales/list/requests/getAll',
            dontNeedToken: false
        },
        getSupplierAll: {
            method: METHOD.GET,
            url: 'sales/list/supplier/getAll',
            dontNeedToken: false
        },
        postRequestsCreateOrUpdate: {
            method: METHOD.POST,
            url: 'sales/list/requests/createOrUpdate',
            dontNeedToken: false
        },
        deleteRequests: (id: string) => ({
            method: METHOD.DELETE,
            url: `sales/list/requests/delete?id=${id}`,
            dontNeedToken: false
        }),
        getDownload: {
            method: METHOD.GET,
            url: 'sales/list/download',
            dontNeedToken: false
        },
        postSupplierCreateOrUpdate: {
            method: METHOD.POST,
            url: 'sales/list/supplier/createOrUpdate',
            dontNeedToken: false
        },
        deleteSupplier: (id: string) => ({
            method: METHOD.DELETE,
            url: `sales/list/supplier/delete?id=${id}`,
            dontNeedToken: false
        }),
        getSaleSummary: {
            method: METHOD.GET,
            url: 'sales/summary',
            dontNeedToken: false
        },
        getDownloadSalePineLine: {
            method: METHOD.GET,
            url: 'sales/download',
            dontNeedToken: false
        }
    },
    working_calendar: {
        getAll: {
            method: METHOD.GET,
            url: 'calendar/filterWorkingCalender',
            dontNeedToken: false
        },
        getType: {
            method: METHOD.GET,
            url: 'calendar/getTypeWorkingCalendar',
            dontNeedToken: false
        },
        postSaveOrUpdate: {
            method: METHOD.POST,
            url: 'calendar/saveOrUpdate',
            dontNeedToken: false
        },
        getDownload: {
            method: METHOD.GET,
            url: 'calendar/download',
            dontNeedToken: false
        },
        postUpdateStatus: {
            method: METHOD.POST,
            url: 'calendar/updateStatus',
            dontNeedToken: false
        },
        getClosingDate: {
            method: METHOD.GET,
            url: 'calendar/closing-dates',
            dontNeedToken: false
        },
        postUpdateClosingDate: {
            method: METHOD.POST,
            url: 'calendar/closing-date/update',
            dontNeedToken: false
        },
        postVerifyClosingDate: {
            method: METHOD.POST,
            url: 'calendar/closing-date/verify',
            dontNeedToken: false
        }
    },
    sale_pipeline_on_going: {
        getAll: {
            method: METHOD.GET,
            url: 'sales/onGoing',
            dontNeedToken: false
        },
        saveOrUpdate: {
            method: METHOD.POST,
            url: 'sales/onGoing/saveOrUpdate',
            dontNeedToken: false
        },
        delete: {
            method: METHOD.DELETE,
            url: 'sales/onGoing/delete',
            dontNeedToken: false
        }
    },
    sale_pipe_line_bidding: {
        getBidding: {
            method: METHOD.GET,
            url: 'sales/sale-bidding/binding',
            dontNeedToken: false
        },
        getMonthlyBillable: {
            method: METHOD.GET,
            url: 'sales/sale-bidding/monthlyBillable',
            dontNeedToken: false
        },
        postAddOrEditBidding: {
            method: METHOD.POST,
            url: 'sales/sale-bidding/createOrUpdate'
        },
        deleteBidding: {
            method: METHOD.DELETE,
            url: 'sales/sale-bidding/delete',
            dontNeedToken: false
        }
    },
    budgeting_plan: {
        getAll: {
            method: METHOD.GET,
            url: 'sales/budgeting-plan',
            dontNeedToken: false
        },
        editBudgetingPlan: {
            method: METHOD.POST,
            url: 'sales/budgeting-plan/saveOrUpdate',
            dontNeedToken: false
        }
    },
    skills_manage: {
        getReport: {
            method: METHOD.GET,
            url: 'skill/report',
            dontNeedToken: false
        },
        getDownload: {
            method: METHOD.GET,
            url: 'skill/report/download',
            dontNeedToken: false
        },
        getTitleCodes: {
            method: METHOD.GET,
            url: 'master/titleAll',
            dontNeedToken: false
        },
        getTechAll: {
            method: METHOD.GET,
            url: 'master/techAll'
        },
        getSkillsUpdate: {
            method: METHOD.GET,
            url: 'skill/skillsUpdate',
            dontNeedToken: false
        },
        getDetailCv: {
            method: METHOD.GET,
            url: 'skill/skillsUpdate/getDetail',
            dontNeedToken: false
        },
        getReferences: {
            method: METHOD.GET,
            url: 'skill/skillsUpdate/references',
            dontNeedToken: false
        },
        getTechnologies: {
            method: METHOD.GET,
            url: 'skill/skillsUpdate/technologyAll',
            dontNeedToken: false
        },
        getSkillByTechnology: {
            method: METHOD.GET,
            url: 'skill/skillsUpdate/skillByTech',
            dontNeedToken: false
        },
        createSkillsUpdate: {
            method: METHOD.POST,
            url: 'skill/skillsUpdate/create',
            dontNeedToken: false
        },
        updateCV: {
            method: METHOD.PATCH,
            url: 'skill/skillsUpdate/update',
            dontNeedToken: false
        },
        viewPDF: {
            method: METHOD.GET,
            url: 'skill/skillsUpdate/viewPdf',
            dontNeedToken: false
        },
        downloadCV: {
            method: METHOD.GET,
            url: 'skill/skillsUpdate/download',
            dontNeedToken: false
        }
    }
};

export default Api;
