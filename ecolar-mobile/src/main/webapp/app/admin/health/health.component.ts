import HealthService from './health.service';
import EcoHealthModal from './health-modal.vue';
import { Component, Inject, Vue } from 'vue-property-decorator';

@Component({
    components: {
        'health-modal': EcoHealthModal
    }
})
export default class EcoHealth extends Vue {
    public healthData: any;
    public currentHealth: any;
    public updatingHealth: boolean;
    @Inject('healthService') private healthService: () => HealthService;

    constructor() {
        super();
        this.healthData = null;
        this.currentHealth = null;
        this.updatingHealth = false;
    }

    public mounted(): void {
        this.refresh();
    }

    public baseName(name: any): any {
        return this.healthService().getBaseName(name);
    }

    public getBadgeClass(statusState: any): String {
        if (statusState === 'UP') {
            return 'badge-success';
        } else {
            return 'badge-danger';
        }
    }

    public refresh(): void {
        this.updatingHealth = true;
        this.healthService()
            .checkHealth()
            .then(res => {
                this.healthData = this.healthService().transformHealthData(res.data);
                this.updatingHealth = false;
            })
            .catch(error => {
                if (error.status === 503) {
                    this.healthData = this.healthService().transformHealthData(error.error);
                }
                this.updatingHealth = false;
            });
    }

    public showHealth(health: any): void {
        this.currentHealth = health;
        (<any>this.$refs.healthModal).show();
    }

    public subSystemName(name: String): String {
        return this.healthService().getSubSystemName(name);
    }
}