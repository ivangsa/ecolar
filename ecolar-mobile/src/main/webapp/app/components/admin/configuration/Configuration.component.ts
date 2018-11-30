import ConfigurationService from './ConfigurationService.vue';

const EcoConfigurationComponent = {
  name: 'EcoConfigurationComponent',
  mixins: [ConfigurationService],
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.init();
    });
  },
  data() {
    return {
      orderProp: 'prefix',
      reverse: false,
      allConfiguration: null,
      configuration: null,
      configKeys: [],
      filtered: ''
    };
  },
  methods: {
    init: function() {
      this.loadConfiguration().then(res => {
        this.configuration = res;

        for (const config of this.configuration) {
          if (config.properties !== undefined) {
            this.configKeys.push(Object.keys(config.properties));
          }
        }
      });

      this.loadEnvConfiguration().then(res => {
        this.allConfiguration = res;
      });
    },
    changeOrder: function(prop) {
      this.orderProp = prop;
      this.reverse = !this.reverse;
    },
    keys: function(dict) {
      return dict === undefined ? [] : Object.keys(dict);
    }
  }
};

export default EcoConfigurationComponent;
