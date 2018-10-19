import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMovementLine } from 'app/shared/model/movement-line.model';

@Component({
    selector: 'eco-movement-line-detail',
    templateUrl: './movement-line-detail.component.html'
})
export class MovementLineDetailComponent implements OnInit {
    movementLine: IMovementLine;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ movementLine }) => {
            this.movementLine = movementLine;
        });
    }

    previousState() {
        window.history.back();
    }
}
