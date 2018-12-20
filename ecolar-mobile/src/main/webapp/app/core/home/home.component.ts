import Component, { mixins } from 'vue-class-component';
import { Inject } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import LoginModalService from '@/account/login-modal.service';
import Principal from '@/account/principal';

@Component({
    computed: mapGetters(['authenticated', 'account'])
})
export default class Home extends mixins(Principal) {
    @Inject('loginModalService') private loginModalService: () => LoginModalService;

    public openLogin(): void {
        this.loginModalService().openLogin((<any>this).$root);
    }
}
