import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Principal } from 'app/core';

import { IAccountCategories } from 'app/shared/model/account-categories.model';
import { ICategory } from 'app/shared/model/category.model';
import { HouseHoldService } from '../house-hold.service';

@Component({
    selector: 'eco-account-categories',
    templateUrl: './account-categories.component.html'
})
export class AccountCategoriesComponent implements OnInit, OnDestroy {
    categories: IAccountCategories[];
    eventSubscriber: Subscription;

    constructor(
        private service: HouseHoldService,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ categories }) => {
            this.categories = categories;
        });
    }

    ngOnDestroy() {

    }

    registerChangeInAccountCategories() {
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

@Component ({
  selector: 'eco-account-category-tree',
  templateUrl: './account-categories.component-tree.html'
})
export class AccountCategoryTreeComponent {
  @Input() categories: ICategory[];
}
