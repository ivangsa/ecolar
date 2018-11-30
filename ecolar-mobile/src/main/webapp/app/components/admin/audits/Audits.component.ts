import moment from 'moment';
import AuditsService from './AuditsService.vue';

const EcoAuditsComponent = {
  name: 'EcoAuditsComponent',
  mixins: [AuditsService],
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.init();
    });
  },
  data() {
    return {
      audits: [],
      fromDate: null,
      itemsPerPage: 20,
      queryCount: null,
      page: 1,
      previousPage: null,
      propOrder: 'auditEventDate',
      predicate: 'timestamp',
      reverse: false,
      toDate: null,
      totalItems: 0
    };
  },
  methods: {
    init() {
      this.today();
      this.previousMonth();
      this.loadAll();
    },
    previousMonth() {
      const dateFormat = 'YYYY-MM-DD';
      let fromDate = new Date();

      if (fromDate.getMonth() === 0) {
        fromDate = new Date(fromDate.getFullYear() - 1, 11, fromDate.getDate());
      } else {
        fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth() - 1, fromDate.getDate());
      }

      this.fromDate = moment(fromDate).format(dateFormat);
    },
    today() {
      const dateFormat = 'YYYY-MM-DD';
      // Today + 1 day - needed if the current day must be included
      const today = new Date();
      today.setDate(today.getDate() + 1);
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      this.toDate = moment(date).format(dateFormat);
    },
    loadAll() {
      if (this.fromDate && this.toDate) {
        this.query({
          page: this.page - 1,
          size: this.itemsPerPage,
          sort: this.sort(),
          fromDate: this.fromDate,
          toDate: this.toDate
        }).then(res => {
          this.audits = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
        });
      }
    },
    sort() {
      const result = [this.propOrder + ',' + (this.reverse ? 'asc' : 'desc')];
      result.push('id');
      return result;
    },
    loadPage(page) {
      if (page !== this.previousPage) {
        this.previousPage = page;
        this.transition();
      }
    },
    transition() {
      this.loadAll();
    },
    changeOrder(propOrder, predicate) {
      this.propOrder = propOrder;
      this.predicate = predicate;
      this.reverse = !this.reverse;
    }
  }
};

export default EcoAuditsComponent;
