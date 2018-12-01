import Principal from '../../components/account/Principal.vue';
import CategoryService from './category.service.vue';

const Category = {
  mixins: [Principal, CategoryService],
  data() {
    return {
      removeId: null,
      categories: []
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.retrieveAllCategorys();
    });
  },
  methods: {
    retrieveAllCategorys() {
      this.retrieveCategorys().then(res => {
        this.categories = res.data;
      });
    },
    prepareRemove(instance) {
      this.removeId = instance.id;
      this.$refs.removeEntity.show();
    },
    removeCategory() {
      this.deleteCategory(this.removeId).then(() => {
        this.removeId = null;
        this.retrieveAllCategorys();
        this.closeDialog();
      });
    },
    closeDialog() {
      this.$refs.removeEntity.hide();
    }
  }
};

export default Category;
