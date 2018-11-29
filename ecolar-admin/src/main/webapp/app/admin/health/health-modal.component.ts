import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EcoHealthService } from './health.service';

@Component({
    selector: 'eco-health-modal',
    templateUrl: './health-modal.component.html'
})
export class EcoHealthModalComponent {
    currentHealth: any;

    constructor(private healthService: EcoHealthService, public activeModal: NgbActiveModal) {}

    baseName(name) {
        return this.healthService.getBaseName(name);
    }

    subSystemName(name) {
        return this.healthService.getSubSystemName(name);
    }

    readableValue(value: number) {
        if (this.currentHealth.name === 'diskSpace') {
            // Should display storage space in an human readable unit
            const val = value / 1073741824;
            if (val > 1) {
                // Value
                return val.toFixed(2) + ' GB';
            } else {
                return (value / 1048576).toFixed(2) + ' MB';
            }
        }

        if (typeof value === 'object') {
            return JSON.stringify(value);
        } else {
            return value.toString();
        }
    }
}