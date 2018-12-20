import { mixins } from 'vue-class-component';
import { Component, Inject } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import axios from 'axios';
import { VERSION } from '@/constants';
import LoginModalService from '@/account/login-modal.service';
import Principal from '@/account/principal';

@Component({
    computed: mapGetters(['authenticated'])
})
export default class JhiNavbar extends mixins(Principal) {
    @Inject('loginModalService') private loginModalService: () => LoginModalService;
    public version: string;
    public swaggerEnabled: boolean;
    public inProduction: boolean;
    public isNavbarCollapsed: boolean;
    private currentLanguage: string;
    private languages: any;

    constructor() {
        super();
        this.version = VERSION ? 'v' + VERSION : '';
        this.swaggerEnabled = false;
        this.inProduction = false;
        this.isNavbarCollapsed = true;
        this.currentLanguage = this.$store.getters.currentLanguage;
        this.languages = this.$store.getters.languages;
    }

    created() {
        this.refreshTranslation(this.currentLanguage);
        axios.get('management/info').then(res => {
            if (res.data && res.data.activeProfiles && res.data.activeProfiles.indexOf('swagger') > -1) {
                this.swaggerEnabled = true;
            }
            if (res.data && res.data.activeProfiles && res.data.activeProfiles.indexOf('prod') > -1) {
                this.inProduction = true;
            }
        });
    }

    public getImageUrl(): boolean {
        return false;
    }

    public collapseNavbar(): void {
        this.isNavbarCollapsed = true;
    }

    public changeLanguage(newLanguage): void {
        this.refreshTranslation(newLanguage);
    }

    public logout(): void {
        localStorage.removeItem('jhi-authenticationToken');
        sessionStorage.removeItem('jhi-authenticationToken');
        this.$store.commit('logout');
        this.$router.push('/');
    }

    public openLogin(): void {
        this.loginModalService().openLogin((<any>this).$root);
    }
}
