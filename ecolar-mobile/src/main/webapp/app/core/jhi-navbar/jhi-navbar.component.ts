import { Component, Inject, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { VERSION } from '@/constants';
import LoginModalService from '@/account/login-modal.service';
import Principal from '@/account/principal';
import { State, Getter, Mutation } from 'vuex-class';

@Component
export default class JhiNavbar extends Vue {
    @Inject('loginModalService') private loginModalService: () => LoginModalService;
    @Inject('principal') private principal: () => Principal;
    public version: string = VERSION ? 'v' + VERSION : '';
    public swaggerEnabled: boolean = false;
    public inProduction: boolean = false;
    public isNavbarCollapsed: boolean = true;
    private currentLanguage: string = this.$store.getters.currentLanguage;
    private languages: any = this.$store.getters.languages;
    @State drawer: boolean;
    @Mutation toogleDrawer;
    @Getter authenticated;

    created() {
        this.principal().refreshTranslation(this.currentLanguage);
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

    public changeLanguage(newLanguage: string): void {
        this.principal().refreshTranslation(newLanguage);
    }

    public isActiveLanguage(key: string): boolean {
        return key === this.$store.getters.currentLanguage;
    }

    public logout(): void {
        localStorage.removeItem('jhi-authenticationToken');
        sessionStorage.removeItem('jhi-authenticationToken');
        this.$store.commit('logout');
        this.$router.push('/');
    }

    public openLogin(): void {
        this.loginModalService().openLogin((<any>this).$root);
        this.toogleDrawer();
    }

    public hasAnyAuthority(authorities: any): boolean {
        return this.principal().hasAnyAuthority(authorities);
    }
}
