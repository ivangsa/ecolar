import Vue from 'vue';
import Component from 'vue-class-component';
import Ribbon from '@/components/ribbon/ribbon.vue';
import JhiFooter from '@/components/jhi-footer/jhi-footer.vue';
import JhiNavbar from '@/components/jhi-navbar/jhi-navbar.vue';
import LoginForm from '@/components/account/login-form/login-form.vue';

@Component({
  components: {
    ribbon: Ribbon,
    'jhi-navbar': JhiNavbar,
    'jhi-footer': JhiFooter,
    'login-form': LoginForm
  }
})
export default class App extends Vue {}
