import { Route } from '@angular/router';

import { EcoDocsComponent } from './docs.component';

export const docsRoute: Route = {
    path: 'docs',
    component: EcoDocsComponent,
    data: {
        pageTitle: 'global.menu.admin.apidocs'
    }
};
