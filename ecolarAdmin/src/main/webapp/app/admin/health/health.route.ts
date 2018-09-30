import { Route } from '@angular/router';

import { EcoHealthCheckComponent } from './health.component';

export const healthRoute: Route = {
    path: 'eco-health',
    component: EcoHealthCheckComponent,
    data: {
        pageTitle: 'health.title'
    }
};
