<script>
    import axios from 'axios'
    import TranslationService from '../../locale/TranslationService';

    export default {
        name: 'Principal',
        mixins: [TranslationService],
        created: function() {
            const token =localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');            if (!this.$store.getters.account && !this.$store.getters.logon && token) {
                this.retrieveAccount();
            }
        },
        methods: {
            retrieveAccount: function() {
                this.$store.commit('authenticate');
                axios.get('api/account').then((response) => {
                    const account = response.data;
                    if (account) {
                        this.$store.commit('authenticated', account);
                        if (this.currentLanguage !== account.langKey) {
                            this.currentLanguage = account.langKey;
                        }
                    } else {
                        this.$store.commit('logout');
                        this.$router.push('/');
                    }
                }).catch(() => {
                    this.$store.commit('logout');
                    this.$router.push('/');
                });
            },
            hasAnyAuthority: function(authorities) {
                if (typeof authorities === "string") {
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
        },
        computed:{
            userAuthorities(){
                return this.$store.getters.account.authorities;
            },
            username() {
                return this.$store.getters.account ? this.$store.getters.account.login : ''
            }
        }
    }
</script>
