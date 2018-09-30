import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import HouseHold from './house-hold';
import UserPreferences from './user-preferences';
import AccountsDocument from './accounts-document';
import Category from './category';
import Movement from './movement';
import MovementLine from './movement-line';
import EAccount from './e-account';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/house-hold`} component={HouseHold} />
      <ErrorBoundaryRoute path={`${match.url}/user-preferences`} component={UserPreferences} />
      <ErrorBoundaryRoute path={`${match.url}/accounts-document`} component={AccountsDocument} />
      <ErrorBoundaryRoute path={`${match.url}/category`} component={Category} />
      <ErrorBoundaryRoute path={`${match.url}/movement`} component={Movement} />
      <ErrorBoundaryRoute path={`${match.url}/movement-line`} component={MovementLine} />
      <ErrorBoundaryRoute path={`${match.url}/e-account`} component={EAccount} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
