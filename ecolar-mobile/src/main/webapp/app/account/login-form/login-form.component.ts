import axios from 'axios';
import Component, { mixins } from 'vue-class-component';

import Principal from '../principal';

@Component({
    watch: {
        $route() {
            this.$root.$emit('bv::hide::modal', 'login-page');
        }
    }
})
export default class LoginForm extends mixins(Principal) {
    public authenticationError: boolean;
    public login: string;
    public password: string;
    public rememberMe: boolean;

    constructor() {
        super();
        this.authenticationError = null;
        this.login = null;
        this.password = null;
        this.rememberMe = null;
    }

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
                this.$root.$emit('bv::hide::modal', 'login-page');
                this.retrieveAccount();
            })
            .catch(() => {
                this.authenticationError = true;
            });
    }
}
