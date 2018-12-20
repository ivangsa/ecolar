import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICategory } from '@/shared/model/category.model';
import CategoryService from './category.service';

const beforeRouteEnter = (to, from, next) => {
    next(vm => {
        if (to.params.categoryId) {
            vm.retrieveCategory(to.params.categoryId);
        }
    });
};

@Component({
    beforeRouteEnter
})
export default class CategoryDetails extends Vue {
    @Inject('categoryService') private categoryService: () => CategoryService;
    public category: ICategory;

    constructor() {
        super();
        this.category = {};
    }

    public retrieveCategory(categoryId) {
        this.categoryService()
            .find(categoryId)
            .then(res => {
                this.category = res;
            });
    }

    public previousState() {
        this.$router.go(-1);
    }
}
