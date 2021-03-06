import HealthService from './health.service';
import { Component, Inject, Prop, Vue } from 'vue-property-decorator';

@Component
export default class EcoHealthModal extends Vue {
    @Prop() currentHealth!: any;
    @Inject('healthService') private healthService: () => HealthService;

    public baseName(name: String): any {
        return this.healthService().getBaseName(name);
    }

    public subSystemName(name: String): any {
        return this.healthService().getSubSystemName(name);
    }

    public readableValue(value: any): String {
        if (this.currentHealth.name === 'diskSpace') {
            // Should display storage space in an human readable unit
            const val = value / 1073741824;
            if (val > 1) {
                // Value
                return val.toFixed(2) + ' GB';
            } else {
                return (value / 1048576).toFixed(2) + ' MB';
            }
        }

        if (typeof value === 'object') {
            return JSON.stringify(value);
        } else {
            return value.toString();
        }
    }
}
