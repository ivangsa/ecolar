import { Component, Vue, Inject } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

import LogsService from './logs.service';

@Component
export default class EcoLogs extends Vue {
    @Inject('logsService') private logsService: () => LogsService;
    private loggers: any[];
    public filtered: string;
    public orderProp: string;
    public reverse: boolean;

    public constructor() {
        super();
        this.loggers = [];
        this.filtered = '';
        this.orderProp = 'name';
        this.reverse = false;
    }

    public mounted(): void {
        this.init();
    }

    public init(): void {
        this.logsService()
            .findAll()
            .then(response => {
                this.loggers = response.data;
            });
    }

    public updateLevel(name, level): void {
        this.logsService()
            .changeLevel({ name: name, level: level })
            .then(() => {
                this.init();
            });
    }

    public changeOrder(orderProp): void {
        this.orderProp = orderProp;
        this.reverse = !this.reverse;
    }
}