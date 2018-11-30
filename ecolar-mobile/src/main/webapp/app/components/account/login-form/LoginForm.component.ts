import axios from 'axios';
import Principal from '../Principal.vue';

const LoginForm = {
  mixins: [Principal],
  data() {
    return {
      authenticationError: null,
      login: null,
      password: null,
      rememberMe: null
    };
  },
  methods: {
    doLogin: function() {
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
  },
  watch: {
    $route() {
      this.$root.$emit('bv::hide::modal', 'login-page');
    }
  }
};

export default LoginForm;
