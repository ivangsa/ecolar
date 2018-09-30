import { Route } from '@angular/router';

import { EcoConfigurationComponent } from './configuration.component';

export const configurationRoute: Route = {
    path: 'eco-configuration',
    component: EcoConfigurationComponent,
    data: {
        pageTitle: 'configuration.title'
    }
};
