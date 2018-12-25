import Vue from 'vue';
import Component from 'vue-class-component';
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate' // for vue-router 2.2+
])
import Router from 'vue-router';
const Home = () => import('../core/home/home.vue');
const Register = () => import('../account/register/register.vue');
const ResetPassword = () => import('../account/reset-password/reset-password.vue');
const ChangePassword = () => import('../account/change-password/change-password.vue');
const Settings = () => import('../account/settings/settings.vue');
const EcoConfigurationComponent = () => import('../admin/configuration/configuration.vue');
const EcoDocsComponent = () => import('../admin/docs/docs.vue');
const EcoHealthComponent = () => import('../admin/health/health.vue');
const EcoLogsComponent = () => import('../admin/logs/logs.vue');
const EcoAuditsComponent = () => import('../admin/audits/audits.vue');
const EcoMetricsComponent = () => import('../admin/metrics/metrics.vue');
const EcoUserManagementComponent = () => import('../admin/user-management/user-management.vue');
const EcoUserManagementViewComponent = () => import('../admin/user-management/user-management-view.vue');
const EcoUserManagementEditComponent = () => import('../admin/user-management/user-management-edit.vue');
// // prettier-ignore
const HouseHolds = () => import('../ecolar/house-hold/house-holds.vue');
const HouseHoldDetails = () => import('../ecolar/house-hold/house-hold-details.vue');
const AddNewMovement = () => import('../ecolar/movement/add-movement.vue');
// // prettier-ignore
// const UserPreferences = () => import('../entities/user-preferences/user-preferences.vue');
// const UserPreferencesUpdate = () => import('../entities/user-preferences/user-preferences-update.vue');
// const UserPreferencesDetails = () => import('../entities/user-preferences/user-preferences-details.vue');
// // prettier-ignore
// const AccountCategories = () => import('../entities/account-categories/account-categories.vue');
// const AccountCategoriesUpdate = () => import('../entities/account-categories/account-categories-update.vue');
// const AccountCategoriesDetails = () => import('../entities/account-categories/account-categories-details.vue');
// // prettier-ignore
// const Category = () => import('../entities/category/category.vue');
// const CategoryUpdate = () => import('../entities/category/category-update.vue');
// const CategoryDetails = () => import('../entities/category/category-details.vue');
// // prettier-ignore
// const Movement = () => import('../entities/movement/movement.vue');
// const MovementUpdate = () => import('../entities/movement/movement-update.vue');
// const MovementDetails = () => import('../entities/movement/movement-details.vue');
// // prettier-ignore
// const MovementLine = () => import('../entities/movement-line/movement-line.vue');
// const MovementLineUpdate = () => import('../entities/movement-line/movement-line-update.vue');
// const MovementLineDetails = () => import('../entities/movement-line/movement-line-details.vue');
// // prettier-ignore
// const EAccount = () => import('../entities/e-account/e-account.vue');
// const EAccountUpdate = () => import('../entities/e-account/e-account-update.vue');
// const EAccountDetails = () => import('../entities/e-account/e-account-details.vue');
// prettier-ignore
const UserPreferences = () => import('../entities/user-preferences/user-preferences.vue');
const UserPreferencesUpdate = () => import('../entities/user-preferences/user-preferences-update.vue');
const UserPreferencesDetails = () => import('../entities/user-preferences/user-preferences-details.vue');
// prettier-ignore
const AccountCategories = () => import('../entities/account-categories/account-categories.vue');
const AccountCategoriesUpdate = () => import('../entities/account-categories/account-categories-update.vue');
const AccountCategoriesDetails = () => import('../entities/account-categories/account-categories-details.vue');
// prettier-ignore
const Category = () => import('../entities/category/category.vue');
const CategoryUpdate = () => import('../entities/category/category-update.vue');
const CategoryDetails = () => import('../entities/category/category-details.vue');
// prettier-ignore
const Movement = () => import('../entities/movement/movement.vue');
const MovementUpdate = () => import('../entities/movement/movement-update.vue');
const MovementDetails = () => import('../entities/movement/movement-details.vue');
// prettier-ignore
const MovementLine = () => import('../entities/movement-line/movement-line.vue');
const MovementLineUpdate = () => import('../entities/movement-line/movement-line-update.vue');
const MovementLineDetails = () => import('../entities/movement-line/movement-line-details.vue');
// prettier-ignore
const EAccount = () => import('../entities/e-account/e-account.vue');
const EAccountUpdate = () => import('../entities/e-account/e-account-update.vue');
const EAccountDetails = () => import('../entities/e-account/e-account-details.vue');
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
        // {
        //     path: '/account/sessions',
        //     name: 'Sessions',
        //     component: Sessions
        // },
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
        }, // prettier-ignore // prettier-ignore
        ,
        { path: '/entity/house-hold', name: 'HouseHolds', component: HouseHolds },
        { path: '/entity/house-hold/:houseHoldId/view', name: 'HouseHoldView', component: HouseHoldDetails }, // prettier-ignore
        { path: '/entity/house-hold/:houseHoldId/movement/new', name: 'AddNewMovement', component: AddNewMovement },
        // { path: '/entity/user-preferences', name: 'UserPreferences', component: UserPreferences },
        // { path: '/entity/user-preferences/new', name: 'UserPreferencesCreate', component: UserPreferencesUpdate },
        // { path: '/entity/user-preferences/:userPreferencesId/edit', name: 'UserPreferencesEdit', component: UserPreferencesUpdate },
        // { path: '/entity/user-preferences/:userPreferencesId/view', name: 'UserPreferencesView', component: UserPreferencesDetails }, // prettier-ignore
        // { path: '/entity/account-categories', name: 'AccountCategories', component: AccountCategories },
        // { path: '/entity/account-categories/new', name: 'AccountCategoriesCreate', component: AccountCategoriesUpdate },
        // { path: '/entity/account-categories/:accountCategoriesId/edit', name: 'AccountCategoriesEdit', component: AccountCategoriesUpdate },
        // { path: '/entity/account-categories/:accountCategoriesId/view', name: 'AccountCategoriesView', component: AccountCategoriesDetails }, // prettier-ignore
        // { path: '/entity/category', name: 'Category', component: Category },
        // { path: '/entity/category/new', name: 'CategoryCreate', component: CategoryUpdate },
        // { path: '/entity/category/:categoryId/edit', name: 'CategoryEdit', component: CategoryUpdate },
        // { path: '/entity/category/:categoryId/view', name: 'CategoryView', component: CategoryDetails }, // prettier-ignore
        // { path: '/entity/movement', name: 'Movement', component: Movement },
        // { path: '/entity/movement/new', name: 'MovementCreate', component: MovementUpdate },
        // { path: '/entity/movement/:movementId/edit', name: 'MovementEdit', component: MovementUpdate },
        // { path: '/entity/movement/:movementId/view', name: 'MovementView', component: MovementDetails }, // prettier-ignore
        // { path: '/entity/movement-line', name: 'MovementLine', component: MovementLine },
        // { path: '/entity/movement-line/new', name: 'MovementLineCreate', component: MovementLineUpdate },
        // { path: '/entity/movement-line/:movementLineId/edit', name: 'MovementLineEdit', component: MovementLineUpdate },
        // { path: '/entity/movement-line/:movementLineId/view', name: 'MovementLineView', component: MovementLineDetails }, // prettier-ignore
        // { path: '/entity/e-account', name: 'EAccount', component: EAccount },
        // { path: '/entity/e-account/new', name: 'EAccountCreate', component: EAccountUpdate },
        // { path: '/entity/e-account/:eAccountId/edit', name: 'EAccountEdit', component: EAccountUpdate },
        // { path: '/entity/e-account/:eAccountId/view', name: 'EAccountView', component: EAccountDetails }, // prettier-ignore
        // { path: '/entity/house-hold', name: 'HouseHold', component: HouseHold },
        // { path: '/entity/house-hold/new', name: 'HouseHoldCreate', component: HouseHoldUpdate },
        // { path: '/entity/house-hold/:houseHoldId/edit', name: 'HouseHoldEdit', component: HouseHoldUpdate },
        // { path: '/entity/house-hold/:houseHoldId/view', name: 'HouseHoldView', component: HouseHoldDetails }, // prettier-ignore
        // { path: '/entity/user-preferences', name: 'UserPreferences', component: UserPreferences },
        // { path: '/entity/user-preferences/new', name: 'UserPreferencesCreate', component: UserPreferencesUpdate },
        // { path: '/entity/user-preferences/:userPreferencesId/edit', name: 'UserPreferencesEdit', component: UserPreferencesUpdate },
        // { path: '/entity/user-preferences/:userPreferencesId/view', name: 'UserPreferencesView', component: UserPreferencesDetails }, // prettier-ignore
        // { path: '/entity/account-categories', name: 'AccountCategories', component: AccountCategories },
        // { path: '/entity/account-categories/new', name: 'AccountCategoriesCreate', component: AccountCategoriesUpdate },
        // { path: '/entity/account-categories/:accountCategoriesId/edit', name: 'AccountCategoriesEdit', component: AccountCategoriesUpdate },
        // { path: '/entity/account-categories/:accountCategoriesId/view', name: 'AccountCategoriesView', component: AccountCategoriesDetails }, // prettier-ignore
        // { path: '/entity/category', name: 'Category', component: Category },
        // { path: '/entity/category/new', name: 'CategoryCreate', component: CategoryUpdate },
        // { path: '/entity/category/:categoryId/edit', name: 'CategoryEdit', component: CategoryUpdate },
        // { path: '/entity/category/:categoryId/view', name: 'CategoryView', component: CategoryDetails }, // prettier-ignore
        // { path: '/entity/movement', name: 'Movement', component: Movement },
        // { path: '/entity/movement/new', name: 'MovementCreate', component: MovementUpdate },
        // { path: '/entity/movement/:movementId/edit', name: 'MovementEdit', component: MovementUpdate },
        // { path: '/entity/movement/:movementId/view', name: 'MovementView', component: MovementDetails }, // prettier-ignore
        // { path: '/entity/movement-line', name: 'MovementLine', component: MovementLine },
        // { path: '/entity/movement-line/new', name: 'MovementLineCreate', component: MovementLineUpdate },
        // { path: '/entity/movement-line/:movementLineId/edit', name: 'MovementLineEdit', component: MovementLineUpdate },
        // { path: '/entity/movement-line/:movementLineId/view', name: 'MovementLineView', component: MovementLineDetails }, // prettier-ignore
        // { path: '/entity/e-account', name: 'EAccount', component: EAccount },
        // { path: '/entity/e-account/new', name: 'EAccountCreate', component: EAccountUpdate },
        // { path: '/entity/e-account/:eAccountId/edit', name: 'EAccountEdit', component: EAccountUpdate },
        // { path: '/entity/e-account/:eAccountId/view', name: 'EAccountView', component: EAccountDetails }
        // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
    ]
});
