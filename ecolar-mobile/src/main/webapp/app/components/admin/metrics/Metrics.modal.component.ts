const EcoMetricsModalComponent = {
  name: 'EcoMetricsModalComponent',
  props: ['threadDump'],
  data() {
    return {
      threadDumpFilter: null
    };
  },
  methods: {
    getBadgeClass(threadState) {
      if (threadState === 'RUNNABLE') {
        return 'badge-success';
      } else if (threadState === 'WAITING') {
        return 'badge-info';
      } else if (threadState === 'TIMED_WAITING') {
        return 'badge-warning';
      } else if (threadState === 'BLOCKED') {
        return 'badge-danger';
      }
    }
  },
  computed: {
    threadDumpData() {
      const data = {
        threadDumpAll: 0,
        threadDumpBlocked: 0,
        threadDumpRunnable: 0,
        threadDumpTimedWaiting: 0,
        threadDumpWaiting: 0
      };
      if (this.threadDump) {
        this.threadDump.forEach(value => {
          if (value.threadState === 'RUNNABLE') {
            data.threadDumpRunnable += 1;
          } else if (value.threadState === 'WAITING') {
            data.threadDumpWaiting += 1;
          } else if (value.threadState === 'TIMED_WAITING') {
            data.threadDumpTimedWaiting += 1;
          } else if (value.threadState === 'BLOCKED') {
            data.threadDumpBlocked += 1;
          }
        });
        data.threadDumpAll = data.threadDumpRunnable + data.threadDumpWaiting + data.threadDumpTimedWaiting + data.threadDumpBlocked;
      }
      return data;
    }
  }
};

export default EcoMetricsModalComponent;
