import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// Project imports
import { ROUTER } from 'constants/Routers';
import { MAIN_FUNCTIONS } from 'constants/Permission';

/** Layout */
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

/** Guard Routes */
import AuthGuard from 'utils/route-guard/AuthGuard';
import GuestGuard from 'utils/route-guard/GuestGuard';
import NotFound from 'utils/route-guard/NotFound';

/** Public Routes */
const AuthLogin = Loadable(lazy(() => import('pages/Login')));

/** Private Routes */

// Dasboard
const Dashboard = Loadable(lazy(() => import('pages/Dashboard')));

// Administration
const User = Loadable(lazy(() => import('pages/administration/User')));
const Project = Loadable(lazy(() => import('pages/administration/Project')));
const Holiday = Loadable(lazy(() => import('pages/administration/Holiday')));
const SpecialHours = Loadable(lazy(() => import('pages/administration/SpecialHours')));
const Group = Loadable(lazy(() => import('pages/administration/Group')));
const Rank = Loadable(lazy(() => import('pages/administration/Rank')));
const SystemConfig = Loadable(lazy(() => import('pages/administration/SystemConfig')));
const EmailConfig = Loadable(lazy(() => import('pages/administration/EmailConfig')));

// Working calendar
const RegisterWorkingCalendar = Loadable(lazy(() => import('pages/register-working-calendar/RegisterWorkingCalendar')));

// Report
const WeeklyEffort = Loadable(lazy(() => import('pages/WeeklyEffort')));
const MonthlyEffortSummary = Loadable(lazy(() => import('pages/monthly-effort/Summary')));
const MonthlyEffortProject = Loadable(lazy(() => import('pages/monthly-effort/Project')));
const MonthlyEffortDepartmentMember = Loadable(lazy(() => import('pages/monthly-effort/DepartmentMember')));
const ProjectTeam = Loadable(lazy(() => import('pages/ListProjectTeam')));
const MonthlyCostMonitoring = Loadable(lazy(() => import('pages/cost-monitoring/MonthlyCostMonitoring')));
const WeeklyCostMonitoring = Loadable(lazy(() => import('pages/cost-monitoring/WeeklyCostMonitoring')));
const MonthlyProjectCostSummary = Loadable(lazy(() => import('pages/monthly-project-cost/Summary')));
const DetailReportByMonth = Loadable(lazy(() => import('pages/monthly-project-cost/DetailReportByMonth')));
const MonthlyCostData = Loadable(lazy(() => import('pages/monthly-project-cost/MonthlyCostData')));
const NonBillByMember = Loadable(lazy(() => import('pages/non-billable-monitoring/NonBillByMember')));
const NonbillCostByWeek = Loadable(lazy(() => import('pages/non-billable-monitoring/NonbillCostByWeek')));

// Skills
const SkillsUpdate = Loadable(lazy(() => import('pages/skills-manage/SkillsUpdate')));
const SkillsReport = Loadable(lazy(() => import('pages/skills-manage/SkillsReport')));
const CV = Loadable(lazy(() => import('pages/skills-manage/CV')));

// Sale report
const MonthlyProductionPerformance = Loadable(lazy(() => import('pages/sales/MonthlyProductionPerformance')));
const SalesLead = Loadable(lazy(() => import('pages/sales/SalesLead')));

// Sale pipeline
const SalePipelineSummary = Loadable(lazy(() => import('pages/sales/Summary')));
const OnGoing = Loadable(lazy(() => import('pages/sales/OnGoing')));
const Bidding = Loadable(lazy(() => import('pages/sales/Bidding')));
const BudgetingPlan = Loadable(lazy(() => import('pages/sales/BudgetingPlan')));

// ==============================|| MAIN ROUTES RENDER ||============================== //

