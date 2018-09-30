import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MovementLine from './movement-line';
import MovementLineDetail from './movement-line-detail';
import MovementLineUpdate from './movement-line-update';
import MovementLineDeleteDialog from './movement-line-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MovementLineUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MovementLineUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MovementLineDetail} />
      <ErrorBoundaryRoute path={match.url} component={MovementLine} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={MovementLineDeleteDialog} />
  </>
);

export default Routes;
