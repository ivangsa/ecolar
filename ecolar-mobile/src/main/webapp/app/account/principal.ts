import axios from 'axios';
import { Component, Inject, Vue } from 'vue-property-decorator';
import TranslationService from '@/locale/translation.service';

@Component
export default class Principal extends Vue {
    @Inject('translationService') private translationService: () => TranslationService;

    public created(): void {
        const token = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');
        if (!this.$store.getters.account && !this.$store.getters.logon && token) {
            this.retrieveAccount();
        }
    }

    public retrieveAccount(): any {
        this.$store.commit('authenticate');
        axios
            .get('api/account')
            .then(response => {
                const account = response.data;
                if (account) {
                    this.$store.commit('authenticated', account);
                    if (this.$store.getters.currentLanguage !== account.langKey) {
                        this.$store.commit('currentLanguage', account.langKey);
                    }
                } else {
                    this.$store.commit('logout');
                    (<any>this).$router.push('/');
                }
                this.refreshTranslation(this.$store.getters.currentLanguage);
            })
            .catch(() => {
                this.$store.commit('logout');
                (<any>this).$router.push('/');
            });
    }

    public hasAnyAuthority(authorities: any): any {
        if (typeof authorities === 'string') {
            authorities = [authorities];
        }
        if (!this.authenticated || !this.userAuthorities) {
            return false;
        }

        for (let i = 0; i < authorities.length; i++) {
            if (this.userAuthorities.includes(authorities[i])) {
                return true;
            }
        }

        return false;
    }

    public get authenticated() {
        return this.$store.getters.authenticated;
    }

    public get userAuthorities(): any {
        return this.$store.getters.account.authorities;
    }

    public get username(): string {
        return this.$store.getters.account ? this.$store.getters.account.login : '';
    }

    public refreshTranslation(newLanguage) {
        this.translationService().refreshTranslation(this.$i18n, this.$store.getters.currentLanguage, newLanguage);
    }
}
