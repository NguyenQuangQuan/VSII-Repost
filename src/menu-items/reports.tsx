// third-party
import { FormattedMessage } from 'react-intl';

// project imports
import {
    WeeklyEffort,
    MonthlyEffort,
    ListProjectTeam,
    NonBillableMonitoring,
    MonthlyCostMonitoring,
    MonthlyProjectCost,
    MonthlyProductionPerformance,
    SaleList,
    ManageSkills
} from 'components/icons';
import { MAIN_FUNCTIONS } from 'constants/Permission';
import { ROUTER } from 'constants/Routers';
import { NavItemType } from 'types';

// constant
const icons = {
    WeeklyEffort,
    MonthlyEffort,
    ListProjectTeam,
    NonBillableMonitoring,
    MonthlyCostMonitoring,
    MonthlyProjectCost,
    MonthlyProductionPerformance,
    SaleList,
    ManageSkills
};

// ==============================|| EXTRA REPORTS MENU ITEMS ||============================== //

const reports: NavItemType = {
    id: 'reports',
    title: <FormattedMessage id="reports" />,
    type: 'group',
    access: MAIN_FUNCTIONS.reports.root,
    children: [
        // ============== Weekly Effort ==============
        {
            id: 'weekly-effort',
            title: <FormattedMessage id="weekly-effort" />,
            type: 'item',
            url: `/${ROUTER.reports.weekly_effort}`,
            icon: icons.WeeklyEffort,
            breadcrumbs: true,
            access: MAIN_FUNCTIONS.reports.weeklyEffort.root
        },
        // ============== Monthly Effort ==============
        {
            id: 'monthly-effort',
            title: <FormattedMessage id="monthly-effort" />,
            type: 'collapse',
            icon: icons.MonthlyEffort,
            access: MAIN_FUNCTIONS.reports.monthlyEffort.root,
            children: [
                {
                    id: 'summary',
                    title: <FormattedMessage id="monthly-effort-summary" />,
                    type: 'item',
                    url: `/${ROUTER.reports.monthly_effort.index}/${ROUTER.reports.monthly_effort.summary}`,
                    breadcrumbs: true,
                    access: MAIN_FUNCTIONS.reports.monthlyEffort.summary
                },
                {
                    id: 'project',
                    title: <FormattedMessage id="monthly-effort-project" />,
                    type: 'item',
                    url: `/${ROUTER.reports.monthly_effort.index}/${ROUTER.reports.monthly_effort.project}`,
                    breadcrumbs: true,
                    access: MAIN_FUNCTIONS.reports.monthlyEffort.project
                },
                {
                    id: 'department-member',
                    title: <FormattedMessage id="monthly-effort-department-member" />,
                    type: 'item',
                    url: `/${ROUTER.reports.monthly_effort.index}/${ROUTER.reports.monthly_effort.department_member}`,
                    breadcrumbs: true,
                    access: MAIN_FUNCTIONS.reports.monthlyEffort.member
                }
            ]
        },
        // ============== Non-billalbe Monitoring ==============
        {
            id: 'non-billable-monitoring',
            title: <FormattedMessage id="non-billable-monitoring" />,
            type: 'collapse',
            url: `/${ROUTER.reports.non_billable_monitoring}`,
            icon: icons.NonBillableMonitoring,
            breadcrumbs: true,
            access: MAIN_FUNCTIONS.reports.nonBillable.root,
            children: [
                {
                    id: 'non-billable-by-member',
                    title: <FormattedMessage id="non-billable-by-member" />,
                    type: 'item',
                    url: `/${ROUTER.reports.non_billable_monitoring.index}/${ROUTER.reports.non_billable_monitoring.non_billable_by_member}`,
                    breadcrumbs: true,
                    access: MAIN_FUNCTIONS.reports.nonBillable.nonBillMember
                },
                {
                    id: 'nonbill-ratio-chart',
                    title: <FormattedMessage id="nonbill-ratio-chart" />,
                    type: 'item',
                    url: `/${ROUTER.reports.non_billable_monitoring.index}/${ROUTER.reports.non_billable_monitoring.non_billable_cost_by_week}`,
                    breadcrumbs: true,
                    access: MAIN_FUNCTIONS.reports.nonBillable.nonBillChart
                }
            ]
        },
        // ============== List Project Team ==============
        {
            id: 'list-project-team',
            title: <FormattedMessage id="list-project-team" />,
            type: 'item',
            url: `/${ROUTER.reports.list_project_team}`,
            icon: icons.ListProjectTeam,
            breadcrumbs: true,
            access: MAIN_FUNCTIONS.reports.listProjectTeam
        },
        {
            id: 'cost-monitoring',
            title: <FormattedMessage id="cost-effort-monitoring" />,
            type: 'collapse',
            url: `/${ROUTER.reports.cost_monitoring}`,
            icon: icons.MonthlyCostMonitoring,
            breadcrumbs: true,
            access: MAIN_FUNCTIONS.reports.costMonitoring.root,
            children: [
                {
                    id: 'weekly-monitoring',
                    title: <FormattedMessage id="weekly-monitoring" />,
                    type: 'item',
                    url: `/${ROUTER.reports.cost_monitoring.index}/${ROUTER.reports.cost_monitoring.weekly_cost}`,
                    breadcrumbs: true,
                    access: MAIN_FUNCTIONS.reports.costMonitoring.weeklyCost
                },
                {
                    id: 'monthly-monitoring',
                    title: <FormattedMessage id="monthly-monitoring" />,
                    type: 'item',
                    url: `/${ROUTER.reports.cost_monitoring.index}/${ROUTER.reports.cost_monitoring.monthly_cost}`,
                    breadcrumbs: true,
                    access: MAIN_FUNCTIONS.reports.costMonitoring.monthlyCost
                }
            ]
        },
        // ============== Monthly Project Cost ==============
        {
            id: 'monthly-project-cost',
            title: <FormattedMessage id="monthly-project-cost" />,
            type: 'collapse',
            icon: icons.MonthlyProjectCost,
            access: MAIN_FUNCTIONS.reports.monthlyProjectCost.root,
            children: [
                {
                    id: 'summary',
                    title: <FormattedMessage id="monthly-project-cost-summary" />,
                    type: 'item',
                    url: `/${ROUTER.reports.monthly_project_cost.index}/${ROUTER.reports.monthly_project_cost.summary}`,
                    breadcrumbs: true,
                    access: MAIN_FUNCTIONS.reports.monthlyProjectCost.summary
                },
                {
                    id: 'detail-report-by-month',
                    title: <FormattedMessage id="detail-report-cost-by-month" />,
                    type: 'item',
                    url: `/${ROUTER.reports.monthly_project_cost.index}/${ROUTER.reports.monthly_project_cost.detail_report_by_month}`,
                    breadcrumbs: true,
                    access: MAIN_FUNCTIONS.reports.monthlyProjectCost.detailByMonth
                },
                {
                    id: 'monthly-cost-data',
                    title: <FormattedMessage id="monthly-cost-data" />,
                    type: 'item',
                    url: `/${ROUTER.reports.monthly_project_cost.index}/${ROUTER.reports.monthly_project_cost.monthly_cost_data}`,
                    breadcrumbs: true,
                    access: MAIN_FUNCTIONS.reports.monthlyProjectCost.monthlyCost
                }
            ]
        },
        // ============== Sales ==============
        {
            id: 'sales-report',
            title: <FormattedMessage id="sales-report" />,
            type: 'collapse',
            icon: icons.MonthlyProductionPerformance,
            access: MAIN_FUNCTIONS.sale.root,
            children: [
                {
                    id: 'monthly-production-performance',
                    title: <FormattedMessage id="monthly-production-performance" />,
                    type: 'item',
                    url: `/${ROUTER.reports.sales.index}/${ROUTER.reports.sales.monthly_production_performance}`,
                    breadcrumbs: true,
                    access: MAIN_FUNCTIONS.sale.monthlyProductionPerformance
                },
                {
                    id: 'sales-lead',
                    title: <FormattedMessage id="sales-lead" />,
                    type: 'item',
                    url: `/${ROUTER.reports.sales.index}/${ROUTER.reports.sales.sales_lead}`,
                    breadcrumbs: true,
                    access: MAIN_FUNCTIONS.sale.saleLead
                },
                {
                    id: 'sales-pipeline',
                    title: <FormattedMessage id="sales-pipeline" />,
                    type: 'collapse',
                    breadcrumbs: true,
                    access: MAIN_FUNCTIONS.sale.salePipeline.root,
                    children: [
                        {
                            id: 'summary',
                            title: <FormattedMessage id="summary" />,
                            type: 'item',
                            url: `/${ROUTER.reports.sales.index}/${ROUTER.reports.sales.sales_pipeline.index}/${ROUTER.reports.sales.sales_pipeline.summary}`,
                            access: MAIN_FUNCTIONS.sale.salePipeline.summary,
                            breadcrumbs: true
                        },
                        {
                            id: 'on-going',
                            title: <FormattedMessage id="on-going" />,
                            type: 'item',
                            url: `/${ROUTER.reports.sales.index}/${ROUTER.reports.sales.sales_pipeline.index}/${ROUTER.reports.sales.sales_pipeline.on_going}`,
                            access: MAIN_FUNCTIONS.sale.salePipeline.onGoing,
                            breadcrumbs: true
                        },
                        {
                            id: 'bidding',
                            title: <FormattedMessage id="bidding" />,
                            type: 'item',
                            url: `/${ROUTER.reports.sales.index}/${ROUTER.reports.sales.sales_pipeline.index}/${ROUTER.reports.sales.sales_pipeline.bidding}`,
                            access: MAIN_FUNCTIONS.sale.salePipeline.bidding,
                            breadcrumbs: true
                        },
                        {
                            id: 'budgeting-plan',
                            title: <FormattedMessage id="budgeting-plan" />,
                            type: 'item',
                            url: `/${ROUTER.reports.sales.index}/${ROUTER.reports.sales.sales_pipeline.index}/${ROUTER.reports.sales.sales_pipeline.budgeting_plan}`,
                            access: MAIN_FUNCTIONS.sale.salePipeline.budget,
                            breadcrumbs: true
                        }
                    ]
                }
            ]
        },
        // ============== Skill Manage ==============
        {
            id: 'manage-skills',
            title: <FormattedMessage id="manage-skills" />,
            type: 'collapse',
            access: MAIN_FUNCTIONS.reports.skillManage.root,
            icon: icons.ManageSkills,
            children: [
                {
                    id: 'skills-update',
                    title: <FormattedMessage id="skills-update" />,
                    type: 'item',
                    url: `/${ROUTER.reports.skills_manage.index}/${ROUTER.reports.skills_manage.skills_update}`,
                    access: MAIN_FUNCTIONS.reports.skillManage.skillsUpdate,
                    breadcrumbs: true
                },
                {
                    id: 'skills-report',
                    title: <FormattedMessage id="skills-report" />,
                    type: 'item',
                    url: `/${ROUTER.reports.skills_manage.index}/${ROUTER.reports.skills_manage.skills_report}`,
                    access: MAIN_FUNCTIONS.reports.skillManage.skillsReport,
                    breadcrumbs: true
                }
            ]
        }
    ]
};

export default reports;
