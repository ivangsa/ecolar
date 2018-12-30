import Component from 'vue-class-component';
import { Inject, Vue } from 'vue-property-decorator';
import LoginModalService from '@/account/login-modal.service';
import Principal from '@/account/principal';

@Component
export default class Home extends Vue {
    @Inject('loginModalService') private loginModalService: () => LoginModalService;
    @Inject('principal') private principal: () => Principal;

    public openLogin(): void {
        this.loginModalService().openLogin((<any>this).$root);
    }

    public get authenticated(): boolean {
        const value = this.principal().authenticated;
        console.log('authenticated', value, this.$store.getters.authenticated);
        return value;
    }

    public get username(): string {
        return this.principal().username;
    }
}
