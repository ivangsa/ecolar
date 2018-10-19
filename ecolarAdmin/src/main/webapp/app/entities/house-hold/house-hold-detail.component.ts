import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHouseHold } from 'app/shared/model/house-hold.model';

@Component({
    selector: 'eco-house-hold-detail',
    templateUrl: './house-hold-detail.component.html'
})
export class HouseHoldDetailComponent implements OnInit {
    houseHold: IHouseHold;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ houseHold }) => {
            this.houseHold = houseHold;
        });
    }

    previousState() {
        window.history.back();
    }
}
