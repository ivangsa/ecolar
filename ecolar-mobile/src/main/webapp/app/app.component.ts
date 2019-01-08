import LoginForm from '@/account/login-form/login-form.vue';
import { VERSION } from '@/constants';
import JhiFooter from '@/core/jhi-footer/jhi-footer.vue';
import JhiNavbar from '@/core/jhi-navbar/jhi-navbar.vue';
import Ribbon from '@/core/ribbon/ribbon.vue';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Mutation } from 'vuex-class';

@Component({
    components: {
        ribbon: Ribbon,
        'jhi-navbar': JhiNavbar,
        'jhi-footer': JhiFooter,
        'login-form': LoginForm
    }
})
export default class App extends Vue {
    public version: string = VERSION ? 'v' + VERSION : '';
    @Mutation toogleDrawer;
}
