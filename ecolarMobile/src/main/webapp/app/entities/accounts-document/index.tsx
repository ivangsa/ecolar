import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AccountsDocument from './accounts-document';
import AccountsDocumentDetail from './accounts-document-detail';
import AccountsDocumentUpdate from './accounts-document-update';
import AccountsDocumentDeleteDialog from './accounts-document-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AccountsDocumentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AccountsDocumentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AccountsDocumentDetail} />
      <ErrorBoundaryRoute path={match.url} component={AccountsDocument} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AccountsDocumentDeleteDialog} />
  </>
);

export default Routes;