const MainRoutes = () => (
    <Routes>
        {/** Protected Routes */}
        {/** Wrap all Route under AuthGuard element */}
        <Route path={ROUTER.home.index} element={<AuthGuard />}>
            <Route path={ROUTER.home.index} element={<MainLayout />}>
                {/* ================== Dashboard ================== */}
                <Route path={ROUTER.home.index} element={<Dashboard />} />

                {/* ======================== ADMINISTRATION ======================== */}

                {/* ================== Manage user ================== */}
                <Route path={ROUTER.administration.manage_user} element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.admin.user} />}>
                    <Route index element={<User />} />
                </Route>

                {/* ================== Manage project ================== */}
                <Route
                    path={ROUTER.administration.manage_project}
                    element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.admin.project} />}
                >
                    <Route index element={<Project />} />
                </Route>

                {/* ================== Manage holidays ================== */}
                <Route
                    path={ROUTER.administration.manage_holiday}
                    element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.admin.holidays} />}
                >
                    <Route index element={<Holiday />} />
                </Route>

                {/* ================== Manage holidays ================== */}
                <Route
                    path={ROUTER.administration.manage_special_hours}
                    element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.admin.specialHours} />}
                >
                    <Route index element={<SpecialHours />} />
                </Route>

                {/* ================== System config ================== */}
                <Route
                    path={ROUTER.administration.system_config}
                    element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.admin.systemConfig} />}
                >
                    <Route index element={<SystemConfig />} />
                </Route>

                {/* ================== Email config ================== */}
                <Route
                    path={ROUTER.administration.email_config}
                    element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.admin.emailConfig} />}
                >
                    <Route index element={<EmailConfig />} />
                </Route>

                {/* ================== Manage group ================== */}
                <Route path={ROUTER.administration.manage_group} element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.admin.group} />}>
                    <Route index element={<Group />} />
                </Route>

                {/* ================== Manage rank ================== */}
                <Route path={ROUTER.administration.manage_rank} element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.admin.rank} />}>
                    <Route index element={<Rank />} />
                </Route>

                {/* ================== Manage special hours ================== */}
                <Route
                    path={ROUTER.administration.manage_special_hours}
                    element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.admin.specialHours} />}
                >
                    <Route index element={<SpecialHours />} />
                </Route>

                {/* ======================== Working Calendar ======================== */}

                {/* ================== Register working calendar ================== */}
                <Route element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.workingCalendar.registerWorkingCalendar} />}>
                    <Route path={ROUTER.workingCalendar.register_working_calendar} element={<RegisterWorkingCalendar />} />
                </Route>

                {/* ======================== REPORTS ======================== */}

                {/* ================== Weekly effort ================== */}
                <Route element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.reports.weeklyEffort.root} />}>
                    <Route path={ROUTER.reports.weekly_effort} element={<WeeklyEffort />} />
                </Route>

                {/* ================== Monthly effort ================== */}
                <Route
                    path={ROUTER.reports.monthly_effort.index}
                    element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.reports.monthlyEffort.root} />}
                >
                    {/* ================== Summary ================== */}
                    <Route element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.reports.monthlyEffort.summary} />}>
                        <Route index element={<Navigate replace to={ROUTER.reports.monthly_effort.summary} />} />
                        <Route path={ROUTER.reports.monthly_effort.summary} element={<MonthlyEffortSummary />} />
                    </Route>

                    {/* ================== Project ================== */}
                    <Route element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.reports.monthlyEffort.project} />}>
                        <Route path={ROUTER.reports.monthly_effort.project} element={<MonthlyEffortProject />} />
                    </Route>

                    {/* ================== Department member ================== */}
                    <Route element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.reports.monthlyEffort.member} />}>
                        <Route path={ROUTER.reports.monthly_effort.department_member} element={<MonthlyEffortDepartmentMember />} />
                    </Route>
                </Route>

                {/* ================== Non-billable ================== */}
                <Route
                    path={ROUTER.reports.non_billable_monitoring.index}
                    element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.reports.nonBillable.root} />}
                >
                    {/* ================== By member ================== */}
                    <Route element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.reports.nonBillable.nonBillMember} />}>
                        <Route index element={<Navigate replace to={ROUTER.reports.non_billable_monitoring.non_billable_by_member} />} />
                        <Route path={ROUTER.reports.non_billable_monitoring.non_billable_by_member} element={<NonBillByMember />} />
                    </Route>

                    {/* ================== Cost by keek ================== */}
                    <Route
                        path={ROUTER.reports.non_billable_monitoring.non_billable_cost_by_week}
                        element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.reports.nonBillable.nonBillChart} />}
                    >
                        <Route index element={<NonbillCostByWeek />} />
                    </Route>
                </Route>

                {/* ================== List project team ================== */}
                <Route element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.reports.listProjectTeam} />}>
                    <Route path={ROUTER.reports.list_project_team} element={<ProjectTeam />} />
                </Route>

                {/* ================== Cost monitoring ================== */}
                <Route
                    path={ROUTER.reports.cost_monitoring.index}
                    element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.reports.costMonitoring.root} />}
                >
                    {/* ========= Weekly cost ========= */}
                    <Route element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.reports.costMonitoring.weeklyCost} />}>
                        <Route path={ROUTER.reports.cost_monitoring.weekly_cost} element={<WeeklyCostMonitoring />} />
                    </Route>

                    {/* ========= Monthly cost ========= */}
                    <Route element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.reports.costMonitoring.monthlyCost} />}>
                        <Route index element={<Navigate replace to={ROUTER.reports.cost_monitoring.monthly_cost} />} />
                        <Route path={ROUTER.reports.cost_monitoring.monthly_cost} element={<MonthlyCostMonitoring />} />
                    </Route>
                </Route>

                {/* ================== Monthly project cost ================== */}
                <Route
                    path={ROUTER.reports.monthly_project_cost.index}
                    element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.reports.monthlyProjectCost.root} />}
                >
                    {/* ========= Summary ========= */}
                    <Route element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.reports.monthlyProjectCost.summary} />}>
                        <Route index element={<Navigate replace to={ROUTER.reports.monthly_project_cost.summary} />} />
                        <Route path={ROUTER.reports.monthly_project_cost.summary} element={<MonthlyProjectCostSummary />} />
                    </Route>

                    {/* ========= Detail report by month ========= */}
                    <Route element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.reports.monthlyProjectCost.detailByMonth} />}>
                        <Route path={ROUTER.reports.monthly_project_cost.detail_report_by_month} element={<DetailReportByMonth />} />
                    </Route>

                    {/* ========= Monthly cost data ========= */}
                    <Route element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.reports.monthlyProjectCost.monthlyCost} />}>
                        <Route path={ROUTER.reports.monthly_project_cost.monthly_cost_data} element={<MonthlyCostData />} />
                    </Route>
                </Route>

                {/* ================== Skills manage ================== */}
                <Route
                    path={ROUTER.reports.skills_manage.index}
                    element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.reports.skillManage.root} />}
                >
                    {/* ========= Skills update ========= */}
                    <Route element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.reports.skillManage.skillsUpdate} />}>
                        <Route index element={<Navigate replace to={ROUTER.reports.skills_manage.skills_update} />} />
                        <Route path={ROUTER.reports.skills_manage.skills_update} element={<SkillsUpdate />} />
                    </Route>
                    <Route
                        path={ROUTER.reports.skills_manage.skills_update}
                        element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.reports.skillManage.skillsUpdate} />}
                    >
                        <Route path={ROUTER.reports.skills_manage.cv} element={<CV />} />
                    </Route>
                    {/* ========= Skills report ========= */}
                    <Route element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.reports.skillManage.skillsReport} />}>
                        <Route path={ROUTER.reports.skills_manage.skills_report} element={<SkillsReport />} />
                    </Route>
                </Route>

                {/* ============= SALES REPORTS ============= */}
                <Route path={ROUTER.reports.sales.index} element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.sale.root} />}>
                    {/* ========= Monthly production performance ========= */}
                    <Route element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.sale.monthlyProductionPerformance} />}>
                        <Route index element={<Navigate replace to={ROUTER.reports.sales.monthly_production_performance} />} />
                        <Route path={ROUTER.reports.sales.monthly_production_performance} element={<MonthlyProductionPerformance />} />
                    </Route>

                    {/* ========= Sales lead ========= */}
                    <Route element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.sale.saleLead} />}>
                        <Route path={ROUTER.reports.sales.sales_lead} element={<SalesLead />} />
                    </Route>
                    {/* ========= Sales pipeline ========= */}
                    <Route
                        path={ROUTER.reports.sales.sales_pipeline.index}
                        element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.sale.salePipeline.root} />}
                    >
                        {/* ========= Summary ========= */}
                        <Route element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.sale.salePipeline.summary} />}>
                            <Route path={ROUTER.reports.sales.sales_pipeline.summary} element={<SalePipelineSummary />} />
                        </Route>
                        {/* ========= On Going ========= */}
                        <Route element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.sale.salePipeline.onGoing} />}>
                            <Route path={ROUTER.reports.sales.sales_pipeline.on_going} element={<OnGoing />} />
                        </Route>
                        {/* ========= Bidding ========= */}
                        <Route element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.sale.salePipeline.bidding} />}>
                            <Route path={ROUTER.reports.sales.sales_pipeline.bidding} element={<Bidding />} />
                        </Route>
                        {/* ========= BudgetingPlan ========= */}
                        <Route element={<AuthGuard permissionRequired={MAIN_FUNCTIONS.sale.salePipeline.budget} />}>
                            <Route path={ROUTER.reports.sales.sales_pipeline.budgeting_plan} element={<BudgetingPlan />} />
                        </Route>
                    </Route>
                </Route>
            </Route>
        </Route>

        {/** Public Routes */}
        {/** Wrap all Route under GuestGuard element */}
        <Route path={ROUTER.authentication.login} element={<GuestGuard />}>
            <Route index element={<AuthLogin />} />
        </Route>

        {/** Page not found route */}
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default MainRoutes;
