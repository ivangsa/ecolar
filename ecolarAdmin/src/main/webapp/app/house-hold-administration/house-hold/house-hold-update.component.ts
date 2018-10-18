import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IHouseHold } from 'app/shared/model/house-hold.model';
import { HouseHoldService } from './house-hold.service';
import { IAccountsDocument } from 'app/shared/model/accounts-document.model';
import { AccountsDocumentService } from 'app/entities/accounts-document';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'eco-house-hold-update',
    templateUrl: './house-hold-update.component.html'
})
export class HouseHoldUpdateComponent implements OnInit {
    houseHold: IHouseHold;
    isSaving: boolean;

    accountsdocuments: IAccountsDocument[];

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private houseHoldService: HouseHoldService,
        private accountsDocumentService: AccountsDocumentService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ houseHold }) => {
            this.houseHold = houseHold;
        });
        this.accountsDocumentService.query({ filter: 'household(name)-is-null' }).subscribe(
            (res: HttpResponse<IAccountsDocument[]>) => {
                if (!this.houseHold.accountsDocument || !this.houseHold.accountsDocument.id) {
                    this.accountsdocuments = res.body;
                } else {
                    this.accountsDocumentService.find(this.houseHold.accountsDocument.id).subscribe(
                        (subRes: HttpResponse<IAccountsDocument>) => {
                            this.accountsdocuments = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.houseHold.id !== undefined) {
            this.subscribeToSaveResponse(this.houseHoldService.update(this.houseHold));
        } else {
            this.subscribeToSaveResponse(this.houseHoldService.create(this.houseHold));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IHouseHold>>) {
        result.subscribe((res: HttpResponse<IHouseHold>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackAccountsDocumentById(index: number, item: IAccountsDocument) {
        return item.id;
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
