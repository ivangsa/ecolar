import CategoryService from './category.service.vue';

const CategoryDetails = {
  mixins: [CategoryService],
  data() {
    return {
      category: {}
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.categoryId) {
        vm.retrieveCategory(to.params.categoryId);
      }
    });
  },
  methods: {
    retrieveCategory(categoryId) {
      this.findCategory(categoryId).then(res => {
        this.category = res.data;
      });
    },
    previousState() {
      this.$router.go(-1);
    }
  }
};

export default CategoryDetails;
