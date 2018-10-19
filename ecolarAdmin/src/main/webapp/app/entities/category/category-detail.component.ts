import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICategory } from 'app/shared/model/category.model';

@Component({
    selector: 'eco-category-detail',
    templateUrl: './category-detail.component.html'
})
export class CategoryDetailComponent implements OnInit {
    category: ICategory;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ category }) => {
            this.category = category;
        });
    }

    previousState() {
        window.history.back();
    }
}
