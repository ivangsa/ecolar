import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import houseHold, {
  HouseHoldState
} from 'app/entities/house-hold/house-hold.reducer';
// prettier-ignore
import userPreferences, {
  UserPreferencesState
} from 'app/entities/user-preferences/user-preferences.reducer';
// prettier-ignore
import accountCategories, {
  AccountCategoriesState
} from 'app/entities/account-categories/account-categories.reducer';
// prettier-ignore
import category, {
  CategoryState
} from 'app/entities/category/category.reducer';
// prettier-ignore
import movement, {
  MovementState
} from 'app/entities/movement/movement.reducer';
// prettier-ignore
import movementLine, {
  MovementLineState
} from 'app/entities/movement-line/movement-line.reducer';
// prettier-ignore
import eAccount, {
  EAccountState
} from 'app/entities/e-account/e-account.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly houseHold: HouseHoldState;
  readonly userPreferences: UserPreferencesState;
  readonly accountCategories: AccountCategoriesState;
  readonly category: CategoryState;
  readonly movement: MovementState;
  readonly movementLine: MovementLineState;
  readonly eAccount: EAccountState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  houseHold,
  userPreferences,
  accountCategories,
  category,
  movement,
  movementLine,
  eAccount,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
