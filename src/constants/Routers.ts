export const ROUTER = {
    home: {
        index: '/'
    },
    authentication: {
        login: 'login'
    },
    administration: {
        manage_user: 'manage-user',
        manage_project: 'manage-project',
        manage_holiday: 'manage-holiday',
        manage_special_hours: 'manage-special-hours',
        manage_group: 'manage-group',
        system_config: 'system-config',
        manage_rank: 'manage-rank',
        email_config: 'email-config'
    },
    workingCalendar: {
        register_working_calendar: 'register-working-calendar'
    },
    reports: {
        weekly_effort: 'weekly-effort',
        monthly_effort: {
            index: 'monthly-effort',
            summary: 'summary',
            project: 'project',
            department_member: 'department-member'
        },
        non_billable_monitoring: {
            index: 'non-billable-monitoring',
            non_billable_by_member: 'non-billable-by-member',
            non_billable_cost_by_week: 'nonbill-ratio-chart'
        },
        list_project_team: 'list-project-team',
        cost_monitoring: {
            index: 'cost-monitoring',
            weekly_cost: 'weekly-monitoring',
            monthly_cost: 'monthly-monitoring'
        },
        monthly_project_cost: {
            index: 'monthly-project-cost',
            summary: 'summary',
            detail_report_by_month: 'detail-report-by-month',
            monthly_cost_data: 'monthly-cost-data'
        },
        sales: {
            index: 'sales',
            monthly_production_performance: 'monthly-production-performance',
            sales_lead: 'sales-lead',
            sales_pipeline: {
                index: 'sales-pipeline',
                summary: 'summary',
                on_going: 'on-going',
                bidding: 'bidding',
                budgeting_plan: 'budgeting-plan'
            }
        },
        skills_manage: {
            index: 'manage-skills',
            skills_update: 'skills-update',
            skills_report: 'skills-report',
            cv: 'cv'
        }
    }
};
