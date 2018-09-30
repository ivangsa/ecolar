import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import HouseHold from './house-hold';
import HouseHoldDetail from './house-hold-detail';
import HouseHoldUpdate from './house-hold-update';
import HouseHoldDeleteDialog from './house-hold-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={HouseHoldUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={HouseHoldUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={HouseHoldDetail} />
      <ErrorBoundaryRoute path={match.url} component={HouseHold} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={HouseHoldDeleteDialog} />
  </>
);

export default Routes;
