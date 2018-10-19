import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AccountCategories from './account-categories';
import AccountCategoriesDetail from './account-categories-detail';
import AccountCategoriesUpdate from './account-categories-update';
import AccountCategoriesDeleteDialog from './account-categories-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AccountCategoriesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AccountCategoriesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AccountCategoriesDetail} />
      <ErrorBoundaryRoute path={match.url} component={AccountCategories} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AccountCategoriesDeleteDialog} />
  </>
);

export default Routes;
