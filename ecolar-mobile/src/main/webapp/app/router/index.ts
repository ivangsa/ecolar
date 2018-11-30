import Vue from 'vue';
import Router from 'vue-router';
const Home = () => import('../components/home/Home.vue');
const Register = () => import('../components/account/register/Register.vue');
const ResetPassword = () => import('../components/account/reset-password/ResetPassword.vue');
const ChangePassword = () => import('../components/account/change-password/ChangePassword.vue');
const Sessions = () => import('../components/account/sessions/Sessions.vue');
const Settings = () => import('../components/account/settings/Settings.vue');
const EcoConfigurationComponent = () => import('../components/admin/configuration/Configuration.vue');
const EcoDocsComponent = () => import('../components/admin/docs/Docs.vue');
const EcoHealthComponent = () => import('../components/admin/health/Health.vue');
const EcoLogsComponent = () => import('../components/admin/logs/Logs.vue');
const EcoAuditsComponent = () => import('../components/admin/audits/Audits.vue');
const EcoMetricsComponent = () => import('../components/admin/metrics/Metrics.vue');
const EcoUserManagementComponent = () => import('../components/admin/user-management/UserManagement.vue');
const EcoUserManagementViewComponent = () => import('../components/admin/user-management/UserManagementView.vue');
const EcoUserManagementEditComponent = () => import('../components/admin/user-management/UserManagementEdit.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/resetPassword',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/account/password',
      name: 'ChangePassword',
      component: ChangePassword
    },
    {
      path: '/account/sessions',
      name: 'Sessions',
      component: Sessions
    },
    {
      path: '/account/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/admin/user-management',
      name: 'EcoUser',
      component: EcoUserManagementComponent
    },
    {
      path: '/admin/user-management/new',
      name: 'EcoUserCreate',
      component: EcoUserManagementEditComponent
    },
    {
      path: '/admin/user-management/:userId/edit',
      name: 'EcoUserEdit',
      component: EcoUserManagementEditComponent
    },
    {
      path: '/admin/user-management/:userId/view',
      name: 'EcoUserView',
      component: EcoUserManagementViewComponent
    },
    {
      path: '/admin/docs',
      name: 'EcoDocsComponent',
      component: EcoDocsComponent
    },
    {
      path: '/admin/audits',
      name: 'EcoAuditsComponent',
      component: EcoAuditsComponent
    },
    {
      path: '/admin/eco-health',
      name: 'EcoHealthComponent',
      component: EcoHealthComponent
    },
    {
      path: '/admin/logs',
      name: 'EcoLogsComponent',
      component: EcoLogsComponent
    },
    {
      path: '/admin/eco-metrics',
      name: 'EcoMetricsComponent',
      component: EcoMetricsComponent
    },
    {
      path: '/admin/eco-configuration',
      name: 'EcoConfigurationComponent',
      component: EcoConfigurationComponent
    }
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ]
});
