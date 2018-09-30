import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserPreferences from './user-preferences';
import UserPreferencesDetail from './user-preferences-detail';
import UserPreferencesUpdate from './user-preferences-update';
import UserPreferencesDeleteDialog from './user-preferences-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserPreferencesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UserPreferencesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserPreferencesDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserPreferences} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={UserPreferencesDeleteDialog} />
  </>
);

export default Routes;
