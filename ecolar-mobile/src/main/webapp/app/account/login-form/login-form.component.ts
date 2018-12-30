import axios from 'axios';
import Component from 'vue-class-component';
import { Vue, Inject } from 'vue-property-decorator';

import Principal from '../principal';

@Component
export default class LoginForm extends Vue {
    public authenticationError: boolean = null;
    public login: string = null;
    public password: string = null;
    public rememberMe: boolean = null;
    public showPassword: boolean = false;

    @Inject('principal') private principal: () => Principal;

    public doLogin(): void {
        const data = { username: this.login, password: this.password, rememberMe: this.rememberMe };
        axios
            .post('api/authenticate', data)
            .then(result => {
                const bearerToken = result.headers.authorization;
                if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
                    const jwt = bearerToken.slice(7, bearerToken.length);
                    if (this.rememberMe) {
                        localStorage.setItem('jhi-authenticationToken', jwt);
                    } else {
                        sessionStorage.setItem('jhi-authenticationToken', jwt);
                    }
                }
                this.authenticationError = false;
                this.$store.commit('showLoginForm', false);
                this.principal().retrieveAccount();
            })
            .catch(() => {
                this.authenticationError = true;
            });
    }

    public close(): void {
        this.$store.commit('showLoginForm', false);
    }
}
