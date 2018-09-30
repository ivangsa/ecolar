import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EAccount from './e-account';
import EAccountDetail from './e-account-detail';
import EAccountUpdate from './e-account-update';
import EAccountDeleteDialog from './e-account-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EAccountUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EAccountUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EAccountDetail} />
      <ErrorBoundaryRoute path={match.url} component={EAccount} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EAccountDeleteDialog} />
  </>
);

export default Routes;
