import { Route } from '@angular/router';

import { EcoMetricsMonitoringComponent } from './metrics.component';

export const metricsRoute: Route = {
    path: 'eco-metrics',
    component: EcoMetricsMonitoringComponent,
    data: {
        pageTitle: 'metrics.title'
    }
};
