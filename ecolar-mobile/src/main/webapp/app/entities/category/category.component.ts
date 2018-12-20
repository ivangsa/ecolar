import { mixins } from 'vue-class-component';
import { Component, Inject } from 'vue-property-decorator';
import Principal from '@/account/principal';
import { ICategory } from '@/shared/model/category.model';

import CategoryService from './category.service';

@Component
export default class Category extends mixins(Principal) {
    @Inject('categoryService') private categoryService: () => CategoryService;
    private removeId: string = null;
    public categories: ICategory[] = [];

    public mounted(): void {
        this.retrieveAllCategorys();
    }

    public clear(): void {
        this.retrieveAllCategorys();
    }

    public retrieveAllCategorys(): void {
        this.categoryService()
            .retrieve()
            .then(res => {
                this.categories = res.data;
            });
    }

    public prepareRemove(instance): void {
        this.removeId = instance.id;
    }

    public removeCategory(): void {
        this.categoryService()
            .delete(this.removeId)
            .then(() => {
                this.removeId = null;
                this.retrieveAllCategorys();
                this.closeDialog();
            });
    }

    public closeDialog(): void {
        (<any>this.$refs.removeEntity).hide();
    }
}
